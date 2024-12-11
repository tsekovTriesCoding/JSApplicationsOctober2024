import { getAllDrones } from "../data/drone.js";
import { html, render } from "../lib.js";
import { droneTemplate } from "./partials/drone.js";

const dashboardTemplate = (drones) => html`
<h3 class="heading">Marketplace</h3>
<section id="dashboard">
     ${drones.length ? drones.map(droneTemplate) : html`<h3 class="no-drones">No Drones Available</h3>`}
</section>`;

export async function dashboardView() {
    const drones = await getAllDrones();
    render(dashboardTemplate(drones));
}