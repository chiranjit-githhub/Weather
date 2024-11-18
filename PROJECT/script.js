// script.js

const API_KEY = '06e121bb3101d74ec380f941246457d7'; // Get your API key from OpenWeatherMap
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
    } else {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
    }
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                weatherInfo.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            weatherInfo.innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;
    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}
