import { del, get, post, put } from "./api.js"

const endpoints = {
    allMotorcycles: "/data/motorcycles?sortBy=_createdOn%20desc",
    baseMotorcycles: "/data/motorcycles",
    motorcyclesByModel: (query) => `/data/motorcycles?where=model%20LIKE%20%22${query}%22`,
}

export function getAllMotorcycles() {
    return get(endpoints.allMotorcycles);
}

export function createMotorcycle(data) {
    return post(endpoints.baseMotorcycles, data);
}

export function getMotorcycleById(id) {
    return get(endpoints.baseMotorcycles + "/" + id);
}

export function updateMotorcycle(id, data) {
    return put(endpoints.baseMotorcycles + "/" + id, data);
}

export function deleteMotorcycle(id) {
    return del(endpoints.baseMotorcycles + "/" + id);
}

export function getMotorcycleByModel(model) {
    return get(endpoints.motorcyclesByModel(model));
}

