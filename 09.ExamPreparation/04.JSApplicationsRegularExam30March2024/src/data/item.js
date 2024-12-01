import { del, get, post, put } from "./api.js"

const endpoints = {
    allItems: "/data/cyberpunk?sortBy=_createdOn%20desc",
    baseItems: "/data/cyberpunk",
}

export function getAllItems() {
    return get(endpoints.allItems);
}

export function createItem(data) {
    return post(endpoints.baseItems, data);
}

export function getItemById(id) {
    return get(endpoints.baseItems + "/" + id);
}

export function updateItem(id, data) {
    return put(endpoints.baseItems + "/" + id, data);
}

export function deleteItem(id) {
    return del(endpoints.baseItems + "/" + id);
}

