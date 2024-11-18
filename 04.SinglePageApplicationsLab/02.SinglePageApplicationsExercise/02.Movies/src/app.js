import { userService } from "./api/userService.js";
import { userUtils } from "./utils/userUtils.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginView.js";
import { showMovieExample } from "./views/movieExample.js";
import { showRegister } from "./views/registerView.js";

const routes = {
    "/": showHome,
    "/logout": onLogout,
    "/login": showLogin,
    "/register": showRegister,
    "/details": showMovieExample,
}

const nav = document.querySelector('nav');
nav.addEventListener("click", onNavigate);

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

function goTo(name, ...params) {
    const handler = routes[name];
    handler(ctx, params);
}

const ctx = {
    goTo,
    updateNav,
}

function updateNav() {
    const hasUser = userUtils.getUser();
    const userLi = document.querySelectorAll('li.nav-item.user');
    const guestLi = document.querySelectorAll('li.nav-item.guest');

    if (hasUser) {
        const userData = userUtils.getUser();
        document.getElementById('welcome-msg').textContent = `Welcome, ${userData.email}`;
        userLi.forEach(a => a.style.display = 'block');
        guestLi.forEach(a => a.style.display = 'none');
    } else {
        userLi.forEach(a => a.style.display = 'none');
        guestLi.forEach(a => a.style.display = 'block');
    }
}

async function onLogout() {
    await userService.logout();
    updateNav();
    goTo("/login");
}

goTo("/");
updateNav();


