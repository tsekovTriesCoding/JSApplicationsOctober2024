const endpoint = 'http://localhost:3030/jsonstore/collections/books';
const loadBooksButton = document.getElementById('loadBooks');
const tbody = document.querySelector('table tbody');
const form = document.querySelector('form');

loadBooksButton.addEventListener("click", onLoadBooks);
form.addEventListener("submit", onSubmit);

async function onLoadBooks() {
    tbody.innerHTML = '';
    const response = await fetch(endpoint);
    const data = await response.json();

    Object.entries(data)
        .forEach(bookData => {
            const book = bookData[1];
            
            const tr = createBookTr(book, bookData[0]);
            tbody.appendChild(tr);
        });
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');

    const book = {
        author,
        title,
    };

    const options = {
        method: "post",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify(book),
    };

    const response = await fetch(endpoint, options);
}

function createBookTr(book, id) {
    const tdTitle = document.createElement('td');
    tdTitle.textContent = book.title;
    const tdAuthor = document.createElement('td');
    tdAuthor.textContent = book.author;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener("click", onEdit);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener("click", async () => {
        const response = await fetch(`${endpoint}/${id}`, {
            method: "delete"
        });
        tr.remove();
    });

    const tdButtons = document.createElement('td');
    tdButtons.appendChild(editButton);
    tdButtons.appendChild(deleteButton);

    const tr = document.createElement('tr');
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdButtons);

    return tr;

    function onEdit() {
        const titleInput = document.querySelector('input[name=title]');
        titleInput.value = book.title;
        const authorInput = document.querySelector('input[name=author]');
        authorInput.value = book.author;
        document.querySelector('form>h3').textContent = 'Edit FORM';
        const submitButton = document.querySelector('form>button');
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        submitButton.replaceWith(saveButton);
        saveButton.addEventListener("click", async () => {
            const options = {
                method: "put",
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify({
                    author: authorInput.value,
                    title: titleInput.value,
                })
            };

            const response = await fetch(`${endpoint}/${id}`, options);

            if (!response.ok) {
                return;
            }
        });
    }
}