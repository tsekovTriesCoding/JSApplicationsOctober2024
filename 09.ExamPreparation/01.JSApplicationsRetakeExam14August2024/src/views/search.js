import { getShowsByTitle } from "../data/show.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import { showTemplate } from "./partials/show.js";

const searchTemplate = (onSubmit) => html`
<section id="search">
<div class="form">
    <h2>Search</h2>
    <form @submit=${onSubmit} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
    </form>
</div>
<h4>Results:</h4>
<div class="search-result">

</div>
</section>
`;

export function searchView() {
    render(searchTemplate(createSubmitHandler(onSubmit)));
}

const resTemp = (data) => html`
${!data.length ? html`
    <p class="no-result">There is no TV show with this title</p>
    ` : html`
        <!--If there are matches display a div with information about every show-->
        ${data.map(showTemplate)}
    `}
`;

async function onSubmit({ search }) {
    if (!search) {
        return alert("Enter search word!")
    }

    const data = await getShowsByTitle(search);
    const result = document.querySelector('search-result');

    render(resTemp(data), result);
}