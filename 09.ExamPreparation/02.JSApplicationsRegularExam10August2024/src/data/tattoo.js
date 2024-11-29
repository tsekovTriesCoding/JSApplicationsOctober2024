import { del, get, post, put } from "./api.js"

const endpoints = {
    allTattoos: "/data/tattoos?sortBy=_createdOn%20desc",
    baseTattoos: "/data/tattoos"
}

export function getAllTattoos() {
    return get(endpoints.allTattoos);
}

export function createTattoo(data) {
    return post(endpoints.baseTattoos, data);
}

export function getTattoobyId(id) {
    return get(endpoints.baseTattoos + "/" + id);
}

export function updateTattoo(id, data) {
    return put(endpoints.baseTattoos + "/" + id, data);
}

export function deleteTattoo(id) {
    return del(endpoints.baseTattoos + "/" + id);
}

