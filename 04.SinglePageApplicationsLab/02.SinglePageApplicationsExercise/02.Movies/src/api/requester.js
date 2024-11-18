import { userUtils } from "../utils/userUtils.js";

async function requester(method, endpoint, data) {
    const userData = userUtils.getUser();
    const options = {
        method,
        headers: {},
    }

    if (data) {
        options.headers["Content-type"] = "application/json"
        options.body = JSON.stringify(data)
    }

    if (userData) {
        options.headers["X-Authorization"] = userData.accessToken;
    }

    try {
        const response = await fetch(endpoint, options);

        if (!response.ok) {
            if (response.status === 403) {
                userUtils.clear();
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return response.json();

    } catch (error) {
        alert(error);
    }
}

async function get(endpoint) {
    return requester("GET", endpoint);
}

async function post(endpoint, data) {
    return requester("POST", endpoint, data);
}

async function put(endpoint, data) {
    return requester("PUT", endpoint, data);
}

async function del(endpoint) {
    return requester("DELETE", endpoint);
}

export const api = {
    get,
    post,
    put,
    del,
}