function register() {
    const registerForm = document.querySelector('form');
    const endpoint = 'http://localhost:3030/users/register';

    registerForm.addEventListener("submit", onSubmit);

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rePass');

        if (!email || !password || password != rePass) {
            return alert('Incorrent email or password');
        }

        try {
            const user = { email, password };

            const options = {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            }

            const response = await fetch(endpoint, options);
            const userData = await response.json();

            sessionStorage.setItem("userData", JSON.stringify(userData));
        } catch (error) {
            return alert(error.message);
        }

    }
}

register();