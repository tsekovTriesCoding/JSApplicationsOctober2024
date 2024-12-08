import { buyProduct, getBuysByProductId } from "../data/buy.js";
import { deleteProduct, getProductById } from "../data/product.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (product, isCreator, isLoggedIn, onDelete, onBuy, hasBought, buys) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${product.imageUrl} alt="example1" />
        <p id="details-title">${product.name}</p>
        <p id="details-category">
            Category: <span id="categories">${product.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${product.price}</span>$
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">${buys}</span> times.</h4>
                <span>${product.description}</div>
        </div>

        ${isLoggedIn ? html` <div id="action-buttons">
            ${isCreator ? html` <a href="/edit/${product._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
            : html`${hasBought ? null : html`<a @click=${onBuy} href="javascript:void(0)" id="buy-btn">Buy</a>`}`}
        </div>` : null}
    </div>
</section>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const [product, buysInfo] = await Promise.all([
        getProductById(id),
        getBuysByProductId(id)
    ]);

    const userData = getUserData();
    const isCreator = userData?._id === product._ownerId;
    const hasBought = buysInfo.hasBought;

    render(detailsTemplate(product, isCreator, Boolean(userData), onDelete, onBuy, hasBought, buysInfo.buysCount));

    async function onBuy() {
        await buyProduct(id);
        page.redirect(`/details/${id}`);
    }

    async function onDelete() {
        const choice = confirm("Do you want to delete the product?");

        if (!choice) {
            return;
        }

        await deleteProduct(id);
        page.redirect("/dashboard");
    }
}