import { getLikesByTattooId, likeTattoo } from "../data/likes.js";
import { deleteTattoo, getTattoobyId } from "../data/tattoo.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, isCreator, hasUser, onDelete, onLike, hasLiked, likes) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <div>
            <div id="info-wrapper">
                <p id="details-type">${data.type}</p>
                <div id="details-description">
                    <p id="user-type">${data.userType}</p>
                    <p id="description">${data.description}</p>
                </div>
                <h3>Like tattoo:<span id="like">${likes}</span></h3>

                <div id="action-buttons">
                ${isCreator ? html`
                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
             ` : null}
                    ${hasUser && !isCreator && !hasLiked ? html` <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>` : null}
                </div>
              
            </div>
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const [data, likesInfo] = await Promise.all([
        getTattoobyId(id),
        getLikesByTattooId(id)
    ]);

    const userData = getUserData();
    const isCreator = userData?._id === data._ownerId;
    const hasLiked = likesInfo.hasLikes;

    render(detailsTemplate(data, isCreator, Boolean(userData), onDelete, onLike, hasLiked, likesInfo.likes));

    async function onLike() {
        await likeTattoo(id);
        page.redirect(`/details/${id}`);
    }

    async function onDelete() {
        const choice = confirm("Do you want to delete the tattoo?");

        if (!choice) {
            return;
        }

        await deleteTattoo(id);
        page.redirect("/dashboard");
    }
}