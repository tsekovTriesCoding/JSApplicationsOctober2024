export function setUserData(data) {
    localStorage.setItem("userData", JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(localStorage.getItem("userData"));
}

export function clearUserData() {
    localStorage.clear();
}

export function updateNav() {
    const userData = getUserData();

    const userNav = document.querySelector('.user');
    const guestNav = document.querySelector('.guest');

    if (userData) {
        userNav.style.display = 'block';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'block';
    }
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        callback(data, event.target);
    }
}