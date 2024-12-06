import { createEvent } from "../data/event.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onAdd) => html`
<section id="create">
    <div class="form">
        <h2>Add Event</h2>
        <form @submit=${onAdd} class="create-form">
            <input type="text" name="name" id="name" placeholder="Event" />
            <input type="text" name="imageUrl" id="event-image" placeholder="Event Image URL" />
            <input type="text" name="category" id="event-category" placeholder="Category" />

            <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>

            <input type="text" name="date" id="date" placeholder="When?" />

            <button type="submit">Add</button>
        </form>
    </div>
</section>`;

export function createView() {
    render(createTemplate(createSubmitHandler(onAdd)));
}

async function onAdd({ name, imageUrl, category, description, date }) {
    if (!name || !imageUrl || !category || !description || !date) {
        return alert("All fields are required");
    }

    await createEvent({ name, imageUrl, category, description, date });
    page.redirect("/dashboard");
}