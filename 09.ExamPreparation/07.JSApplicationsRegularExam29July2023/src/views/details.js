import { deleteFact, getFactById } from "../data/fact.js";
import { getLikesByFactId, likeFact } from "../data/like.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (fact, isCreator, onDelete, onLike, hasLiked, likes) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fact.imageUrl} alt="example1" />
        <p id="details-category">${fact.category}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p id="description">${fact.description}</p>
                <p id="more-info">${fact.moreInfo}</p>
            </div>

            <h3>Likes:<span id="likes">${likes}</span></h3>
            <div id="action-buttons">
              ${isCreator ? html`
                <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
                ${!hasLiked ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>` : null}
            </div>
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const [fact, likesInfo] = await Promise.all([
    getFactById(id),
    getLikesByFactId(id)
  ]);

  const userData = getUserData();
  const isCreator = userData?._id === fact._ownerId;
  const hasLiked = isCreator || likesInfo.hasLikes || !userData;

  render(detailsTemplate(fact, isCreator, onDelete, onLike, hasLiked, likesInfo.likes));

  async function onLike() {
    await likeFact(id);
    page.redirect(`/details/${id}`);
  }

  async function onDelete() {
    const choice = confirm("Do you want to delete the car?");

    if (!choice) {
      return;
    }

    await deleteFact(id);
    page.redirect("/dashboard");
  }
}