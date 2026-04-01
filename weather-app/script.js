const API_KEY = '46e1b8710845e61623674f518029dac4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// ── DOM elements ──
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const errorMessage = document.getElementById('error-message');
const weatherCard = document.getElementById('weather-card');
const recentSearchesContainer = document.getElementById('recent-searches');

// ── Recent searches ──
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

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
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message ?? `Error: ${response.status}`;
        throw new Error(message);
    }

    return response.json();
};

// ── Update UI ──
const updateUI = (data) => {
    const { 
        name,
        sys: { country },
        main: { temp, feels_like, humidity, pressure },
        weather: [{ main: weatherMain, description }],
        wind: { speed }
    } = data;

    document.getElementById('city-name').textContent = name;
    document.getElementById('country').textContent = country;
    document.getElementById('temperature').textContent = Math.round(temp);
    document.getElementById('feels-like').textContent = `${Math.round(feels_like)}°C`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('wind').textContent = `${Math.round(speed * 3.6)} km/h`;
    document.getElementById('pressure').textContent = `${pressure} hPa`;
    document.getElementById('description').textContent = description;

    document.getElementById('weather-icon').textContent = weatherIcons[weatherMain] ?? '🌡️';
    errorMessage.textContent = '';

    console.log(getWeatherSummary(data));
};

// ── Add to recent searches ──
const addToRecentSearches = (city) => {
    const normalizedCity = city.trim();
    
    // Remove if already exists (to avoid duplicates)
    recentSearches = recentSearches.filter(
        search => search.toLowerCase() !== normalizedCity.toLowerCase()
    );
    
    // Add to beginning
    recentSearches.unshift(normalizedCity);
    
    // Keep only last 5
    recentSearches = recentSearches.slice(0, 5);
    
    // Save to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    
    // Update display
    displayRecentSearches();
};

// ── Display recent searches ──
const displayRecentSearches = () => {
    recentSearchesContainer.innerHTML = '';
    
    if (recentSearches.length === 0) return;
    
    const title = document.createElement('p');
    title.textContent = 'Recent:';
    title.style.fontSize = '0.9em';
    title.style.color = '#888';
    title.style.marginTop = '12px';
    title.style.marginBottom = '8px';
    recentSearchesContainer.appendChild(title);
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.flexWrap = 'wrap';
    buttonsContainer.style.gap = '8px';
    
    recentSearches.forEach(city => {
        const button = document.createElement('button');
        button.textContent = city;
        button.className = 'recent-search-btn';
        button.addEventListener('click', () => {
            cityInput.value = city;
            handleSearch();
        });
        buttonsContainer.appendChild(button);
    });
    
    recentSearchesContainer.appendChild(buttonsContainer);
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
        addToRecentSearches(city);
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

const getWeatherSummary = ({ name, main: { temp }, weather: [{ description }] }) => {
    return `Currently ${Math.round(temp)}°C and ${description} in ${name}`;
};