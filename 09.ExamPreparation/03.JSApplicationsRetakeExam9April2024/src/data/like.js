import { getUserData } from "../util.js";
import { get, post } from "./api.js"

const endpoints = {
    like: "/data/likes",
    totalLikes: (solutionId) => `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`,
    likesSpecificUser: (solutionId, userId) => `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function likeSolution(solutionId) {
    return post(endpoints.like, { solutionId });
}

export async function getLikesBySolutionId(solutionId) {
    const userData = getUserData();

    const requests = [
        get(endpoints.totalLikes(solutionId))
    ];

    if (userData) {
        requests.push(get(endpoints.likesSpecificUser(solutionId, userData._id)));
    }

    const [likes, hasLikes] = await Promise.all(requests);

    return {
        likes,
        hasLikes: Boolean(hasLikes),
    }
}