import { html, render } from "../../node_modules/lit-html/lit-html.js";

const errorBox = document.getElementById("errorBox");

const template = (message) => html`
<span class="msg">${message}</span>`;

export const notificationMiddleware = (ctx, next) => {
    ctx.showNotification = (message) => {
        render(template(message), errorBox);

        errorBox.style.display = "block";

        setTimeout(() => {
            errorBox.style.display = "none";
        }, 3000);
    }

    next();
}
