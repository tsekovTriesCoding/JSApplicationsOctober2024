import { html } from "../../lib.js";

export const carTemplate = (data) => html`
    <div class="car">
        <img src=${data.imageUrl} alt="example1" />
        <h3 class="model">${data.model}</h3>
        <div class="specs">
            <p class="price">Price: €${data.price}</p>
            <p class="weight">Weight: ${data.weight} kg</p>
            <p class="top-speed">Top Speed: ${data.speed} kph</p>
        </div>
        <a class="details-btn" href="/details/${data._id}">More Info</a>
    </div>
`;

export const carFromSearchTemplate = (car) => html`
<div class="car">
    <img src=${car.imageUrl} alt="example1" />
    <h3 class="model">${car.model}</h3>
    <a class="details-btn" href="/details/${car._id}">More Info</a>
</div>`;