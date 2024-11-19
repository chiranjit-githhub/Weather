const API_KEY = '06e121bb3101d74ec380f941246457d7'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const timeContainer = document.getElementById('time-container');
const weatherContainer = document.getElementById('weather-container');
const forecastContainer = document.getElementById('forecast-container');

// Fetch city weather data
function fetchCityData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const cityName = data.name;
                const weather = data.weather[0];
                const temp = (data.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius
                const windSpeed = data.wind.speed;
                const windDirection = data.wind.deg;

                // Display the city weather and current time
                displayWeather(cityName, temp, weather, windSpeed, windDirection);
                fetchForecast(city);
            } else {
                timeContainer.innerHTML = `<p>City not found: ${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            timeContainer.innerHTML = '<p>Error retrieving city data.</p>';
        });
}

// Display weather info
function displayWeather(city, temp, weather, windSpeed, windDirection) {
    const weatherIcon = `http://openweathermap.org/img/wn/${weather.icon}.png`;
    weatherContainer.innerHTML = `
        <h2>Current Weather in ${city}</h2>
        <img src="${weatherIcon}" alt="${weather.description}" class="weather-icon">
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${weather.description}</p>
        <p>Wind: ${windSpeed} m/s, Direction: ${windDirection}°</p>
    `;
}

// Fetch 5-day forecast
function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));
                displayForecast(forecastList);
            } else {
                forecastContainer.innerHTML = `<p>Error fetching forecast: ${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            forecastContainer.innerHTML = '<p>Error retrieving forecast data.</p>';
        });
}

// Display forecast for the next 5 days
function displayForecast(forecastList) {
    forecastContainer.innerHTML = '<h2>5-Day Forecast</h2>';
    forecastList.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
        const temp = (day.main.temp - 273.15).toFixed(1);
        const weather = day.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        const forecastCard = `
            <div class="forecast-card">
                <h3>${date}</h3>
                <img src="${icon}" alt="${weather}">
                <p>${weather}</p>
                <p>Temp: ${temp}°C</p>
            </div>
        `;
        forecastContainer.innerHTML += forecastCard;
    });
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchCityData(city);
    } else {
        timeContainer.innerHTML = '<p>Please enter a city name.</p>';
    }
});
