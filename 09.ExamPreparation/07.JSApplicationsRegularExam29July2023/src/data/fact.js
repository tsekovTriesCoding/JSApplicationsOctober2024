import { del, get, post, put } from "./api.js"

const endpoints = {
    allFacts: "/data/facts?sortBy=_createdOn%20desc",
    baseFacts: "/data/facts",
}

export function getAllFacts() {
    return get(endpoints.allFacts);
}

export function createFact(data) {
    return post(endpoints.baseFacts, data);
}

export function getFactById(id) {
    return get(endpoints.baseFacts + "/" + id);
}

export function updateFact(id, data) {
    return put(endpoints.baseFacts + "/" + id, data);
}

export function deleteFact(id) {
    return del(endpoints.baseFacts + "/" + id);
}
