import page from "../node_modules/page/page.mjs";
import { logout } from "./utils/logout.js";
import { updateNav } from "./utils/navigationControl.js";
import { showBrowseTeamsView } from "./views/browseTeams.js";
import { showCreateTeamView } from "./views/createTeamView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showEditView } from "./views/editView.js";
import { showHomeView } from "./views/homeView.js";
import { showLoginView } from "./views/loginView.js";
import { showMyTeamsView } from "./views/myTeamsView.js";
import { showRegisterView } from "./views/registerView.js";



page("/", showHomeView);
page("/login", showLoginView);
page("/register", showRegisterView);
page("/logout", logout);
page("/myTeams", showMyTeamsView);
page("/browseTeams", showBrowseTeamsView);
page("/details/:id", showDetailsView);
page("/edit/:id", showEditView);
page("/createTeam", showCreateTeamView);
page.start();

showHomeView();
updateNav();