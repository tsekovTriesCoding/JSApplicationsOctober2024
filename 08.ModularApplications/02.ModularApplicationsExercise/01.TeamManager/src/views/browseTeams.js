import { html } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../service/dataService.js";
import { renderer } from "../utils/renderer.js";
import { mapTeamMembersCount } from "../utils/teamMembersCount.js";
import { userUtil } from "../utils/userUtil.js";

const temp = (teams, hasUser) => html`
<section id="browse">

<article class="pad-med">
    <h1>Team Browser</h1>
</article>

${hasUser ? html`
    <article class="layout narrow">
    <div class="pad-small"><a href="/createTeam" class="action cta">Create Team</a></div>
</article>
` : ""}

${teams.map(cardTemp)}

</section>
`;

const cardTemp = (team) => html`
<article class="layout">
    <img src="${team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${team.members === 1 ? team.members + " Member" : team.members + " Members"}</span>
        <div><a href=/details/${team._id} class="action">See details</a></div>
    </div>
</article>
`;

export async function showBrowseTeamsView() {
    const teams = await dataService.getAllTeams();
    const userData = userUtil.getUserData();
    const members = await dataService.getAllMembers();

    teams.forEach(team => {
        mapTeamMembersCount(team, members);
    });

    renderer(temp(teams, Boolean(userData)));
}


