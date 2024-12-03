import { getAllCharacters } from "../data/character.js";
import { html, render } from "../lib.js";
import { characterTemplate } from "./partials/character.js";

const catalogTemplate = (characters) => html`
<h2>Characters</h2>
<section id="characters">
   ${characters.length ? characters.map(characterTemplate) : html`<h2>No added Heroes yet.</h2>`}
</section>
`;

export async function catalogView() {
    const characters = await getAllCharacters();

    render(catalogTemplate(characters));
}