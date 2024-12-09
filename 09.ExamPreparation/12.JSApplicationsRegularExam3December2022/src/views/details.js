import { deleteAlbum, getAlbumById } from "../data/album.js";
import { getLikesByAlbumId, likeAlbum } from "../data/like.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (album, isCreator, isLoggedIn, onDelete, onLike, hasLiked, likes) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

        <!--Edit and Delete are only for creator-->
        ${isLoggedIn ? html` <div id="action-buttons">
            ${isCreator ? html` <a href="/edit/${album._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` :
            html`${hasLiked ? null : html`<a @click=${onLike} href="" id="like-btn">Like</a>`}`}
        </div>` : null}
    </div>
</section>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const [album, likesInfo] = await Promise.all([
        getAlbumById(id),
        getLikesByAlbumId(id)
    ]);

    const userData = getUserData();
    const isCreator = userData?._id === album._ownerId;
    const hasLiked = likesInfo.hasLikes;

    render(detailsTemplate(album, isCreator, Boolean(userData), onDelete, onLike, hasLiked, likesInfo.likes));

    async function onLike() {
        await likeAlbum(id);
        page.redirect(`/details/${id}`);
    }

    async function onDelete() {
        const choice = confirm("Do you want to delete the album?");

        if (!choice) {
            return;
        }

        await deleteAlbum(id);
        page.redirect("/dashboard");
    }
}