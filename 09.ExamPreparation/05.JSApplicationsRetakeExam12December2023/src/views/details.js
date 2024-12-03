import { deleteCar, getCarbyId } from "../data/car.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (car, isCreator, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${car.imageUrl} alt="example1" />
        <p id="details-title">${car.model}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p class="price">Price: €${car.price}</p>
                <p class="weight">Weight: ${car.weight} kg</p>
                <p class="top-speed">Top Speed: ${car.speed} kph</p>
                <p id="car-description">${car.about}</p>
            </div>
            ${isCreator ? html`
               <div id="action-buttons">
                <a href="/edit/${car._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>` : null}
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const car = await getCarbyId(id);

  const userData = getUserData();
  const isCreator = userData?._id === car._ownerId;

  render(detailsTemplate(car, isCreator, onDelete));

  async function onDelete() {
    const choice = confirm("Do you want to delete the car?");

    if (!choice) {
      return;
    }

    await deleteCar(id);
    page.redirect("/dashboard");
  }
}