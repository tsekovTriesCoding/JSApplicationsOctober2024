import { getFruitsByName } from "../data/fruit.js";
import { html, render } from "../lib.js"
import { createSubmitHandler } from "../util.js";
import { fruitTemplate } from "./partials/fruit.js";

const searchTemplate = (onSearch, fruitsByName) => html`
<section id="search">
<div class="form">
    <h2>Search</h2>
    <form @submit=${onSearch} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
    </form>
</div>
<h4>Results:</h4>
${!fruitsByName ? null : html`<div class="search-result">
    ${!fruitsByName.length ? html`<p class="no-result">No result.</p>` : fruitsByName.map(fruitTemplate)}
</div>`}
</section>`;

export function searchView() {
    render(searchTemplate(createSubmitHandler(onSearch)));
}

async function onSearch({ search }) {
    if (!search) {
        return alert("Search field can't be empty");
    }

    debugger
    const fruitsByName = await getFruitsByName(search);
    render(searchTemplate(createSubmitHandler(onSearch), fruitsByName));
}

