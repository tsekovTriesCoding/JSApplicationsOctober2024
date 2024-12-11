import { html } from "../../lib.js";

export const droneTemplate = (data) => html`
<div class="drone">
    <img src=${data.imageUrl} alt="example1" />
    <h3 class="model">${data.model}</h3>
    <div class="drone-info">
        <p class="price">Price: €${data.price}</p>
        <p class="condition">Condition: ${data.condition}</p>
        <p class="weight">Weight: ${data.weight}g</p>
    </div>
    <a class="details-btn" href="/details/${data._id}">Details</a>
</div>`;