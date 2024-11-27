import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { goTo } from "../utils/goTo.js";
import { renderer } from "../utils/renderer.js";

const temp = (error) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
        ${error && html`<div class="error">${error}</div>`}
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>
`;

export function showCreateTeamView() {
    renderer(temp());
}

async function onSubmit(e) {
    e.preventDefault();
    debugger

    const formData = new FormData(e.target);
    const { name, logoUrl, description } = Object.fromEntries(formData);

    if (name.length < 4) {
        return renderer(temp("Invalid team name"));
    }

    if (!logoUrl) {
        return renderer(temp("Invalid logo url"));
    }

    if (description.length < 10) {
        return renderer(temp("Invalid description"));
    }

    const team = await dataService.createTeam({ name, logoUrl, description });
    await applyOwnerToTeam(team);
    goTo(`/details/${team._id}`);
}

async function applyOwnerToTeam(team) {
    await dataService.requestMembership({ teamId: team._id });

    const pendingMembers = await dataService.getAllPendingMembers();
    const memberToApprove = pendingMembers.find(m => m._ownerId === team._ownerId);
    memberToApprove.status = "member";

    await dataService.approveMembership(memberToApprove._id, memberToApprove);
}