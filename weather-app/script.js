const API_KEY = '46e1b8710845e61623674f518029dac4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// ── DOM elements ──
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const errorMessage = document.getElementById('error-message');
const weatherCard = document.getElementById('weather-card');

// ── Weather icons map ──
const weatherIcons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️'
};

// ── Fetch weather ──
const fetchWeather = async (city) => {
    const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('City not found. Please check the spelling.');
        }
        throw new Error(`Something went wrong: ${response.status}`);
    }

    return response.json();
};

// ── Update UI ──
const updateUI = (data) => {
    const { name, sys, main, weather, wind } = data;

    document.getElementById('city-name').textContent = name;
    document.getElementById('country').textContent = sys.country;
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('feels-like').textContent = `${Math.round(main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('wind').textContent = `${Math.round(wind.speed * 3.6)} km/h`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('description').textContent = weather[0].description;

    const iconKey = weather[0].main;
    document.getElementById('weather-icon').textContent = weatherIcons[iconKey] || '🌡️';

    errorMessage.textContent = '';
};

// ── Handle search ──
const handleSearch = async () => {
    const city = cityInput.value.trim();

    if (!city) {
        errorMessage.textContent = 'Please enter a city name.';
        return;
    }

    searchBtn.textContent = 'Searching...';
    searchBtn.disabled = true;
    errorMessage.textContent = '';

    try {
        const data = await fetchWeather(city);
        updateUI(data);
    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        searchBtn.textContent = 'Search';
        searchBtn.disabled = false;
    }
};

// ── Event listeners ──
searchBtn.addEventListener('click', handleSearch);

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});