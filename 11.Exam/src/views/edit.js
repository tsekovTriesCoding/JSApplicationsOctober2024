import { getDroneById, updateDrone } from "../data/drone.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (drone, onEdit) => html`
<section id="edit">
    <div class="form form-item">
        <h2>Edit Offer</h2>
        <form @submit=${onEdit} class="edit-form">
            <input type="text" name="model" id="model" placeholder="Drone Model" .value=${drone.model} />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" .value=${drone.imageUrl} />
            <input type="number" name="price" id="price" placeholder="Price" .value=${drone.price} />
            <input type="number" name="weight" id="weight" placeholder="Weight" .value=${drone.weight} />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" .value=${drone.phone} />
            <input type="text" name="condition" id="condition" placeholder="Condition" .value=${drone.condition} />
            <textarea name="description" id="description" placeholder="Description" .value=${drone.description} ></textarea>
            <button type="submit">Edit</button>
        </form>
    </div>
</section>`;

export async function editView(ctx) {
  const id = ctx.params.id;
  const drone = await getDroneById(id);

  render(editTemplate(drone, createSubmitHandler(onEdit.bind(ctx))));

  async function onEdit({ model, imageUrl, price, weight, phone, condition, description }) {
    if (!model || !imageUrl || !price || !weight || !phone || !condition || !description) {
      return this.showNotification("All fields are required!");
    }

    await updateDrone(id, { model, imageUrl, price, weight, phone, condition, description });
    page.redirect(`/details/${id}`);
  }
}