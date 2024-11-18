import { api } from "./requester.js"

const endpoints = {
    getAllMovies: "http://localhost:3030/data/movies",
    getMovie: "http://localhost:3030/data/movies/",
    createMovie: "http://localhost:3030/data/movies",
    updateMovie: "http://localhost:3030/data/movies/",
    deleteMovie: "http://localhost:3030/data/movies/",
    addLike: "http://localhost:3030/data/likes",
}

async function getAllMovies() {
    return await api.get(endpoints.getAllMovies);
}

async function getMovie(id) {
    return await api.get(endpoints.getMovie + id);
}

async function createMovie(data) {
    return await api.post(endpoints.createMovie, data);
}

async function updateMovie(id, movie) {
    return await api.put(endpoints.updateMovie + id, movie);
}

async function deleteMovie(id) {
    return await api.del(endpoints.deleteMovie + id);
}

async function addLike(data) {
    return await api.post(endpoints.addLike, data);
}

async function getLikes(id) {
    return await api.get(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
}

export const dataService = {
    getAllMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    addLike,
    getLikes,
}