import { userService } from "../api/userService.js";

const main = document.querySelector('main');
const section = document.querySelector('div[data-section="register"]');
const registerForm = section.querySelector('form');

registerForm.addEventListener("submit", onSubmit);

let context = null;
export function showRegisterView(ctx) {
    main.replaceChildren(section);
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const { email, password, repeatPassword } = Object.fromEntries(formData);

    if (email.length < 3 || password.length < 3 || password !== repeatPassword) {
        return alert('Wrong email or password length, or passwords dont`t match')
    }

    await userService.register({email, password});
    context.updateNav();
    context.goTo("/");
}