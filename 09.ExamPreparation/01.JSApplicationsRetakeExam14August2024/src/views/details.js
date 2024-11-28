import { deleteShow, getShowById } from "../data/show.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (show, isCreator, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${show.imageUrl} alt="example1" />
        <div id="details-text">
            <p id="details-title">${show.title}</p>
            <div id="info-wrapper">
                <div id="description">
                    <p id="details-description">${show.details}</p>
                </div>
            </div>

            ${isCreator ? html`
                      <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                <a href="/edit/${show._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>
            ` : null}
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const show = await getShowById(id);

    const userData = getUserData();
    const isCreator = userData?._id === show._ownerId;

    render(detailsTemplate(show, isCreator, onDelete));

    async function onDelete() {
        const choice = confirm("Do you want to delete the show");

        if (!choice) {
          return;
        }

        await deleteShow(id);
        page.redirect("/dashboard");
    }
}