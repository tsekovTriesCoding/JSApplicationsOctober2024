import { del, get, post, put } from "./api.js"

const endpoints = {
    allSolutions: "/data/solutions?sortBy=_createdOn%20desc",
    baseSolutions: "/data/solutions",
}

export function getAllSolutions() {
    return get(endpoints.allSolutions);
}

export function createSolution(data) {
    return post(endpoints.baseSolutions, data);
}

export function getSolutionById(id) {
    return get(endpoints.baseSolutions + "/" + id);
}

export function updateSolution(id, data) {
    return put(endpoints.baseSolutions + "/" + id, data);
}

export function deleteSolution(id) {
    return del(endpoints.baseSolutions + "/" + id);
}