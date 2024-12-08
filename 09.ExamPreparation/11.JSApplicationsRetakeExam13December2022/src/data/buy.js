import { getUserData } from "../util.js";
import { get, post } from "./api.js"

const endpoints = {
    buyProduct: "/data/bought",
    totalBuys: (productId) => `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    buysBySpecificUser: (productId, userId) => `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export function buyProduct(productId) {
    return post(endpoints.buyProduct, { productId });
}

export async function getBuysByProductId(productId) {
    const userData = getUserData();

    const requests = [
        get(endpoints.totalBuys(productId))
    ];

    if (userData) {
        requests.push(get(endpoints.buysBySpecificUser(productId, userData._id)));
    }

    const [buysCount, hasBought] = await Promise.all(requests);

    return {
        buysCount,
        hasBought: Boolean(hasBought),
    }
}