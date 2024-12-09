import { getUserData } from "../util.js";
import { get, post } from "./api.js"

const endpoints = {
    like: "/data/likes",
    totalLikes: (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    likesSpecificUser: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function likeAlbum(albumId) {
    return post(endpoints.like, { albumId });
}

export async function getLikesByAlbumId(albumId) {
    const userData = getUserData();

    const requests = [
        get(endpoints.totalLikes(albumId))
    ];

    if (userData) {
        requests.push(get(endpoints.likesSpecificUser(albumId, userData._id)));
    }

    const [likes, hasLikes] = await Promise.all(requests);

    return {
        likes,
        hasLikes: Boolean(hasLikes),
    }
}