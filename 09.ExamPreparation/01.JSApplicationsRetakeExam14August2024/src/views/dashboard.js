import { getShows } from "../data/show.js";
import { html, page, render } from "../lib.js";
import { showTemplate } from "./partials/show.js";

const dashboardTemplate = (shows) => html`
<h2>Users Recommendations</h2>
<section id="shows">
    <!-- Display a div with information about every post (if any)-->
     ${shows.length ? shows.map(showTemplate) : html`<h2 id="no-show">No shows Added.</h2>`}
</section>
`;

export async function dashboardView() {
    const shows = await getShows();
    render(dashboardTemplate(shows));
}

