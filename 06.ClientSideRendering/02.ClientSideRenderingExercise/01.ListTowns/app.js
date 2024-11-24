import { html, render } from "./node_modules/lit-html/lit-html.js";

const form = document.querySelector('.content');
form.addEventListener("submit", onFormSubmit);
const root = document.getElementById('root');

function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const towns = Object.values(data)[0].split(", ");

    const townsListTemp = createTownsListTemp(towns);
    render(townsListTemp, root);
}

function createTownsListTemp(towns) {
    return html`<ul>${towns.map(townTemp)}</ul>`;
}

function townTemp(town) {
    return html`<li>${town}</li>`;
}