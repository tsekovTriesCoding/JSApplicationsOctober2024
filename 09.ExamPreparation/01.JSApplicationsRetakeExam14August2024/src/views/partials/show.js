import { html } from "../../lib.js";

export const showTemplate = (show) => html`
<div class="show">
    <img src=${show.imageUrl} alt="example1" />
    <div class="show-info">
        <h3 class="title">${show.title}</h3>
        <p class="genre">Genre: ${show.genre}</p>
        <p class="country-of-origin">Country of Origin: ${show.country}</p>
        <a class="details-btn" href="/details/${show._id}">Details</a>
    </div>
</div>
`;