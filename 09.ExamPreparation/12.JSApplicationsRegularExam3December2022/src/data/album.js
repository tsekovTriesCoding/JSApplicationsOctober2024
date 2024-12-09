import { del, get, post, put } from "./api.js"

const endpoints = {
    allAlbums: "/data/albums?sortBy=_createdOn%20desc",
    baseAlbums: "/data/albums",
}

export function getAllAlbums() {
    return get(endpoints.allAlbums);
}

export function createAlbum(data) {
    return post(endpoints.baseAlbums, data);
}

export function getAlbumById(id) {
    return get(endpoints.baseAlbums + "/" + id);
}

export function updateAlbum(id, data) {
    return put(endpoints.baseAlbums + "/" + id, data);
}

export function deleteAlbum(id) {
    return del(endpoints.baseAlbums + "/" + id);
}