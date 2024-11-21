import { dataService } from "../api/dataService.js";

const main = document.querySelector('main');
const section = document.querySelector('div[data-section="create"]');
const createForm = section.querySelector('form');

createForm.addEventListener("submit", onSubmit);

let context = null;
export function showCreateView(ctx) {
    main.replaceChildren(section);
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(createForm);
    const { title, description, imageURL } = Object.fromEntries(formData);

    if (title.length < 6 || description.length < 10 || imageURL.length < 5) {
        return alert('Ivalid title, description, or imageURL')
    }

    createForm.reset();
    await dataService.createIdea({title, description, img: imageURL});
    context.goTo("/dashboard");
}