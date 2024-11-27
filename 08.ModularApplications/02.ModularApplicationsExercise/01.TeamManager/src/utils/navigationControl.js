import { userUtil } from "./userUtil.js";

export function updateNav() {
    const userData = userUtil.getUserData();
    const userNav = document.querySelectorAll('nav a[data-nav="user"]');
    const guestNav = document.querySelectorAll('nav a[data-nav="guest"]');

    if (userData) {
        userNav.forEach(e => e.style.display = "inline-block");
        guestNav.forEach(e => e.style.display = "none");
    } else {
        userNav.forEach(e => e.style.display = "none");
        guestNav.forEach(e => e.style.display = "inline-block");
    }
}