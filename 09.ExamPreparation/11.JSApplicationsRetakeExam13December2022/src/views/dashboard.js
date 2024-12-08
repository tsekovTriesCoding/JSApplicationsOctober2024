import { getAllProducts } from "../data/product.js";
import { html, render } from "../lib.js";
import { productTemplate } from "./partials/product.js";

const dashboardTemplate = (products) => html`
<h2>Products</h2>
<section id="dashboard">
     ${products.length ? products.map(productTemplate) : html`<h2>No products yet.</h2>`}
</section>`;

export async function dashboardView() {
    const products = await getAllProducts();
    render(dashboardTemplate(products));
}