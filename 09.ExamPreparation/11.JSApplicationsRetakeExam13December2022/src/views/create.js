import { createProduct } from "../data/product.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onAdd) => html`
<section id="create">
    <div class="form">
        <h2>Add Product</h2>
        <form @submit=${onAdd} class="create-form">
            <input type="text" name="name" id="name" placeholder="Product Name" />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
            <input type="text" name="category" id="product-category" placeholder="Category" />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
                cols="50"></textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" />

            <button type="submit">Add</button>
        </form>
    </div>
</section>`;

export function createView() {
    render(createTemplate(createSubmitHandler(onAdd)));
}

async function onAdd({ name, imageUrl, category, description, price }) {
    if (!name || !imageUrl || !category || !description || !price) {
        return alert("All fields are required");
    }

    await createProduct({ name, imageUrl, category, description, price });
    page.redirect("/dashboard");
}