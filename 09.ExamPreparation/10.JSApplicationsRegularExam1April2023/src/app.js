import { page } from "./lib.js";
import { loginView } from "./views/login.js";
import { updateNav } from "./util.js";
import { homeView } from "./views/home.js";
import { registerView } from "./views/register.js";
import { logout } from "./data/user.js";
import { dashboardView } from "./views/dashboard.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { searchView } from "./views/search.js";


updateNav();
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/dashboard", dashboardView);
page("/create", createView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page("/search", searchView);
page.start();

document.getElementById('logout').addEventListener("click", async () => {
    await logout();

    updateNav();
    page.redirect("/");
});
