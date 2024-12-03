import { getAllCars } from "../data/car.js";
import { html, render } from "../lib.js";
import { carTemplate } from "./partials/car.js";

const dashboardTemplate = (cars) => html`
<h3 class="heading">Our Cars</h3>
<section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
     ${cars.length ? cars.map(carTemplate) : html`<h3 class="nothing">Nothing to see yet</h3>`}
</section>
`;

export async function dashboardView() {
    const cars = await getAllCars();

    render(dashboardTemplate(cars));
}