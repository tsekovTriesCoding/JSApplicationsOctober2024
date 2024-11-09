function attachEvents() {
    const locationsUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    const currentConditionsUrl = 'http://localhost:3030/jsonstore/forecaster/today';
    const upcomingConditionsUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming';
    const getWeatherButton = document.getElementById('submit');
    const locationInput = document.getElementById('location');
    const forecast = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');

    getWeatherButton.addEventListener('click', onGetWeatherClick);

    async function onGetWeatherClick() {
        forecast.style.display = 'block';

        try {
            const locations = await getLocation();
            const location = locations.find(l => l.name === locationInput.value);
            const code = location.code;

            const todayForecast = await getTodayForecast(code);
            const upcomingForecast = await getUpcomingForecast(code);

            const currentConditionsDiv = createCurrentConditionsDiv(todayForecast);
            currentDiv.appendChild(currentConditionsDiv);

            const upcomingConditionsDiv = createUpcomingConditionsDiv(upcomingForecast);
            upcomingDiv.appendChild(upcomingConditionsDiv);

        } catch (error) {
            const pElement = document.createElement('p');
            pElement.textContent = 'Error';
            forecast.innerHTML = '';
            forecast.appendChild(pElement);
        }

    }

    async function getLocation() {
        const response = await fetch(locationsUrl);
        return response.json();
    }

    async function getTodayForecast(location) {
        const response = await fetch(`${currentConditionsUrl}/${location}`);
        return response.json();
    }

    async function getUpcomingForecast(location) {
        const response = await fetch(`${upcomingConditionsUrl}/${location}`);
        return response.json();
    }
}

function createCurrentConditionsDiv(todayForecast) {
    const name = todayForecast.name;
    const { condition, high, low } = todayForecast.forecast;

    const symbol = createSpan(['condition', 'symbol'], condition);
    const forecastName = createSpan(['forecast-data'], name);
    const forecastTemp = createSpan(['forecast-data'], low, high);
    const forecastCondition = createSpan(['forecast-data'], condition);

    const conditionSpan = createSpan(['condition']);

    conditionSpan.appendChild(forecastName);
    conditionSpan.appendChild(forecastTemp);
    conditionSpan.appendChild(forecastCondition);

    const forecastsDiv = document.createElement('div');
    forecastsDiv.classList.add('forecasts');
    forecastsDiv.appendChild(symbol);
    forecastsDiv.appendChild(conditionSpan);

    return forecastsDiv;
}

function createUpcomingConditionsDiv(upcomingForecast) {
    const forecastDiv = document.createElement('div');
    forecastDiv.classList.add('forecast-info');

    upcomingForecast.forecast.forEach(f => {
        const { condition, high, low } = f;
        const symbol = createSpan(['symbol'], condition);
        const forecastTemp = createSpan(['forecast-data'], low, high);
        const forecastCondition = createSpan(['forecast-data'], condition);

        const spanUpcoming = createSpan(['upcoming']);
        spanUpcoming.appendChild(symbol);
        spanUpcoming.appendChild(forecastTemp);
        spanUpcoming.appendChild(forecastCondition);

        forecastDiv.appendChild(spanUpcoming);
    });

    return forecastDiv;
}

function createSpan(classes, ...text) {
    const span = document.createElement('span');
    classes.forEach(c => span.classList.add(c));

    if (classes.includes('symbol')) {
        span.textContent = getWeatherSymbol(text[0]);
    } else {
        text.length === 2 ? span.textContent = `${text[0]}${getWeatherSymbol('Degrees')}/${text[1]}${getWeatherSymbol('Degrees')}`
            : span.textContent = text;
    }

    return span;
}

function getWeatherSymbol(condition) {
    const symbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°',
    }

    return symbols[condition];
}

attachEvents();