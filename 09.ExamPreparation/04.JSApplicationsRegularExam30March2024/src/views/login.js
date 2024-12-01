import { login } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../util.js";

const loginTemplate = (onLogin) => html`
<section id="login">
  <div class="form">
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

export function loginView(ctx) {
  render(loginTemplate(createSubmitHandler(onLogin.bind(ctx))));
}

async function onLogin({ email, password }) {
  if (!email) {
    return this.showNotification("Email is required");
  } else if (!password) {
    return this.showNotification("Password is required");
  }

  await login(email, password);

  updateNav();
  page.redirect("/");
}