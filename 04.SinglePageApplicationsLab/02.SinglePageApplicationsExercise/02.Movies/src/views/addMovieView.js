import { dataService } from "../api/dataService.js";

const section = document.getElementById('add-movie');
const sections = document.querySelectorAll('section');
const addMovieForm = section.querySelector('form');

addMovieForm.addEventListener("submit", onSubmit);

let context = null;
export function showAddMovie(ctx) {
    context = ctx;
    sections.forEach(sec => sec.style.display = 'none');
    section.style.display = 'block';
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(addMovieForm);
    const { title, description, img } = Object.fromEntries(formData);

    if (!title || !description || !img) {
        return alert('Invalid title, description, or img');
    }

    addMovieForm.reset();
    await dataService.createMovie({ title, description, img });
    context.goTo("/");
}