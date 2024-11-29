import { createTattoo } from "../data/tattoo.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onAdd) => html`
<section id="create">
    <div class="form">
        <h2>Add tattoo</h2>
        <form @submit=${onAdd} class="create-form">
            <input type="text" name="type" id="type" placeholder="Tattoo Type" />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
            <select id="user-type" name="user-type">
                <option value="" disabled selected>Select your role</option>
                <option value="Tattoo Artist">Tattoo Artist</option>
                <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                <option value="First Time in Tattoo">
                    First Time in Tattoo
                </option>
                <option value="Tattoo Collector">Tattoo Collector</option>
            </select>
            <button type="submit">Add tattoo</button>
        </form>
    </div>
</section>
`;

export function createView() {
    render(createTemplate(createSubmitHandler(onAdd)));
}

async function onAdd({ type, "image-url": imageUrl, description, "user-type": userType }) {
    if (!type || !imageUrl || !description || !description || !userType) {
        return alert("All fields are required");
    }

    await createTattoo({ type, imageUrl, description, userType });
    page.redirect("/dashboard");
}