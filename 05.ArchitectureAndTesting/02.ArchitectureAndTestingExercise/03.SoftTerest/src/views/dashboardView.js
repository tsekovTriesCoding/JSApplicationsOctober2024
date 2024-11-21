import { dataService } from "../api/dataService.js";

const main = document.querySelector('main');
const section = document.querySelector('div[data-section="dashboard"]');

let context = null;
export function showDashboardView(ctx) {
    main.replaceChildren(section);
    loadAllIdeas();
    context = ctx;
}

async function loadAllIdeas() {
    section.innerHTML = '';
    const data = await dataService.getAllIdeas();

    if (!data.length) {
       const h1 = document.createElement('h1');
       h1.textContent = 'No ideas yet! Be the first one :)';
       return section.replaceChildren(h1);
    }

    data.forEach(idea => {
        renderIdeaCard(idea);
    })
}

function renderIdeaCard(idea) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('card');
    divContainer.classList.add('overflow-hidden');
    divContainer.classList.add('current-card');
    divContainer.classList.add('details');
    divContainer.style.width = '20rem';
    divContainer.style.height = '18rem';

    divContainer.innerHTML = `
        <div class="card-body">
            <p class="card-text">${idea.title}</p>
        </div>
        <img class="card-image" src="${idea.img}" alt="Card image cap">
        <a class="btn" data-id="${idea._id}" href="/details">Details</a>
    `;

    divContainer.querySelector('a').addEventListener("click", onDetails);

    section.appendChild(divContainer);
}

function onDetails(e) {
    e.preventDefault();
    const id = e.target.dataset.id;

    context.goTo("/details", id);
}