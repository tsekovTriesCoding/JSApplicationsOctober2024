import { del, get, post, put } from "./api.js"

const endpoints = {
    shows: "/data/shows?sortBy=_createdOn%20desc",
    baseShows: "/data/shows",
    showsByTitle: (query) => `/data/shows?where=title%20LIKE%20%22${query}%22`,
}

export function getShows() {
    return get(endpoints.shows);
}

export function createShow(data) {
    return post(endpoints.baseShows, data);
}
export function getShowById(id) {
    return get(endpoints.baseShows + '/' + id);
}

export function updateShow(id, data) {
    return put(endpoints.baseShows + '/' + id, data);
}

export function deleteShow(id) {
    return del(endpoints.baseShows + '/' + id);
}

export function getShowsByTitle(query) {
    return get(endpoints.showsByTitle(query));
}