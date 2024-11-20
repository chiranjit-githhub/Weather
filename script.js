const apiKey = "06e121bb3101d74ec380f941246457d7"; // Replace with your OpenWeather API key
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const forecastContainer = document.getElementById("forecast");
const aqiInfo = document.getElementById("aqi-info");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherAndAQIData(city);
        getForecastData(city);
    }
});

async function getWeatherAndAQIData(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod !== 200) {
            throw new Error(weatherData.message);
        }

        displayWeather(weatherData);

        const { lat, lon } = weatherData.coord; // Extract latitude and longitude
        getAQIData(lat, lon); // Fetch AQI data based on coordinates
    } catch (error) {
        console.error("Error fetching weather or AQI data:", error);
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
        aqiInfo.innerHTML = `<p>AQI data not available</p>`;
    }
}

function displayWeather(data) {
    const { name, weather, main, wind } = data;
    const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <img class="weather-icon" src="${weatherIcon}" alt="${weather[0].description}">
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind: ${wind.speed} m/s, ${getWindDirection(wind.deg)}</p>
    `;
}

async function getForecastData(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error("Error fetching forecast data:", error);
    }
}

function displayForecast(data) {
    forecastContainer.innerHTML = ""; // Clear previous forecast
    const dailyData = filterDailyData(data.list);

    dailyData.forEach((day) => {
        const date = new Date(day.dt * 1000); // Convert timestamp to Date object
        const formattedDate = date.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
        const weatherIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");
        forecastCard.innerHTML = `
            <h4>${formattedDate}</h4>
            <img class="forecast-icon" src="${weatherIcon}" alt="${day.weather[0].description}">
            <p>${day.weather[0].description}</p>
            <p>Temp: ${day.main.temp}°C</p>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

function filterDailyData(data) {
    // Extract one forecast per day (e.g., 12:00 PM timestamps)
    const filtered = data.filter((item) => item.dt_txt.includes("12:00:00"));
    return filtered.slice(0, 5); // Get 5 days of forecast
}

async function getAQIData(lat, lon) {
    const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
        const aqiResponse = await fetch(aqiUrl);
        const aqiData = await aqiResponse.json();

        if (aqiData.list && aqiData.list.length > 0) {
            displayAQI(aqiData.list[0].main.aqi);
        } else {
            throw new Error("AQI data not available");
        }
    } catch (error) {
        console.error("Error fetching AQI data:", error);
        aqiInfo.innerHTML = `<p>AQI data not available</p>`;
    }
}

function displayAQI(aqi) {
    const aqiDescriptions = [
        "Good (0-50)",
        "Fair (51-100)",
        "Moderate (101-150)",
        "Poor (151-200)",
        "Very Poor (201+)",
    ];
    const aqiColors = ["green", "yellow", "orange", "red", "purple"];
    const description = aqiDescriptions[aqi - 1];
    const color = aqiColors[aqi - 1];

    aqiInfo.innerHTML = `
        <h3>Air Quality Index</h3>
        <p id="aqi-description">${description}</p>
        <div id="aqi-meter" style="background-color: ${color}">
            AQI Value: <span id="aqi-level">${aqi}</span>
        </div>
    `;
}

function getWindDirection(degree) {
    const directions = [
        "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
    ];
    return directions[Math.round(degree / 22.5) % 16];
}
