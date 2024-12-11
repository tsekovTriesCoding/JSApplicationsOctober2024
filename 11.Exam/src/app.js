import { logout } from "./data/user.js";
import { page } from "./lib.js";
import { notificationMiddleware } from "./middleware/notification.js";
import { updateNav } from "./util.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";



updateNav();
page(notificationMiddleware);

page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/dashboard", dashboardView);
page("/create", createView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page.start();

document.getElementById('logout').addEventListener("click", async () => {
    await logout();

    updateNav();
    page.redirect("/");
});