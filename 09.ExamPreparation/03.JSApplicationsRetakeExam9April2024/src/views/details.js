
import { getLikesBySolutionId, likeSolution } from "../data/like.js";
import { deleteSolution, getSolutionById } from "../data/solution.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (solution, isCreator, onDelete, onLike, hasLiked, isGuest, likes) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${solution.imageUrl} alt="example1" />
        <div>
            <p id="details-type">${solution.type}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p id="description">${solution.description}</p>
                    <p id="more-info">${solution.learnMore}</p>
                </div>
            </div>
            <h3>Like Solution:<span id="like">${likes}</span></h3>
            <div id="action-buttons">
                ${isCreator ? html`
                <a href="/edit/${solution._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}

                <!--Bonus - Only for logged-in users ( not authors )-->
                ${!isCreator && !hasLiked && isGuest ? html`<a @click=${onLike} href="#" id="like-btn">Like</a>` : null}
            </div>
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const [solution, likesInfo] = await Promise.all([
        getSolutionById(id),
        getLikesBySolutionId(id)
    ]);

    const userData = getUserData();
    const isCreator = userData?._id === solution._ownerId;
    const hasLiked = likesInfo.hasLikes;

    render(detailsTemplate(solution, isCreator, onDelete, onLike, hasLiked, Boolean(userData), likesInfo.likes));

    async function onLike() {
        await likeSolution(id);
        page.redirect(`/details/${id}`);
    }

    async function onDelete() {
        const choice = confirm("Do you want to delete the solution?");

        if (!choice) {
            return;
        }

        await deleteSolution(id);
        page.redirect("/dashboard");
    }
}