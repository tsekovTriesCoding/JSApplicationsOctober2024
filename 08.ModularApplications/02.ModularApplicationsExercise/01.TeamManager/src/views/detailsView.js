import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { goTo } from "../utils/goTo.js";
import { renderer } from "../utils/renderer.js";
import { mapTeamMembersCount } from "../utils/teamMembersCount.js";
import { userUtil } from "../utils/userUtil.js";

const temp = (team, members, pendingUsers, role, userData) => html`
<section id="team-home">
    <article class="layout">
        <img src="${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${team.members}</span>
            ${role !== "guest" ? teamActionTemp(role, team._id, userData._id) : ""}
        </div>
        ${membersTemp(members, role, members.find(m => m.user._id === team._ownerId))}
        ${role === "owner" ? membershipRequestTemp(pendingUsers) : ""}
    </article>
</section>
`;

const teamActionTemp = (role, teamId, userId) => html`
    <div>
        ${role === "owner" ? html`<a href=/edit/${teamId} class="action">Edit team</a>` : ""}
        ${role === "user" ? html`<a @click=${onJoin} data-id=${teamId} href="#" class="action">Join team</a>` : ""}
        ${role === "member" ? html`<a @click=${onLeaveClick} href="#" data-id=${userId} class="action invert">Leave team</a>` : ""}
        ${role === "pending" ? html`Membership pending. <a @click=${onCancelRequest} href="#" data-id=${userId}>Cancel request</a>` : ""}
    </div>
`;

async function onJoin(e) {
    e.preventDefault();
    const teamId = e.target.dataset.id;

    await dataService.requestMembership({ teamId });
    goTo(`/details/${teamId}`);
}

async function onLeaveClick(e) {
    e.preventDefault();
    const userId = e.target.dataset.id;

    const members = await dataService.getAllMembers();
    const memberToLeave = members.find(m => m._ownerId === userId);

    await dataService.cancelRequestLeaveTeam(memberToLeave._id);
}

async function onCancelRequest(e) {
    e.preventDefault();

    const userId = e.target.dataset.id;

    const members = await dataService.getAllPendingMembers();
    const pendingMemberToCancel = members.find(m => m._ownerId === userId);

    await dataService.cancelRequestLeaveTeam(pendingMemberToCancel._id);

    goTo(`/details/${pendingMemberToCancel.teamId}`);
}

const membersTemp = (members, role, owner) => html`
    <div class="pad-large">
        <h3>Members</h3>
        <ul class="tm-members">
            ${role === "owner" && owner ? html`<li>My Username</li>
            ${members.filter(m => m.user._id !== owner.user._id).map(m => memberTemp(m, role))}
                ` : html`
                ${members.map(memberTemp)}
                `
    }
        </ul>
    </div>
`;

const memberTemp = (member, role) => {
    return html
        `<li>${member.user.username} ${role === "owner" ? html`<a @click=${onRemove} data-id=${member.user._id} href="#" class="tm-control action">Remove from team</a>` : ""}</li>
    `;
}

async function onRemove(e) {
    e.preventDefault();

    const userId = e.target.dataset.id;
    const members = await dataService.getAllMembers();
    const memberToRemove = members.find(m => m._ownerId === userId);
    
    await dataService.cancelRequestLeaveTeam(memberToRemove._id);
    e.target.parentElement.remove();
}

const membershipRequestTemp = (pendingUsers) => html`
    <div class="pad-large">
        <h3>Membership Requests</h3>
        <ul class="tm-members">
            ${pendingUsers.map(pendingMembershipTemp)}
        </ul>
    </div>
`;

const pendingMembershipTemp = (user) => html`
    <li>${user.user.username}
        <a @click=${onApprove} href="#" data-id=${user.user._id} class="tm-control action">Approve</a>
        <a @click=${onDecline} href="#" data-id=${user.user._id} class="tm-control action">Decline</a>
    </li>
`;

async function onApprove(e) {
    e.preventDefault();
    const userId = e.target.dataset.id;

    const pendingMembers = await dataService.getAllPendingMembers();
    const memberToApprove = pendingMembers.find(m => m._ownerId === userId);
    memberToApprove.status = "member";

    await dataService.approveMembership(memberToApprove._id, memberToApprove);
    e.target.parentElement.remove();

    goTo(`/details/${memberToApprove.teamId}`);
}

async function onDecline(e) {
    e.preventDefault();
    const userId = e.target.dataset.id;

    const pendingMembers = await dataService.getAllPendingMembers();
    const memberToDecline = pendingMembers.find(m => m._ownerId === userId);

    await dataService.cancelRequestLeaveTeam(memberToDecline._id);
    e.target.parentElement.remove();

    goTo(`/details/${memberToDecline.teamId}`);
}

export async function showDetailsView(ctx) {
    const teamId = ctx.params.id;
    const team = await dataService.getTeam(teamId);
    const memberships = await dataService.getMemberships(teamId);
    const members = memberships.filter(m => m.status === "member");
    const pendingUsers = memberships.filter(m => m.status === "pending");

    let role = undefined;
    const userData = userUtil.getUserData();

    if (!userData) {
        role = "guest";
    } else {
        if (userData._id === team._ownerId) {
            role = "owner";
        } else if (members.some(m => m.user._id === userData._id)) {
            role = "member";
        } else if (pendingUsers.some(m => m.user._id === userData._id)) {
            role = "pending";
        } else {
            role = "user";
        }
    }

    mapTeamMembersCount(team, members);

    renderer(temp(team, members, pendingUsers, role, userData));
}