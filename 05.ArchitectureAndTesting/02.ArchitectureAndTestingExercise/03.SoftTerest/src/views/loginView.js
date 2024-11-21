import { userService } from "../api/userService.js";

const main = document.querySelector('main');
const section = document.querySelector('div[data-section="login"]');
const loginForm = section.querySelector('form');

loginForm.addEventListener("submit", onSubmit);

let context = null;
export function showLoginView(ctx) {
    main.replaceChildren(section);
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const { email, password} = Object.fromEntries(formData);

    if (!email || !password) {
        return alert("wrong email or password");
    }

    await userService.login({email, password});
    context.updateNav();
    context.goTo("/");
}