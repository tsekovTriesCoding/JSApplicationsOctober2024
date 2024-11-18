import { dataService } from "../api/dataService.js";

const section = document.getElementById('edit-movie');
const sections = document.querySelectorAll('section');
const editForm = section.querySelector('form');

editForm.addEventListener("submit", onSubmit);

let context = null;
let id = null;
export function showEditMovie(ctx, movie) {
    context = ctx;
    sections.forEach(sec => sec.style.display = 'none');
    section.style.display = 'block';

    section.querySelector('input#title').value = movie.title;
    section.querySelector('textarea[name=description]').value = movie.description;
    section.querySelector('input#imageUrl').value = movie.img;

    id = movie._id;
}

async function onSubmit() {
    const formData = new FormData(editForm);

    const { title, description, img } = Object.fromEntries(formData);

    if (!title || !description || !img) {
        return alert('Invalid title, description, or img');
    }
    
    editForm.reset();
    await dataService.updateMovie(id, {title, description, img});
    context.goTo("/details", id);
}