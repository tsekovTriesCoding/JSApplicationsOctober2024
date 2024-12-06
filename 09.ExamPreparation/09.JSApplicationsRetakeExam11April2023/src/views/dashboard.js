import { getAllEvents } from "../data/event.js";
import { html, render } from "../lib.js";
import { eventTemplate } from "./partials/event.js";

const dashboardTemplate = (events) => html`
<h2>Current Events</h2>
<section id="dashboard">
     ${events.length ? events.map(eventTemplate) : html`<h4>No Events yet.</h4>`}
</section>`;

export async function dashboardView() {
    const events = await getAllEvents();

    render(dashboardTemplate(events));
}