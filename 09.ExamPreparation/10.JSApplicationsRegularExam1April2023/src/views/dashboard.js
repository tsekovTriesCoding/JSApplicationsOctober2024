import { getAllFruits } from "../data/fruit.js";
import { html, render } from "../lib.js";
import { fruitTemplate } from "./partials/fruit.js";

const dashboardTemplate = (fruits) => html`
<h2>Fruits</h2>
<section id="dashboard">
    ${fruits.length ? fruits.map(fruitTemplate) : html`<h2>No fruit info yet.</h2>`}
</section>`;

export async function dashboardView() {
    const fruits = await getAllFruits();

    render(dashboardTemplate(fruits));
}