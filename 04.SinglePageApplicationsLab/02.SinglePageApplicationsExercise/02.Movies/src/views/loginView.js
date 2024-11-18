import { userService } from "../api/userService.js";

const section = document.getElementById('form-login');
const sections = document.querySelectorAll('section');
const loginForm = section.querySelector('form');

loginForm.addEventListener("submit", onSubmit);

let context = null;
export function showLogin(ctx) {
    context = ctx;
    sections.forEach(sec => sec.style.display = 'none');
    section.style.display = 'block';
}

async function onSubmit(e) {
    e.preventDefault();

    debugger
    const formData = new FormData(loginForm);
    const { email, password} = Object.fromEntries(formData);

    if (!email || !password) {
        return alert("wrong email or password");
    }

    await userService.login({email, password});
    context.updateNav();
    context.goTo("/");
}