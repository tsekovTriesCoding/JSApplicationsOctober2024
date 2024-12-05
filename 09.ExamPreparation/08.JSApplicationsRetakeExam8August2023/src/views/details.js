import { deleteMotorcycle, getMotorcycleById } from "../data/motorcycle.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (motorcycle, isCreator, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${motorcycle.imageUrl} alt="example1" />
        <p id="details-title">${motorcycle.model}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p class="year">Year: ${motorcycle.year}</p>
                <p class="mileage">Mileage: ${motorcycle.mileage} km.</p>
                <p class="contact">Contact Number: ${motorcycle.contact}</p>
                <p id="motorcycle-description">${motorcycle.about}</p>
            </div>
            <!--Edit and Delete are only for creator-->
            ${isCreator ? html`<div id="action-buttons">
                <a href="/edit/${motorcycle._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>` : null}
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const motorcycle = await getMotorcycleById(id);

  const userData = getUserData();
  const isCreator = userData?._id === motorcycle._ownerId;

  render(detailsTemplate(motorcycle, isCreator, onDelete));

  async function onDelete() {
    const choice = confirm("Do you want to delete the car?");

    if (!choice) {
      return;
    }

    await deleteMotorcycle(id);
    page.redirect("/dashboard");
  }
}