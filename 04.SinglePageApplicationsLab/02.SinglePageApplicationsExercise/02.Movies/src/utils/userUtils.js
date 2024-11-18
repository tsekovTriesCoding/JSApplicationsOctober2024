function setUser(data) {
    sessionStorage.setItem("userData", JSON.stringify(data));
}

function getUser() {
    return JSON.parse(sessionStorage.getItem("userData"));
}

function getUserId() {
    const userData = getUser();
    return userData._id;
}

function clear() {
    sessionStorage.removeItem("userData");
}

function isOwner(itemId) {
    const userData = getUser();

    if (!userData) {
        return false;
    }
    
    return userData._id === itemId;
}

export const userUtils = {
    setUser,
    getUser,
    getUserId,
    clear,
    isOwner
}

