const homeSection = document.querySelector('div[data-section="home"]');
const main = document.querySelector('main');
const button = homeSection.querySelector('.btn');

button.addEventListener("click", onNavigate);

let ctx = null;
export function showHomeView(context) {
    main.replaceChildren(homeSection);
    ctx = context;
}

function onNavigate(e) {
    e.preventDefault();

    const href = e.target.href;
    const path = new URL(href).pathname;
    ctx.goTo(path);
}