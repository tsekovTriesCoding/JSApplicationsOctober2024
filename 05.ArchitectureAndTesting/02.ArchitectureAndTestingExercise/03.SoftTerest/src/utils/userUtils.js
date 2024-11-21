function setUser(data) {
    sessionStorage.setItem("userData", JSON.stringify(data));
}

function getUser(data) {
    return JSON.parse(sessionStorage.getItem("userData"));
}

function getUserId() {
    const userData = getUser();
    return userData._id;
}

function clear() {
    sessionStorage.removeItem("userData");
}

function hasOwner(itemId) {
    const userData = getUser();

    if (!userData) {
        return false;
    }
    
    return userData._id === itemId;
}

export const userUtils = {
    getUser,
    setUser,
    getUser,
    clear,
    hasOwner
}

