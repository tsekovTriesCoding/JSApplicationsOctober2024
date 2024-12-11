import { createDrone } from "../data/drone.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onAdd) => html`
<section id="create">
    <div class="form form-item">
        <h2>Add Drone Offer</h2>
        <form @submit=${onAdd} class="create-form">
            <input type="text" name="model" id="model" placeholder="Drone Model" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <input type="number" name="price" id="price" placeholder="Price" />
            <input type="number" name="weight" id="weight" placeholder="Weight" />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
            <input type="text" name="condition" id="condition" placeholder="Condition" />
            <textarea name="description" id="description" placeholder="Description"></textarea>
            <button type="submit">Add</button>
        </form>

    </div>
</section>`;

export function createView(ctx) {
  render(createTemplate(createSubmitHandler(onAdd.bind(ctx))));
}

async function onAdd({ model, imageUrl, price, weight, phone, condition, description }) {
  if (!model || !imageUrl || !price || !weight || !phone || !condition || !description) {
    return this.showNotification("All fields are required!");
  }

  await createDrone({ model, imageUrl, price, weight, phone, condition, description });
  page.redirect("/dashboard");
}