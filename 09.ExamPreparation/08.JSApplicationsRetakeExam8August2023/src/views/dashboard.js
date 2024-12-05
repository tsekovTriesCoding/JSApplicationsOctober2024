import { getAllMotorcycles } from "../data/motorcycle.js";
import { html, render } from "../lib.js";
import { motorcycleTemplate } from "./partials/motorcycle.js";

const dashboardTemplate = (motorcycles) => html`
<h2>Available Motorcycles</h2>
<section id="dashboard">
     ${motorcycles.length ? motorcycles.map(motorcycleTemplate) : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
</section>`;

export async function dashboardView() {
    const motorcycles = await getAllMotorcycles();
    render(dashboardTemplate(motorcycles));
}