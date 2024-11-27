import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { renderer } from "../utils/renderer.js";
import { mapTeamMembersCount } from "../utils/teamMembersCount.js";
import { userUtil } from "../utils/userUtil.js";

const temp = (teams) => html`
    <section id="my-teams">

        <article class="pad-med">
            <h1>My Teams</h1>
        </article>

        ${!teams.length ? html`
                <article class="layout narrow">
            <div class="pad-med">
                <p>You are not a member of any team yet.</p>
                <p><a href="/browseTeams">Browse all teams</a> to join one, or use the button bellow to create your own
            team.</p>
            </div>
            <div class=""><a href="/createTeam" class="action cta">Create Team</a></div>
        </article>
        ` :
        html`${teams.map(t => teamTemp(t.team))}`}

    </section>
`;

const teamTemp = (team) => html`
        <article class="layout">
            <img src="${team.logoUrl}" class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${team.members === 1 ? team.members + " Member" : team.members + " Members"}</span>
                <div><a href="/details/${team._id}" class="action">See details</a></div>
            </div>
        </article>
`;

export async function showMyTeamsView() {
    const userData = userUtil.getUserData();

    const teamsByMemberId = await dataService.getAllTeamsByMemberId(userData._id);
    const members = await dataService.getAllMembers();

    teamsByMemberId.forEach(t => {
        mapTeamMembersCount(t.team, members);
    });

    renderer(temp(teamsByMemberId));
}