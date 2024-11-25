import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.querySelector('body');

const tableTemp = (books) => html`
    <button id="loadBooks" @click=${onLoadBooks}>LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${books?.map(createBookTemp)}
        </tbody>
    </table>
    <form id="add-form" @submit=${onSubmit}>
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
</form>
`;

function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, author } = Object.fromEntries(formData);

    if (!title || !author) {
        return;
    }

    saveBook({ author, title });
}

async function saveBook(book) {
    const options = {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(book)
    }

    const response = await fetch('http://localhost:3030/jsonstore/collections/books', options);
    const data = await response.json();
}
const createBookTemp = (book) => html`
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button @click=${onEdit} data-id="${book._id}">Edit</button>
            <button @click=${onDelete} data-id="${book._id}">Delete</button>
        </td>
    </tr>
`;

async function onEdit(e) {
    const id = e.target.dataset.id;
    const book = await getBook(id);
    render(editFormTemp(book), root);
}

async function getBook(id) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id);
    return response.json();
}

const editFormTemp = (book) => html`
    <form id="edit-form" @submit=${onEditSubmit} data-id="${book._id}">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." value="${book.title}">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." value="${book.author}">
        <input type="submit" value="Save">
    </form>
`;

function onEditSubmit(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const formData = new FormData(e.target);
    const {author, title} = Object.fromEntries(formData);

    debugger
    updateBook({author, title, '_id': id});
    onLoadBooks();
}

async function updateBook(book) {
    const options = {
        method: "put",
        header: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(book)
    }

    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + book._id, options);
    const data = await response.json();
}

async function onDelete(e) {
    const id = e.target.dataset.id;
    const options = {
        method: "delete"
    }

    const reponse = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, options);
}

async function onLoadBooks() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books');
    const data = await response.json();
    Object.entries(data).forEach(entry => {
        entry[1]['_id'] = entry[0];
    });
    render(tableTemp(Object.values(data)), root);
}

const addFormTemp = () => html`
<form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
</form>
`;

render(tableTemp(), root);

