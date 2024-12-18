import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";

function temp (item, error) {
    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control ${hasError(error, "make")}" id="new-make" type="text" name="make" value="${item.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control ${hasError(error, "model")}" id="new-model" type="text" name="model" value="${item.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control ${hasError(error, "year")}" id="new-year" type="number" name="year" value="${item.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control ${hasError(error, "description")}" id="new-description" type="text" name="description" value="${item.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control ${hasError(error, "price")}" id="new-price" type="number" name="price" value="${item.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control ${hasError(error, "img")}" id="new-image" type="text" name="img" value="${item.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="${item.material}">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
`;
} 

let context = null;
export async function showEditView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const item = await dataService.getFurnitureDetails(id);
    ctx.render(temp(item));
}

function hasError(error, prop) {
    if (!error) {
        return;
    }

    return error[prop] ? "is-invalid" : "is-valid";
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let { make, model, year, description, price, img, material } = Object.fromEntries(formData);
    year = Number(year);
    price = Number(price);

    let error = {};
    let hasError = false;

    if (make.length < 4) {
        error.make = true;
        hasError = true;
    }

    if (model.length < 4) {
        error.model = true;
        hasError = true;
    }

    if (year < 1950 || year > 2050) {
        error.year = true;
        hasError = true;
    }

    if (description.length <= 10) {
        error.description = true;
        hasError = true;
    }

    if (price < 0) {
        error.price = true;
        hasError = true;
    }

    if (!img) {
        debugger
        error.img = true;
        hasError = true;
    }

    if (hasError) {
        const item = { make, model, year, description, price, img, material };
        return context.render(temp(item, error));
    }

    const id = context.params.id;
    await dataService.updateFurniture(id, { make, model, year, description, price, img, material });
    context.goTo("/dashboard");
}