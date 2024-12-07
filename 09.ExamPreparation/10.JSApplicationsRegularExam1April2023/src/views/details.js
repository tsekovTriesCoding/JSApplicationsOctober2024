import { deleteFruit, getFruitById } from "../data/fruit.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (fruit, isCreator, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fruit.imageUrl} alt="example1" />
        <p id="details-title">${fruit.name}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p>${fruit.description}</p>
                <p id="nutrition">Nutrition</p>
                <p id="details-nutrition">${fruit.nutrition}</p>
            </div>
            <!--Edit and Delete are only for creator-->
            ${isCreator ? html`<div id="action-buttons">
                <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>` : null}
        </div>
    </div>
</section>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const fruit = await getFruitById(id);

    const userData = getUserData();
    const isCreator = userData?._id === fruit._ownerId;

    render(detailsTemplate(fruit, isCreator, onDelete));

    async function onDelete() {
        const choice = confirm("Do you want to delete the fruit?");

        if (!choice) {
            return;
        }

        await deleteFruit(id);
        page.redirect("/dashboard");
    }
}