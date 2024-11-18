const themeContentDiv = document.querySelector('.theme-content')

const mainElement = document.querySelector('main');
const themeTitleElement = document.querySelector('div.theme-title');
const commentElement = document.querySelector('div.comment');
const answerCommentElement = document.querySelector('.answer-comment');

const endpoints = {
    posts: 'http://localhost:3030/jsonstore/collections/myboard/posts',
    comments: 'http://localhost:3030/jsonstore/collections/myboard/comments'
}

let postId = null;
export async function showDetails(e) {
    mainElement.replaceChildren(themeContentDiv);
    answerCommentElement?.querySelector('form').addEventListener("submit", onCreateComment);

    postId = e.currentTarget.dataset.id;

    const response = await fetch(endpoints.posts + '/' + postId);
    const currentPost = await response.json();

    const title = createPostTitle(currentPost.title);
    const details = createPostDetails(currentPost.username, currentPost.date, currentPost.content);
    const comments = await getComments();

    themeTitleElement.replaceChildren(title);
    commentElement.replaceChildren(details);

    showComments(postId, Object.values(comments));
}

function showComments(postId, comments) {
    const divContainer = document.createElement('div');
    divContainer.id = 'user-comment';

    comments.filter(c => c.postId === postId)
        .forEach(c => {
            const comment = createComment(c);
            divContainer.appendChild(comment);
        });

    commentElement.appendChild(divContainer);
}

function createComment(comment) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('topic-name-wrapper');

    divContainer.innerHTML = `
        <div class="topic-name">
            <p><strong>${comment.username}</strong> commented on <time>${comment.date}</time></p>
            <div class="post-content">
                <p>${comment.commentText}</p>
            </div>
        </div>
    `;

    return divContainer;
}

async function getComments() {
    const response = await fetch(endpoints.comments);
    return response.json();
}

function createPostTitle(title) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('theme-name-wrapper');

    divContainer.innerHTML = `
        <div class="theme-name">
            <h2>${title}</h2>
        </div>
    `;

    return divContainer;
}

function createPostDetails(username, date, content) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('header');

    divContainer.innerHTML = `
        <img src="./static/profile.png" alt="avatar">
        <p><span>${username}</span> posted on <time>${date}</time></p>
        <p class="post-content">${content}</p>
`;

    return divContainer;
}

function onCreateComment(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const commentText = formData.get('postText');
    const username = formData.get('username');

    if (!commentText || !username) {
        return;
    }

    saveComment({ commentText, username, date: new Date(), postId });
}

async function saveComment(comment) {
    const options = {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(comment)
    }

    const response = await fetch(endpoints.comments, options);

    const comments = await getComments();
    showComments(comment.postId, Object.values(comments));
}