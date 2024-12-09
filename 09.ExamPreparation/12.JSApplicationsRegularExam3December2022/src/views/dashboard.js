import { getAllAlbums } from "../data/album.js";
import { html, render } from "../lib.js";
import { albumTemplate } from "./partials/album.js";

const dashboardTemplate = (albums) => html`
<section id="dashboard">
    <h2>Albums</h2>
    ${albums.length ? html` <ul class="card-wrapper">
         ${albums.map(albumTemplate)}
    </ul>` : html`<h2>There are no albums added yet.</h2>`}
</section>`;

export async function dashboardView() {
    const albums = await getAllAlbums();

    render(dashboardTemplate(albums));
}