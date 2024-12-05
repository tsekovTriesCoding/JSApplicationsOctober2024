import { html } from "../../lib.js";

export const motorcycleTemplate = (data) => html`
   <div class="motorcycle">
        <img src=${data.imageUrl} alt="example1" />
        <h3 class="model">${data.model}</h3>
        <p class="year">Year: ${data.year}</p>
        <p class="mileage">Mileage: ${data.mileage} km.</p>
        <p class="contact">Contact Number: ${data.contact}</p>
        <a class="details-btn" href="/details/${data._id}">More Info</a>
    </div>`;

export const motorcycleShortTemplate = (data) => html`
<div class="motorcycle">
    <img src=${data.imageUrl} alt="example1" />
    <h3 class="model">${data.model}</h3>
    <a class="details-btn" href="/details/${data._id}">More Info</a>
</div>`;