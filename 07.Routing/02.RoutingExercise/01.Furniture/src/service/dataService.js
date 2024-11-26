/*
Create Furniture (POST): http://localhost:3030/data/catalog 

All Furniture (GET): http://localhost:3030/data/catalog 

Furniture Details (GET): http://localhost:3030/data/catalog/:id 

Update Furniture (PUT): http://localhost:3030/data/catalog/:id 

Delete Furniture (DELETE):  http://localhost:3030/data/catalog/:id 

My Furniture (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22  */

import { api } from "../utils/requester.js"

const endpoints = {
    baseCatalog: "http://localhost:3030/data/catalog",
    baseDetails: "http://localhost:3030/data/catalog/",
    myFurniture: (id) => `http://localhost:3030/data/catalog?where=_ownerId%3D%22${id}%22`
}

async function createFurniture(data) {
    return await api.post(endpoints.baseCatalog, data);
}

async function getAllFurniture() {
    return await api.get(endpoints.baseCatalog);
}

async function getFurnitureDetails(id) {
    return await api.get(endpoints.baseDetails + id);
}

async function updateFurniture(id, data) {
    return await api.put(endpoints.baseDetails + id, data);
}

async function delFurniture(id) {
    return await api.del(endpoints.baseDetails + id);
}

async function getMyFurniture(userId) {
    return await api.get(endpoints.myFurniture(userId));
}

export const dataService = {
    createFurniture,
    getAllFurniture,
    getFurnitureDetails,
    updateFurniture,
    delFurniture,
    getMyFurniture
}