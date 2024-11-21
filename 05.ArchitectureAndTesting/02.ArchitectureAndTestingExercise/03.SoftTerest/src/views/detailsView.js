import { dataService } from "../api/dataService.js";
import { userUtils } from "../utils/userUtils.js";

const main = document.querySelector('main');
const section = document.querySelector('div[data-section="details"]');

let context = null;
export async function showDetailsView(ctx, params) {
    const id = params[0];
    main.replaceChildren(section);
    const idea = await dataService.details(id);

    renderDetails(idea);
    context = ctx;
}

function renderDetails(idea) {
    const hasOwner = userUtils.hasOwner(idea._ownerId);
    
    let temp = `<img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>
    `;

    const deleteButton = hasOwner ? `<div class="text-center">
        <a class="btn detb" data-id="${idea._id}" href="">Delete</a>
    </div>` : '';

    temp += deleteButton;
    section.innerHTML = temp;

    if (deleteButton) {
        section.querySelector('.btn').addEventListener("click", onDelete);
    }
}

async function onDelete(e) {
    const id = e.target.dataset.id;
    dataService.deleteById(id);
    context.goTo("/dashboard");
}