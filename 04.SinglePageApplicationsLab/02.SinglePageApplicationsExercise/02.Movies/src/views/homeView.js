import { dataService } from "../api/dataService.js";
import { userUtils } from "../utils/userUtils.js";
import { showAddMovie } from "./addMovieView.js";

const homeSection = document.getElementById('home-page');
const sections = document.querySelectorAll('section');
const moviesSection = document.getElementById('movie');
const moviesList = document.getElementById('movies-list');

let context = null;
export function showHome(ctx) {
    context = ctx;
    const userData = userUtils.getUser();
    sections.forEach(sec => sec.style.display = 'none');
    homeSection.style.display = 'block';

    if (userData) {
        const addMovieButton = document.getElementById('add-movie-button');
        addMovieButton.style.display = 'block';
        addMovieButton.addEventListener("click", onAddMovie);
    }

    loadMovies();
}

function onAddMovie() {
    showAddMovie(context);
}

async function loadMovies() {
    moviesSection.style.display = 'block'
    const movies = await dataService.getAllMovies();
    moviesList.innerHTML = '';

    movies.forEach(movie => renderMovie(movie))
}

function renderMovie(movie) {
    const li = document.createElement('li');
    li.className = 'card mb-4';

    li.innerHTML = `
        <img class="card-img-top"  src="${movie.img}" alt="Card image cap" width="400"/>
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
            <a href="#">
            </a>
        </div>
        <div class="card-footer">
            <button id = "${movie._id} "type="button" class="btn btn-info">Details</button>
        </div>
    `;

    li.querySelector('button').addEventListener("click", onDetails);

    moviesList.appendChild(li);
}

function onDetails(e) {
    e.preventDefault();
    const id = e.target.id;

    context.goTo("/details", id);
}


