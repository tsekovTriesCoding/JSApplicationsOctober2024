function loadRepos() {
	const username = document.getElementById('username').value;
	const repos = document.getElementById('repos');
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(res => res.json())
		.then(data => {
			repos.innerHTML = data.map(r => `<li><a href=${r.html_url}>${r.full_name}</a></li>`).join('\n');
		})
		.catch((error) => console.log(error));
}