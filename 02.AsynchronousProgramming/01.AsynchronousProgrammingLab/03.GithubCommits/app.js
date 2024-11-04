function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;
    const commitsUl = document.getElementById('commits');

    fetch(url)
        .then(res => res.json())
        .then((commits) => {
            if (commits.hasOwnProperty('status')) {
                throw ({
                    status: commits.status,
                    message: commits.message,
                });
            }
            commits.forEach(commit => {
                const liElement = document.createElement('li');
                liElement.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
                commitsUl.appendChild(liElement);
            });
        }).catch((err) => {
            console.log(err);
            const liElement = document.createElement('li');
            liElement.textContent = `Error: ${err.status} (${err.message})`;
            commitsUl.appendChild(liElement);
        });
}