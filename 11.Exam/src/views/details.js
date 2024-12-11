import { deleteDrone, getDroneById } from "../data/drone.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (drone, isCreator, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <div>
            <img id="details-img" src=${drone.imageUrl} alt="example1" />
            <p id="details-model">${drone.model}</p>
        </div>
        <div id="info-wrapper">
            <div id="details-description">
                <p class="details-price">Price: €${drone.price}</p>
                <p class="details-condition">Condition: ${drone.condition}</p>
                <p class="details-weight">Weight: ${drone.weight}g</p>
                <p class="drone-description">${drone.description}</p>
                <p class="phone-number">Phone: ${drone.phone}</p>
            </div>
            ${isCreator ? html` <div class="buttons">
                <a href="/edit/${drone._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>` : null}
        </div>
    </div>
</section>`;

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const drone = await getDroneById(id);

  const userData = getUserData();
  const isCreator = userData?._id === drone._ownerId;

  render(detailsTemplate(drone, isCreator, onDelete));

  async function onDelete() {
    const choice = confirm("Do you want to delete the drone?");

    if (!choice) {
      return;
    }

    await deleteDrone(id);
    page.redirect("/dashboard");
  }
}