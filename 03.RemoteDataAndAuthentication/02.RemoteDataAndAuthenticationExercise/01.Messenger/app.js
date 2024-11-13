function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const sendButton = document.getElementById('submit');
    const authorInput = document.querySelector('input[name=author]');
    const contentInput = document.querySelector('input[name=content]');
    const refreshButton = document.getElementById('refresh');
    const textAreaMessages = document.getElementById('messages');

    sendButton.addEventListener("click", onSendClick);
    refreshButton.addEventListener("click", onRefreshClick);

    async function onSendClick() {
        const message = {
            author: authorInput.value,
            content: contentInput.value,
        };

        const options = {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(message),
        }
        const response = await fetch(url, options);
    }

    async function onRefreshClick() {
        const response = await fetch(url);
        const data = await response.json();
        
        textAreaMessages.textContent = Object.values(data)
            .map(m  => `${m.author}: ${m.content}`)
            .join('\n');
    }
}

attachEvents();