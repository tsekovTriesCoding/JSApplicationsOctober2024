import { getUserData } from "../util.js";
import { get, post } from "./api.js"

const endpoints = {
    like: "/data/useful",
    totalLikes: (characterId) => `/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`,
    likesSpecificUser: (characterId, userId) => `/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function likeCharacter(characterId) {
    return post(endpoints.like, { characterId });
}

export async function getLikesByCharacterId(characterId) {
    const userData = getUserData();

    const requests = [
        get(endpoints.totalLikes(characterId))
    ];

    if (userData) {
        requests.push(get(endpoints.likesSpecificUser(characterId, userData._id)));
    }

    const [likes, hasLikes] = await Promise.all(requests);

    return {
        likes,
        hasLikes: Boolean(hasLikes),
    }
}