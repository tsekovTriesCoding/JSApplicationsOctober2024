function attachEvents() {
    const loadPostsButton = document.getElementById('btnLoadPosts');
    const postsSelect = document.getElementById('posts');
    const viewPostButton = document.getElementById('btnViewPost');
    const h1PostTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    const ednpoints = {
        getPosts: 'http://localhost:3030/jsonstore/blog/posts',
        getComments: 'http://localhost:3030/jsonstore/blog/comments',
    };

    loadPostsButton.addEventListener("click", onLoadClick);
    viewPostButton.addEventListener("click", onViewPostClick);

    const allPosts = {};
    async function onLoadClick() {
        const posts = await getPosts(ednpoints.getPosts);

        Object.values(posts)
            .forEach(post => {
                const option = document.createElement('option');
                option.value = post.id;
                option.textContent = post.title;
                postsSelect.appendChild(option);
                allPosts[post.id] = post;
            });
    }

    async function onViewPostClick() {
        postComments.innerHTML = '';

        const id = posts.value;
        const title = posts.options[posts.selectedIndex].textContent;

        h1PostTitle.textContent = title;
        postBody.textContent = allPosts[id].body;

        const comments = await getComments(ednpoints.getComments);
        Array.from(Object.values(comments))
            .filter(c => c.postId === id)
            .forEach(c => {
                const li = document.createElement('li');
                li.id = c['id'];
                li.textContent = c['text'];
                postComments.appendChild(li);
            });
    }
}

async function getPosts(url) {
    const response = await fetch(url);
    return response.json();
}

async function getComments(url, id) {
    const response = await fetch(`${url}`);
    return response.json();
}

attachEvents();