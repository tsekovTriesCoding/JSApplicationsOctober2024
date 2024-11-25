import { html, render } from "./node_modules/lit-html/lit-html.js";

const selectMenu = document.getElementById('menu');
const form = document.querySelector('form');
const itemText = document.getElementById('itemText');

form.addEventListener("submit", addItem);

async function addItem(e) {
    if (e) {
        e.preventDefault();

        debugger
        saveItem({ text: itemText.value });
    }

    const items = await getItems();

    const optionsTemp = createOptionsTemp(Object.values(items));
    render(optionsTemp, selectMenu);
}

async function saveItem(item) {
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(item)
    }

    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', options);
    const data = response.json();
}

function createOptionsTemp(items) {
    return items.map(i => {
        return html`
        <option value="${i._id}">${i.text}</option>;
        `
    });
}

addItem();

async function getItems() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    return response.json();
}