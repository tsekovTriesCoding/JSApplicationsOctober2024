import { getShowById, updateShow } from "../data/show.js";
import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (show, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Show</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="title" placeholder="TV Show title" .value=${show.title} />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value=${show.imageUrl} />
            <input type="text" name="genre" id="genre" placeholder="Genre" .value=${show.genre} />
            <input type="text" name="country" id="country" placeholder="Country" .value=${show.country} />
            <textarea id="details" name="details" placeholder="Details" rows="2" cols="10" .value=${show.details}></textarea>
            <button type="submit">Edit Show</button>
        </form>
    </div>
</section>
`;

export async function editView(ctx) {
    const id = ctx.params.id;
    const show = await getShowById(id);

    render(editTemplate(show, createSubmitHandler(onSubmit)));

    async function onSubmit({
        title,
        "image-url": imageUrl,
        genre,
        country,
        details }) {

        if (!title || !imageUrl || !genre || !country || !details) {
            return alert("All fields are required");
        }

        await updateShow(id, {
            title,
            imageUrl,
            genre,
            country,
            details
        });

        page.redirect("/details/" + id);
    }
}

