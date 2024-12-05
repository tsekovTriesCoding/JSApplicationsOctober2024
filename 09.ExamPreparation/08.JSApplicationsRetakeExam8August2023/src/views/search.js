import { getMotorcycleByModel } from "../data/motorcycle.js";
import { html, render } from "../lib.js"
import { createSubmitHandler } from "../util.js";
import { motorcycleShortTemplate } from "./partials/motorcycle.js";

const searchTemplate = (onSearch, motorcyclesByModel) => html`
<section id="search">
<div class="form">
    <h4>Search</h4>
    <form @submit=${onSearch} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
    </form>
</div>
<h4 id="result-heading">Results:</h4>
${motorcyclesByModel ? html`<div class="search-result">
    ${!motorcyclesByModel.length ? html`<h2 class="no-avaliable">No result.</h2>` :
            motorcyclesByModel.map(motorcycleShortTemplate)}
</div>` : null}
</section>`;

export function searchView() {
    render(searchTemplate(createSubmitHandler(onSearch)));
}

async function onSearch({ search }) {
    if (!search) {
        return alert("Search field can't be empty");
    }

    const motorcyclesByModel = await getMotorcycleByModel(search);
    render(searchTemplate(createSubmitHandler(onSearch), motorcyclesByModel));
}

