import { dataService } from "../api/dataService.js";
import { userUtils } from "../utils/userUtils.js";
import { showEditMovie } from "./editMovieView.js";

const section = document.getElementById('movie-example');
const sections = document.querySelectorAll('section');

let context = null;
export async function showMovieExample(ctx, params) {
    context = ctx;
    const id = params[0];
    sections.forEach(sec => sec.style.display = 'none');
    section.style.display = 'block';

    const movie = await dataService.getMovie(id);
    renderDetails(movie);
}

let currentMovie = null;
async function renderDetails(movie) {
    const divContainer = document.createElement('div');
    divContainer.classList.add("container");

    debugger
    currentMovie = movie;
    divContainer.innerHTML = `
                <div class="row bg-light text-dark">
              <h1>Movie title: ${movie.title}</h1>
  
              <div class="col-md-8">
                <img
                  class="img-thumbnail"
                  src="${movie.img}"
                  alt="Movie"
                />
              </div>
              <div class="col-md-4 text-center">
                <h3 class="my-3">Movie Description</h3>
                <p>
                  ${movie.description}
                </p>
                <a id=${movie._id} class="btn btn-danger" href="#">Delete</a>
                <a id=${movie._id} class="btn btn-warning" href="#">Edit</a>
                <a id=${movie._id} class="btn btn-primary" href="#">Like</a>
                <span class="enrolled-span">Liked 0</span>
              </div>
            </div>`;

    const isOwner = userUtils.isOwner(movie._ownerId);
    const deleteButton = divContainer.querySelector('.btn-danger');
    const editButton = divContainer.querySelector('.btn-warning');
    const likeButton = divContainer.querySelector('.btn-primary');
    const totalLikes = divContainer.querySelector('.enrolled-span');

    const likes = await getLikes(movie._id);
    totalLikes.textContent = `Liked ${likes}`;

    if (isOwner) {
        likeButton.remove();
        deleteButton.addEventListener("click", onDelete);
        editButton.addEventListener("click", onEdit);
    } else {
        deleteButton.remove();
        editButton.remove();
        likeButton.addEventListener("click", onLikeClick);
    }

    section.replaceChildren(divContainer);
}

async function onLikeClick(e) {
    const movieId = e.target.id;
    dataService.addLike({ movieId });
    const likes = await getLikes(movieId);

    const enrolledSpan = e.target.nextElementSibling;
    enrolledSpan.style.display = 'inline-block';
    enrolledSpan.textContent = `Liked ${likes}`;

    e.target.replaceWith(enrolledSpan);
}

async function getLikes(id) {
    return dataService.getLikes(id);
}

function onDelete(e) {
    const id = e.target.id;
    dataService.deleteMovie(id);
    context.goTo("/");
}

function onEdit() {
    showEditMovie(context, currentMovie);
}