import { deleteEvent, getEventById } from "../data/event.js";
import { getGoingByEventId, going } from "../data/going.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (event, isCreator, isLoggedIn, onDelete, onGoing, isGoing, goingCount) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${event.imageUrl} alt="example1" />
        <p id="details-title">${event.name}</p>
        <p id="details-category">
            Category: <span id="categories">${event.category}</span>
        </p>
        <p id="details-date">
            Date:<span id="date">${event.date}</span></p>
        <div id="info-wrapper">
            <div id="details-description">
                <span>${event.description}</div>
        </div>

        <h3>Going: <span id="go">${goingCount}</span> times.</h3>

        ${isLoggedIn ? html`<div id="action-buttons">
            ${isCreator ? html`<a href="/edit/${event._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` :
            html`${isGoing ? null : html`<a @click=${onGoing} href="" id="go-btn">Going</a>`}`}
        </div>` : null}
    </div>
</section>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const [event, goingInfo] = await Promise.all([
        getEventById(id),
        getGoingByEventId(id)
    ]);

    const userData = getUserData();
    const isCreator = userData?._id === event._ownerId;
    const isGoing = goingInfo.isGoing;

    render(detailsTemplate(event, isCreator, Boolean(userData), onDelete, onGoing, isGoing, goingInfo.goingCount));

    async function onGoing() {
        await going(id);
        page.redirect(`/details/${id}`);
    }

    async function onDelete() {
        const choice = confirm("Do you want to delete the event?");

        if (!choice) {
            return;
        }

        await deleteEvent(id);
        page.redirect("/dashboard");
    }
}