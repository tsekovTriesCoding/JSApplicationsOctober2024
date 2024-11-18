import { userService } from "../api/userService.js";

const section = document.getElementById('form-sign-up');
const sections = document.querySelectorAll('section');
const registerForm = section.querySelector('form');

registerForm.addEventListener("submit", onSubmit);

let context = null;
export function showRegister(ctx) {
    context = ctx;
    sections.forEach(sec => sec.style.display = 'none');
    section.style.display = 'block';
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const { email, password, repeatPassword } = Object.fromEntries(formData);

    if (!email || password.length < 6 || password !== repeatPassword) {
        return alert('Wrong email or password length, or passwords dont`t match')
    }

    await userService.register({email, password});
    context.updateNav();
    context.goTo("/");
}