function setUser(data) {
    sessionStorage.setItem("userData", JSON.stringify(data));
}

function getUserData() {
    return JSON.parse(sessionStorage.getItem("userData"));
}

function getToken() {
    const userData = getUserData();
    return userData?.accessToken;
}

function hasOwner(itemId) {
    const userData = getUserData();
    return userData._id === itemId;
}

function clearUserData() {
    sessionStorage.removeItem("userData");
}

export const userUtil = {
    setUser,
    getUserData,
    getToken,
    hasOwner,
    clearUserData
}