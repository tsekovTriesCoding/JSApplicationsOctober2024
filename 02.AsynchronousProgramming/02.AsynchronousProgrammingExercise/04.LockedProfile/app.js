async function lockedProfile() {
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/profiles';
    const main = document.getElementById('main');

    main.innerHTML = '';

    try {
        const profiles = await getProfiles(baseUrl);
        Object.values(profiles)
            .forEach((value, index) => {
                const { _, username, age, email } = value;
                const profileDiv = createProfile(username, age, email, index + 1);
                main.appendChild(profileDiv);
            });

    } catch (error) {
        console.log(error);
    }

}

function createProfile(username, age, email, index) {
    const imgElement = document.createElement('img');
    imgElement.src = './iconProfile2.png';
    imgElement.classList.add('userIcon');

    const labelLock = document.createElement('label');
    labelLock.textContent = 'Lock';
    const inputLock = document.createElement('input');
    inputLock.checked = true;
    inputLock.setAttribute('type', 'radio');
    inputLock.setAttribute('name', `user${index}Locked`);
    inputLock.setAttribute('value', 'lock');

    const labelUnlock = document.createElement('label');
    labelUnlock.textContent = 'Unlock';
    const inputUnlock = document.createElement('input');
    inputUnlock.setAttribute('type', 'radio');
    inputUnlock.setAttribute('name', `user${index}Locked`);
    inputUnlock.setAttribute('value', 'unlock');

    const br = document.createElement('br');
    const hr1 = document.createElement('hr');

    const labelUsername = document.createElement('label');
    labelUsername.textContent = 'Username';
    const inputUsername = document.createElement('input');
    inputUsername.setAttribute('type', 'text');
    inputUsername.setAttribute('name', `user${index}Username`);
    inputUsername.setAttribute('value', username);
    inputUsername.disabled = true;
    inputUsername.readOnly = true;

    const hr2 = document.createElement('hr');
    const labelEmail = document.createElement('label');
    labelEmail.textContent = 'Email:';
    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('name', `user${index}Email`);
    inputEmail.setAttribute('value', email);
    inputEmail.disabled = true;
    inputEmail.readOnly = true;

    const labelAge = document.createElement('label');
    labelAge.textContent = 'Age:';
    const inputAge = document.createElement('input');
    inputAge.setAttribute('type', 'email');
    inputAge.setAttribute('name', `user${index}Age`);
    inputAge.setAttribute('value', age);
    inputAge.disabled = true;
    inputAge.readOnly = true;

    const usernameDiv = document.createElement('div');
    usernameDiv.id = `user${index}Username`;
    usernameDiv.classList.add(`hiddenInfo`);
    usernameDiv.appendChild(hr2);
    usernameDiv.appendChild(labelEmail);
    usernameDiv.appendChild(inputEmail);
    usernameDiv.appendChild(labelAge);
    usernameDiv.appendChild(inputAge);

    const showMoreButton = document.createElement('button');
    showMoreButton.textContent = 'Show more';
    showMoreButton.addEventListener('click', (e) => {

        if (inputLock.checked) {
            return;
        }

        if (e.currentTarget.textContent === 'Show more') {
            usernameDiv.classList.remove('hiddenInfo');
            e.currentTarget.textContent = 'Hide it';
        } else if (e.currentTarget.textContent === 'Hide it') {
            usernameDiv.classList.add('hiddenInfo');
            e.currentTarget.textContent = 'Show more';
        }
    });

    const profileDiv = document.createElement('div');
    profileDiv.classList.add('profile');
    profileDiv.appendChild(imgElement);
    profileDiv.appendChild(labelLock);
    profileDiv.appendChild(inputLock);
    profileDiv.appendChild(labelUnlock);
    profileDiv.appendChild(inputUnlock);
    profileDiv.appendChild(br);
    profileDiv.appendChild(hr1);
    profileDiv.appendChild(labelUsername);
    profileDiv.appendChild(inputUsername);
    profileDiv.appendChild(usernameDiv);
    profileDiv.appendChild(showMoreButton);

    return profileDiv;
}

async function getProfiles(baseUrl) {
    const respone = await fetch(baseUrl);
    return respone.json();
}