import { getCarsByModel } from "../data/car.js";
import { html, render } from "../lib.js"
import { createSubmitHandler } from "../util.js";
import { carFromSearchTemplate } from "./partials/car.js";

const searchTemplate = (onSearch, carsByModel) => html`
<section id="search">
    <div class="form">
        <h4>Search</h4>
        <form @submit=${onSearch} class="search-form">
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
        </form>
    </div>
    <div class="search-result">
        ${carsByModel?.length ? carsByModel.map(carFromSearchTemplate) : html`<h2 class="no-avaliable">No result.</h2>`}
    </div>
</section>`;

export function searchView() {
    render(searchTemplate(createSubmitHandler(onSearch)));
}

async function onSearch({ search }) {
    if (!search) {
        return alert("Search field can't be empty");
    }

    const carsByModel = await getCarsByModel(search);
    render(searchTemplate(createSubmitHandler(onSearch), carsByModel));
}

