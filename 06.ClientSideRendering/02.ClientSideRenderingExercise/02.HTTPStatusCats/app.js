import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const allCats = document.getElementById('allCats');

render(createCatsListTemp(cats), allCats);

function createCatsListTemp(cats) {
    return html`
    <ul>
        ${cats.map(createCatTemp)}
    </ul>`
}

function createCatTemp(cat) {
    return html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${toggleButton}>Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
    `;
}

function toggleButton(e) {
    const button = e.target;

    if (button.textContent == 'Show status code') {
        button.textContent = 'Hide status code';
        button.nextElementSibling.style.display = 'block';
    } else {
        button.textContent = 'Show status code';
        button.nextElementSibling.style.display = 'none';
    }
}

