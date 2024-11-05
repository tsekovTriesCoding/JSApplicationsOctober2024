const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
const urlForRecipeInfo = `http://localhost:3030/jsonstore/cookbook/details/`;
const main = document.querySelector('main');

fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.hasOwnProperty('status')) {
            throw ({
                status: data.status,
                message: data.message,
            });
        }

        main.innerHTML = '';
        Object.values(data).forEach(recipe => {
            const article = createArticle(recipe.name, recipe.img, recipe._id);
            main.append(article);
        });
    })
    .catch(error => alert(`Error: ${error.status} (${error.message})`));

function createArticle(name, img, id) {
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const divTitle = document.createElement('div');
    divTitle.classList.add('title');
    divTitle.append(h2);

    const imgElement = document.createElement('img');
    imgElement.src = img;
    const divSmall = document.createElement('div');
    divSmall.classList.add('small');
    divSmall.append(imgElement);

    const article = document.createElement('article');
    article.classList.add('preview');
    article.append(divTitle, divSmall);
    article.addEventListener('click', onClick);

    return article;

    function onClick() {
        fetch(urlForRecipeInfo + id)
            .then(res => res.json())
            .then(recipe => {
                const recipeCard = createRecipeCard(recipe);
                article.replaceWith(recipeCard);
            });
    }
}

function createRecipeCard(recipe) {
    const h2Title = document.createElement('h2');
    h2Title.textContent = recipe.name;

    const img = document.createElement('img');
    img.src = recipe.img;
    const divThumb = document.createElement('div');
    divThumb.classList.add('thumb');
    divThumb.append(img);

    const h3 = document.createElement('h3');
    h3.textContent = 'Ingredients:';
    const ul = document.createElement('ul');
    recipe.ingredients.forEach(i => {
        const li = document.createElement('li');
        li.textContent = i;
        ul.append(li);
    });

    const divIngredients = document.createElement('div');
    divIngredients.classList.add('ingredients');
    divIngredients.append(ul);

    const divBand = document.createElement('div');
    divBand.classList.add('band');
    divBand.append(divThumb, divIngredients);

    const divDescription = document.createElement('div');
    divDescription.classList.add('description');

    const h3Preparation = document.createElement('h3');
    h3Preparation.textContent = 'Preparation:';
    divDescription.append(h3Preparation);

    recipe.steps.forEach(step => {
        const p = document.createElement('p');
        p.textContent = step;
        divDescription.append(p);
    });

    const article = document.createElement('article');
    article.append(h2Title, divBand, divDescription);

    return article;
}