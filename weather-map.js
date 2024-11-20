const apiKey = '06e121bb3101d74ec380f941246457d7'; // Replace with your OpenWeather API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getCityWeather(city);
    } else {
        errorMessage.textContent = "Please enter a city name.";
    }
});

async function getCityWeather(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        if (data.cod === '404') {
            errorMessage.textContent = `City not found: ${city}`;
            return;
        }

        errorMessage.textContent = ''; // Clear any previous error messages
        const { lat, lon } = data.coord;

        // Call function to display the map with weather data
        displayWeatherMap(lat, lon, city);
    } catch (error) {
        console.error("Error fetching data: ", error);
        errorMessage.textContent = "Failed to fetch data. Please try again later.";
    }
}

function displayWeatherMap(lat, lon, city) {
    // Create the map centered on the city's coordinates
    const map = L.map('map').setView([lat, lon], 10);

    // Add OpenWeatherMap's weather layer (temperature layer in this case)
    const weatherLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
        {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://openweathermap.org/copyright">OpenWeatherMap</a>',
            maxZoom: 19
        }
    ).addTo(map);

    // Add a marker for the city location
    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(`<b>${city}</b><br>Latitude: ${lat}, Longitude: ${lon}`).openPopup();
}
