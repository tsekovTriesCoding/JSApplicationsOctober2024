import { userService } from "./api/userService.js";
import { userUtils } from "./utils/userUtils.js";
import { showCreateView } from "./views/createView.js";
import { showDashboardView } from "./views/dashboardView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showEditView } from "./views/editView.js";
import { showHomeView } from "./views/homeView.js";
import { showLoginView } from "./views/loginView.js";
import { showRegisterView } from "./views/registerView.js";

Array.from(document.querySelectorAll('div[data-section]'))
    .forEach(section => section.remove());

const main = document.querySelector('main');
const nav = document.querySelector('nav');
nav.addEventListener("click", onNavigate);

const routes = {
    "/": showHomeView,
    "/dashboard": showDashboardView,
    "/create": showCreateView,
    "/logout": onLogout,
    "/login": showLoginView,
    "/register": showRegisterView,
    "/edit": showEditView,
    "/details": showDetailsView,
}

async function onLogout() {
    await userService.logout();
    updateNav();
    goTo("/");
}

function onNavigate(e) {
    e.preventDefault();

    let target = e.target;

    if (target.tagName !== "A") {
        target = target.parentElement;
    }

    if (!target.href) {
        return;
    }

    const url = new URL(target.href);
    const viewName = url.pathname;
    goTo(viewName);
}

function updateNav() {
    const hasUser = userUtils.getUser();
    const userA = document.querySelectorAll('a[data-user]');
    const guestA = document.querySelectorAll('a[data-guest]');

    if (hasUser) {
        userA.forEach(a => a.style.display = 'block');
        guestA.forEach(a => a.style.display = 'none');
    } else {
        userA.forEach(a => a.style.display = 'none');
        guestA.forEach(a => a.style.display = 'block');
    }
}

const ctx = {
    goTo,
    updateNav,
}

function goTo(name, ...params) {
    const handler = routes[name];
    handler(ctx, params);
}

goTo("/");
updateNav();
