import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../util.js";

const registerTemplate = (onRegister) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onRegister} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export function registerView() {
    render(registerTemplate(createSubmitHandler(onRegister)));
}

async function onRegister({ email, password, "re-password": repass }) {
    if (!email) {
        return alert("Email field is empty!")
    }

    if (!password) {
        return alert("Password field is empty!")
    }

    if (!repass) {
        return alert("Repeat password field is empty!")
    }

    if (password !== repass) {
        return alert("Password do not match!")
    }

    await register(email, password);

    updateNav();
    page.redirect("/dashboard");
}