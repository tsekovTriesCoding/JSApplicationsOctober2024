import { api } from "./requester.js"

const endpoints = {
    getAll: "http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
    create: "http://localhost:3030/data/ideas",
    getById: "http://localhost:3030/data/ideas/",
    deleteById: "http://localhost:3030/data/ideas/",
}

async function getAllIdeas() {
    return await api.get(endpoints.getAll);
}

async function createIdea(data) {
    return await api.post(endpoints.create, data);
}

async function details(id) {
    return await api.get(endpoints.getById + id);
}

async function deleteById(id) {
    return await api.del(endpoints.deleteById + id);
}

export const dataService = {
    getAllIdeas,
    createIdea,
    details,
    deleteById,
}