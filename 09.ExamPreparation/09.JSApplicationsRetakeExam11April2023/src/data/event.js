import { del, get, post, put } from "./api.js"

const endpoints = {
    allEvents: "/data/events?sortBy=_createdOn%20desc",
    baseEvents: "/data/events",
}

export function getAllEvents() {
    return get(endpoints.allEvents);
}

export function createEvent(data) {
    return post(endpoints.baseEvents, data);
}

export function getEventById(id) {
    return get(endpoints.baseEvents + "/" + id);
}

export function updateEvent(id, data) {
    return put(endpoints.baseEvents + "/" + id, data);
}

export function deleteEvent(id) {
    return del(endpoints.baseEvents + "/" + id);
}