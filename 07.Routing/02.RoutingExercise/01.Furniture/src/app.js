import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { userService } from "./service/userService.js";
import { userUtil } from "./utils/userUtil.js";
import { showCreateView } from "./views/createView.js";
import { deleteItem } from "./views/deleteView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showEditView } from "./views/editView.js";
import { showHomeView } from "./views/homeView.js";
import { showLoginView } from "./views/loginView.js";
import { showMyFurnitureView } from "./views/myFurniture.js";
import { showRegisterView } from "./views/registerView.js";

const root = document.querySelector(".container");
const userNav = document.getElementById("user");
const guestNav = document.getElementById("guest");

page(updateCtx);
page("/", showHomeView);
page("/create", showCreateView);
page("/dashboard", showHomeView);
page("/details/:id", showDetailsView);
page("/edit/:id", showEditView);
page("/delete/:id", deleteItem);
page("/login", showLoginView);
page("/register", showRegisterView);
page("/myFurniture", showMyFurnitureView);
page("/logout", logout);

page.start();
updateNav();

function updateCtx(ctx, next) {
    ctx.goTo = goTo;
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    next();
}

function renderer(temp) {
    render(temp, root);
}

function goTo(path) {
    page.redirect(path);
}

function updateNav() {
    const user = userUtil.getUserData();

    if (user) {
        userNav.style.display = "inline-block";
        guestNav.style.display = "none";
    } else {
        userNav.style.display = "none";
        guestNav.style.display = "inline-block";
    }
}

async function logout() {
    await userService.logout();
    updateNav();
    goTo("/dashboard");
}