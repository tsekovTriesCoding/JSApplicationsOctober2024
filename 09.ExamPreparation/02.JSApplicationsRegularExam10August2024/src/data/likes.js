import { getUserData } from "../util.js";
import { get, post } from "./api.js"

const endpoints = {
    like: "/data/likes",
    totalLikes: (tattooId) => `/data/likes?where=tattooId%3D%22${tattooId}%22&distinct=_ownerId&count `,
    likesSpecificUser: (tattooId, userId) => `/data/likes?where=tattooId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function likeTattoo(tattooId) {
    return post(endpoints.like, { tattooId });
}

export async function getLikesByTattooId(tattooId) {
    const userData = getUserData();

    const requests = [
        get(endpoints.totalLikes(tattooId))
    ];

    if (userData) {
        requests.push(get(endpoints.likesSpecificUser(tattooId, userData._id)));
    }

    const [likes, hasLikes] = await Promise.all(requests);

    return {
        likes,
        hasLikes: Boolean(hasLikes),
    }
}