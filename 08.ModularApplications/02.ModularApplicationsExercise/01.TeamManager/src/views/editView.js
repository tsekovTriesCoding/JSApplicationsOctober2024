import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { goTo } from "../utils/goTo.js";
import { renderer } from "../utils/renderer.js";

const temp = (team, error) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form @submit=${onSubmit} id="edit-form" data-id=${team._id} class="main-form pad-large">
        ${error && html`<div class="error">${error}</div>`}
            <label>Team name: <input type="text" name="name" .value=${team.name}></label>
            <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
            <label>Description: <textarea name="description" .value=${team.description}></textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
</section>
`;

export async function showEditView(ctx) {
    const teamId = ctx.params.id;
    const team = await dataService.getTeam(teamId);

    renderer(temp(team));
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { name, logoUrl, description } = Object.fromEntries(formData);

    const team = { name, logoUrl, description };

    if (name.length < 4) {
        return renderer(temp(team, "Invalid team name"));
    }

    if (!logoUrl) {
        return renderer(temp(team, "Invalid logo url"));
    }

    if (description.length < 10) {
        return renderer(temp(team, "Invalid description"));
    }

    const teamId = e.target.dataset.id;

    await dataService.updateTeam(teamId, team);
    goTo(`/details/${teamId}`);
}