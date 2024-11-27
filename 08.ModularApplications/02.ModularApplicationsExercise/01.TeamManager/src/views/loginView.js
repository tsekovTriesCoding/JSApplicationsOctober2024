import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderer } from "../utils/renderer.js";

import { userService } from "../service/userService.js"
import { goTo } from "../utils/goTo.js";
import { updateNav } from "../utils/navigationControl.js";

const temp = (error) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
            ${error && html`<div class="error">${error}</div>`}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="#" class="invert">Sign up here</a>
        </footer>
    </article>
</section>
`;

export function showLoginView() {
    renderer(temp());
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    if (!email) {
        return renderer(temp("Invalid email"));
    }

    await userService.login({ email, password });
    updateNav();
    goTo("/myTeams");
}