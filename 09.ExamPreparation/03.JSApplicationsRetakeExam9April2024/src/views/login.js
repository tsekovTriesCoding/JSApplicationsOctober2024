import { login } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../util.js";

const loginTemplate = (onLogin) => html`
<section id="login">
    <div class="form">
        <img class="border" src="./images/border.png" alt="" />
        <h2>Login</h2>
        <form @submit=${onLogin} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>
`;

export function loginView() {
    render(loginTemplate(createSubmitHandler(onLogin)));
}

async function onLogin({ email, password }) {
    if (!email) {
        return alert("Email field is empty!")
    }

    if (!password) {
        return alert("Password field is empty!")
    }

    await login(email, password);

    updateNav();
    page.redirect("/");
}