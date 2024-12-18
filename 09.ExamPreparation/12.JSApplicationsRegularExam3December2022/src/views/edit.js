import { getAlbumById, updateAlbum } from "../data/album.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (album, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form @submit=${onEdit} class="edit-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${album.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" .value=${album.album} />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${album.imageUrl} />
            <input type="text" name="release" id="album-release" placeholder="Release date" .value=${album.release} />
            <input type="text" name="label" id="album-label" placeholder="Label" .value=${album.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${album.sales} />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function editView(ctx) {
    const id = ctx.params.id;
    const album = await getAlbumById(id);

    render(editTemplate(album, createSubmitHandler(onEdit)));

    async function onEdit({ singer, album, imageUrl, release, label, sales }) {
        if (!singer || !album || !imageUrl || !release || !label || !sales) {
            return alert("All fields are required");
        }

        await updateAlbum(id, { singer, album, imageUrl, release, label, sales });
        page.redirect(`/details/${id}`);
    }
}