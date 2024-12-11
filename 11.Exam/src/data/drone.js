import { del, get, post, put } from "./api.js"

const endpoints = {
    allDrones: "/data/drones?sortBy=_createdOn%20desc",
    baseDrones: "/data/drones",
}

export function getAllDrones() {
    return get(endpoints.allDrones);
}

export function createDrone(data) {
    return post(endpoints.baseDrones, data);
}

export function getDroneById(id) {
    return get(endpoints.baseDrones + "/" + id);
}

export function updateDrone(id, data) {
    return put(endpoints.baseDrones + "/" + id, data);
}

export function deleteDrone(id) {
    return del(endpoints.baseDrones + "/" + id);
}



