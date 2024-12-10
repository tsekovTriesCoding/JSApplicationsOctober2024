import page from "./lib/page.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import catsView from "./views/cats/catsView.js";
import createView from "./views/cats/createView.js";
import detailsView from "./views/cats/detailsView.js";
import homeView from "./views/homeView.js";
import layoutView from "./views/layoutView.js";
import loginView from "./views/loginView.js";
import logoutView from "./views/logoutView.js";
import registerView from "./views/registerView.js";



page(authMiddleware);
page(layoutView);

page('/', homeView);
page("/login", loginView);
page('/logout', logoutView);
page("/register", registerView);
page('/cats', catsView);
page('/cats/create', createView);
page('/cats/:catId/details', detailsView);
page.start();