const endpoints = {
    logout: 'http://localhost:3030/users/logout',
    allCatches: 'http://localhost:3030/data/catches',
};
const userDiv = document.getElementById('user')
const guestDiv = document.getElementById('guest')
const addButton = document.querySelector('.add');
const loadButton = document.querySelector('button.load');
const catches = document.getElementById('catches');
const addForm = document.getElementById('addForm');

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener("click", onLogout);
loadButton.addEventListener("click", onLoad);
addForm.addEventListener("submit", onAdd)
let userData = JSON.parse(sessionStorage.getItem("userData"));

updateNav();

async function onLogout() {
    const userInfo = JSON.parse(sessionStorage.getItem("userData"));

    if (userInfo) {
        const options = {
            method: "get",
            headers: {
                "X-Authorization": userInfo.accessToken
            }
        }

        const response = await fetch(endpoints.logout, options);
        sessionStorage.clear();
        userData = null;
        updateNav();
    }
}

function updateNav() {
    if (userData) {
        userDiv.style.display = 'inline-block';
        guestDiv.style.display = 'none';
        addButton.disabled = false;
        document.querySelector('.email>span').textContent = userData.email;
    } else {
        userDiv.style.display = 'none';
        guestDiv.style.display = 'inline-block';
        addButton.disabled = true;
        document.querySelector('.email>span').textContent = 'guest';
    }
}

async function onLoad() {
    catches.innerHTML = '';
    const response = await fetch(endpoints.allCatches);
    const data = await response.json();

    data.forEach(c => {
        const divCatch = createCatch(c);
        catches.appendChild(divCatch);
    });
}

async function onAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const angler = formData.get('angler');
    const weight = formData.get('weight');
    const species = formData.get('species');
    const location = formData.get('location');
    const bait = formData.get('bait');
    const captureTime = formData.get('captureTime');

    addCatch({ angler, weight, species, location, bait, captureTime });
    e.target.reset();
}

async function addCatch(catchInfo) {
    const options = {
        method: 'post',
        headers: {
            "Content-type": "application/json",
            "X-Authorization": userData.accessToken
        },
        body: JSON.stringify(catchInfo)
    }

    const response = await fetch(endpoints.allCatches, options);
    const data = await response.json();
}

function createCatch(data) {
    const labelAngler = document.createElement('label');
    labelAngler.textContent = 'Angler';
    const inputAngler = document.createElement('input');
    inputAngler.type = 'text';
    inputAngler.classList.add('angler');
    inputAngler.value = data.angler;

    const labelWeight = document.createElement('label');
    labelWeight.textContent = 'Weight';
    const inputWeight = document.createElement('input');
    inputWeight.type = 'text';
    inputWeight.classList.add('weight');
    inputWeight.value = data.weight;

    const labelSpecies = document.createElement('label');
    labelSpecies.textContent = 'Species';
    const inputSpecies = document.createElement('input');
    inputSpecies.type = 'text';
    inputSpecies.classList.add('species');
    inputSpecies.value = data.species;

    const labelLocation = document.createElement('label');
    labelLocation.textContent = 'Location';
    const inputLocation = document.createElement('input');
    inputLocation.type = 'text';
    inputLocation.classList.add('location');
    inputLocation.value = data.location;

    const labelBait = document.createElement('label');
    labelBait.textContent = 'Bait';
    const inputBait = document.createElement('input');
    inputBait.type = 'text';
    inputBait.classList.add('bait');
    inputBait.value = data.bait;

    const labelCaptureTime = document.createElement('label');
    labelCaptureTime.textContent = 'Capture Time';
    const inputCaptureTime = document.createElement('input');
    inputCaptureTime.type = 'number';
    inputCaptureTime.classList.add('captureTime');
    inputCaptureTime.value = data.captureTime;

    const isOwner = userData?._id === data._ownerId;

    const updateButton = document.createElement('button');
    updateButton.classList.add('update');
    updateButton.setAttribute('data-id', data._id);
    if (!isOwner) {
        updateButton.setAttribute('disabled', isOwner)
    }
    updateButton.textContent = 'Update';
    updateButton.addEventListener("click", onUpdate);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.setAttribute('data-id', data._id);
    if (!isOwner) {
        deleteButton.setAttribute('disabled', isOwner)
    }
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener("click", onDelete);

    const divCatch = document.createElement('div');
    divCatch.classList.add('catch');
    divCatch.appendChild(labelAngler);
    divCatch.appendChild(inputAngler);
    divCatch.appendChild(labelWeight);
    divCatch.appendChild(inputWeight);
    divCatch.appendChild(labelSpecies);
    divCatch.appendChild(inputSpecies);
    divCatch.appendChild(labelLocation);
    divCatch.appendChild(inputLocation);
    divCatch.appendChild(labelBait);
    divCatch.appendChild(inputBait);
    divCatch.appendChild(labelCaptureTime);
    divCatch.appendChild(inputCaptureTime);
    divCatch.appendChild(updateButton);
    divCatch.appendChild(deleteButton);

    return divCatch;
}

async function onUpdate(e) {
    const inputs = Array.from(e.target.parentElement.querySelectorAll('input'));
    const angler = inputs[0].value;
    const weight = inputs[1].value;
    const species = inputs[2].value;
    const location = inputs[3].value;
    const bait = inputs[4].value;
    const captureTime = inputs[5].value;

    const id = e.target.dataset.id;

    const response = await updateCatch({ angler, weight, species, location, bait, captureTime }, id);
}

async function updateCatch(data, id) {
    const options = {
        method: "put",
        headers: {
            "Content-type": "application/json",
            "X-Authorization": userData.accessToken
        },
        body: JSON.stringify(data)
    };

    return fetch(`${endpoints.allCatches}/${id}`, options);
}

async function onDelete(e) {
    const id = e.target.dataset.id;
    const options = {
        method: "delete",
        headers: {
            "X-Authorization": userData.accessToken
        }
    };

    await fetch(`${endpoints.allCatches}/${id}`, options);
    e.target.parentElement.remove();
}