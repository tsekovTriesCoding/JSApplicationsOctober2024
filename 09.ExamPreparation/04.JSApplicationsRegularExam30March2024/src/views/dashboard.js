import { html, render } from "../lib.js";
import { getAllItems } from "../data/item.js";
import { itemTemplate } from "./partials/item.js";

const dashboardTemplate = (items) => html`
<h3 class="heading">Market</h3>
<section id="dashboard">
   ${items.length ? items.map(itemTemplate) : html`<h3 class="empty">No Items Yet</h3>`}
</section>
`;

export async function dashboardView() {
    const items = await getAllItems();
   
    render(dashboardTemplate(items));
}