import { del, get, post, put } from "./api.js"

const endpoints = {
    allFruits: "/data/fruits?sortBy=_createdOn%20desc",
    baseFruits: "/data/fruits",
    fruitsByName: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
}

export function getAllFruits() {
    return get(endpoints.allFruits);
}

export function createFruit(data) {
    return post(endpoints.baseFruits, data);
}

export function getFruitById(id) {
    return get(endpoints.baseFruits + "/" + id);
}

export function updateFruit(id, data) {
    return put(endpoints.baseFruits + "/" + id, data);
}

export function deleteFruit(id) {
    return del(endpoints.baseFruits + "/" + id);
}

export function getFruitsByName(name) {
    return get(endpoints.fruitsByName(name));
}
