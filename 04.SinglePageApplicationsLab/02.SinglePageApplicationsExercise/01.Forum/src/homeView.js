import { showDetails } from "./detailsView.js";

const mainElement = document.querySelector('main');
const newTopicBorderDiv = document.querySelector('.new-topic-border');
const topicTitleDiv = document.querySelector('.topic-title');
const topicContainer = document.querySelector('div.topic-container');

const form = mainElement.querySelector('form');

const endpoints = {
    posts: 'http://localhost:3030/jsonstore/collections/myboard/posts',
    comments: 'http://localhost:3030/jsonstore/collections/myboard/comments'
}

form.addEventListener("submit", onSubmit);

export async function showHome() {
    mainElement.replaceChildren(newTopicBorderDiv);
    mainElement.appendChild(topicTitleDiv);
    const response = await fetch(endpoints.posts);
    const data = await response.json();

    topicContainer.innerHTML = '';

    Object.values(data).forEach(p => {
        const post = createPost(p);
        topicContainer.appendChild(post);
    });
}

function createPost(post) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('topic-name-wrapper');

    divContainer.innerHTML = `
        <div class="topic-name">
            <a href="#" class="normal" data-id=${post._id}>
                <h2>${post.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${post.date}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${post.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    divContainer.querySelector('a').addEventListener("click", showDetails);
    return divContainer;
}

function onSubmit(e) {
    e.preventDefault();
    const isCancel = e.submitter.classList.contains("cancel");

    if (isCancel) {
        clearInputs(e.target);
        return;
    }

    const formData = new FormData(e.target);
    const title = formData.get("topicName");
    const username = formData.get("username");
    const content = formData.get("postText");

    if (!title || !username || !content) {
        return;
    }

    savePost({ title, username, content, date: new Date() });
    clearInputs(e.target);
}

async function savePost(post) {
    const options = {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(post)
    }

    const response = await fetch(endpoints.posts, options);
    const data = await response.json();
    showHome();
}

function clearInputs(form) {
    form.reset();
}