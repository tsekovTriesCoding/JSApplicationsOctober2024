import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderer } from "../utils/renderer.js";

import { userService } from "../service/userService.js"
import { goTo } from "../utils/goTo.js";
import { updateNav } from "../utils/navigationControl.js";

const temp = (error) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
            ${error && html`<div class="error">${error}</div>`}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
        </footer>
    </article>
</section>
`;

export function showRegisterView() {
    renderer(temp());
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, username, password, repass } = Object.fromEntries(formData);

    if (!email || !validateEmail(email)) {
        return renderer(temp("Invalid email"));
    }

    if (username.length < 3) {
        return renderer(temp("Username has to be atleast 3 chars long"));
    }

    if (password.length < 3) {
        return renderer(temp("Password has to be atleast 3 chars long"));
    }

    if (password !== repass) {
        return renderer(temp("Password should match"));
    }

    await userService.register({ email, username, password });
    updateNav();
    goTo("/myTeams");
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}