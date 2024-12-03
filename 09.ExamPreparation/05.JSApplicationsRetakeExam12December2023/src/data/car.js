import { del, get, post, put } from "./api.js"

const endpoints = {
    allCars: "/data/cars?sortBy=_createdOn%20desc",
    baseCars: "/data/cars",
    carsByModel: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`,
}

export function getAllCars() {
    return get(endpoints.allCars);
}

export function createCar(data) {
    return post(endpoints.baseCars, data);
}

export function getCarbyId(id) {
    return get(endpoints.baseCars + "/" + id);
}

export function updateCar(id, data) {
    return put(endpoints.baseCars + "/" + id, data);
}

export function deleteCar(id) {
    return del(endpoints.baseCars + "/" + id);
}

export function getCarsByModel(model) {
    return get(endpoints.carsByModel(model));
}