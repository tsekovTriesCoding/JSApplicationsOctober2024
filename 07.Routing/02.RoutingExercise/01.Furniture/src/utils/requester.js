import { userUtil } from "./userUtil.js";

async function requester(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if (data) {
        options.headers["Content-type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const userToken = userUtil.getToken();

    if (userToken) {
        options.headers["X-Authorization"] = userToken;
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = response.json();

            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return await response.json();
    } catch (error) {
        alert(error);
        throw new Error(error);
    }
}

async function get(url) {
    return requester("GET", url);
}
async function post(url, data) {
    return requester("POST", url, data);
}
async function put(url, data) {
    return requester("PUT", url, data);
}
async function del(url) {
    return requester("DELETE", url);
}

export const api = {
    get,
    post,
    put,
    del
}