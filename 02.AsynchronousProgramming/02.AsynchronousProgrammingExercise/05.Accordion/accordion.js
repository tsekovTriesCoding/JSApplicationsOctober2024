function solution() {
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const main = document.getElementById('main');

    fetch(baseUrl)
        .then(response => response.json())
        .then(articles => {
            Object.values(articles)
                .forEach(article => {
                    const accordionDiv = createAccordionDiv(article);
                    main.appendChild(accordionDiv);
                });
        });
}

function createAccordionDiv(article) {
    const spanTitle = document.createElement('span');
    spanTitle.textContent = article.title;

    const moreButton = document.createElement('button');
    moreButton.classList.add('button');
    moreButton.id = article._id;
    moreButton.textContent = 'More';
    moreButton.addEventListener("click", onMoreClick);

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    headDiv.appendChild(spanTitle);
    headDiv.appendChild(moreButton);

    const p = document.createElement('p');
    const extraDiv = document.createElement('div');
    extraDiv.classList.add('extra');
    extraDiv.appendChild(p);

    const accordioDiv = document.createElement('div');
    accordioDiv.classList.add('accordion');
    accordioDiv.appendChild(headDiv);
    accordioDiv.appendChild(extraDiv);

    return accordioDiv;
}

async function onMoreClick(e) {
    const articlesDetailsUrl = 'http://localhost:3030/jsonstore/advanced/articles/details';
    const moreButton = e.currentTarget;
    const articleId = moreButton.id;
    const extra = moreButton.closest('.accordion').querySelector('.extra');
    const p = moreButton.closest('.accordion').querySelector('.extra>p');

    try {
        const response = await fetch(`${articlesDetailsUrl}/${articleId}`)
        const articleInfo = await response.json();

        if (moreButton.textContent === 'More') {
            extra.style.display = 'block';
            p.textContent = articleInfo.content;
            moreButton.textContent = 'Less'
        } else {
            extra.style.display = 'none';
            moreButton.textContent = 'More'
        }
    } catch (error) {

    }

}

solution();