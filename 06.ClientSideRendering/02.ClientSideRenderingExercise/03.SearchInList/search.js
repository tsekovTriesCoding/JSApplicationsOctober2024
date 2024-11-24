import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";
const townsList = document.getElementById('towns');
const searchTextElement = document.getElementById('searchText');
const searchButton = document.querySelector('button');
const resultDiv = document.getElementById('result');

search();

function createTownTemp(town, searchText) {
   let isMatch = town.includes(searchText);

   return html`
   <li class=${isMatch ? "active" : ""} >${town}</li>
   `;
}

searchButton.addEventListener("click", search);

function search(e) {
   let searchText = null;
   if (e) {
      searchText = searchTextElement.value;
   }

   const townsTemp = towns.map(town => createTownTemp(town, searchText));
   const ul = html`<ul>${townsTemp}</ul>`;

   render(ul, townsList);

   const matches = towns.filter(t => t.includes(searchText));

   renderMatcher(matches.length);
}

function renderMatcher(count) {
   const temp = html`${count} matches found`;
   render(temp, resultDiv);
}
