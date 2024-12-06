import { getUserData } from "../util.js";
import { get, post } from "./api.js"

const endpoints = {
    going: "/data/going",
    totalGoing: (eventId) => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    goingSpecificUser: (eventId, userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function going(eventId) {
    return post(endpoints.going, { eventId });
}

export async function getGoingByEventId(eventId) {
    const userData = getUserData();

    const requests = [
        get(endpoints.totalGoing(eventId))
    ];

    if (userData) {
        requests.push(get(endpoints.goingSpecificUser(eventId, userData._id)));
    }

    const [goingCount, isGoing] = await Promise.all(requests);

    return {
        goingCount,
        isGoing: Boolean(isGoing),
    }
}