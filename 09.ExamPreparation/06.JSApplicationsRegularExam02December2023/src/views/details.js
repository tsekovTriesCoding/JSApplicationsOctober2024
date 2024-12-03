import { deleteCharacter, getCharacterById } from "../data/character.js";
import { getLikesByCharacterId, likeCharacter } from "../data/likes.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, likesCount, hasUser, hasLiked, isOwner, onLike, onDelete) => html`
<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${data.imageUrl} alt="example1" />
    <div>
      <p id="details-category">${data.category}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p id="description">${data.description}</p>
          <p id="more-info">${data.moreInfo}</p>
        </div>
      </div>
      <h3>Is This Useful:<span id="likes">${likesCount}</span></h3>

      ${hasUser ? html`
            <div id="action-buttons">
      ${isOwner ? html`
        <a href="/edit/${data._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}

        ${hasLiked ? null : html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`}
      </div>
      ` : null}
    </div>
  </div>
</section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;

  const [data, likesInfo] = await Promise.all([
    getCharacterById(id),
    getLikesByCharacterId(id)
  ]);

  const userData = getUserData();

  const isOwner = userData?._id === data._ownerId;
  const hasLiked = isOwner || likesInfo.hasLikes;

  render(detailsTemplate(data, likesInfo.likes, Boolean(userData), hasLiked, isOwner, onLike, onDelete));

  async function onLike() {
    await likeCharacter(id);

    page.redirect(`/catalog/${id}`);
  }

  async function onDelete() {
    const choice = confirm("Do you want to delete the character");

    if (!choice) {
      return;
    }

    await deleteCharacter(id);
    page.redirect("/catalog");
  }
}