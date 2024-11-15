function login() {
    const loginForm = document.querySelector('form');
    const endpoint = 'http://localhost:3030/users/login';
    
    loginForm.addEventListener("submit", onSubmit);
    
    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
    
        onLogin({ email, password });
    }
    
    async function onLogin(user) {
        const options = {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        }
        
        const response = await fetch(endpoint, options);
        if (response.ok) {
            const userData = await response.json();
    
        sessionStorage.setItem("userData", JSON.stringify(userData));
        window.location = "index.html";
        } else {
            alert('Wrong password or username!');
        }
    }
}

login();



