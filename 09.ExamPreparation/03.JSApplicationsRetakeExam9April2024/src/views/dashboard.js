import { getAllSolutions } from "../data/solution.js";
import { html, render } from "../lib.js";
import { solutionTemplate } from "./partials/solution.js";

const dashboardTemplate = (solutions) => html`
<h2>Solutions</h2>
<section id="solutions">
     ${solutions.length ? solutions.map(solutionTemplate) :
        html`<h2 id="no-solution">No Solutions Added.</h2>`}
</section>
`;

export async function dashboardView() {
    const solutions = await getAllSolutions();

    render(dashboardTemplate(solutions));
}