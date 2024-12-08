import { del, get, post, put } from "./api.js"

const endpoints = {
    allProducts: "/data/products?sortBy=_createdOn%20desc",
    baseProducts: "/data/products",
    fruitsByName: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
}

export function getAllProducts() {
    return get(endpoints.allProducts);
}

export function createProduct(data) {
    return post(endpoints.baseProducts, data);
}

export function getProductById(id) {
    return get(endpoints.baseProducts + "/" + id);
}

export function updateProduct(id, data) {
    return put(endpoints.baseProducts + "/" + id, data);
}

export function deleteProduct(id) {
    return del(endpoints.baseProducts + "/" + id);
}
