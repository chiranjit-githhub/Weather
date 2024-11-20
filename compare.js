const compareBtn = document.getElementById('compare-btn');
const city1Input = document.getElementById('city1-input');
const city2Input = document.getElementById('city2-input');
const comparisonResult = document.getElementById('comparison-result');

compareBtn.addEventListener('click', () => {
    const city1 = city1Input.value.trim();
    const city2 = city2Input.value.trim();
    if (city1 && city2) {
        compareWeather(city1, city2);
    }
});

async function compareWeather(city1, city2) {
    const apiKey = '06e121bb3101d74ec380f941246457d7'; // Use your API key here
    const weatherUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${apiKey}`;
    const weatherUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=${apiKey}`;

    try {
        const response1 = await fetch(weatherUrl1);
        const response2 = await fetch(weatherUrl2);

        const data1 = await response1.json();
        const data2 = await response2.json();

        if (data1.cod !== 200 || data2.cod !== 200) {
            throw new Error('Invalid city name');
        }

        displayComparison(data1, data2);
    } catch (error) {
        console.error('Error comparing weather:', error);
        comparisonResult.innerHTML = `<p>Error fetching weather data</p>`;
    }
}

function displayComparison(data1, data2) {
    comparisonResult.innerHTML = `
        <div class="comparison-card">
            <h3>${data1.name}</h3>
            <p>Temperature: ${(data1.main.temp - 273.15).toFixed(1)} °C</p>
            <p>Weather: ${data1.weather[0].description}</p>
        </div>
        <div class="comparison-card">
            <h3>${data2.name}</h3>
            <p>Temperature: ${(data2.main.temp - 273.15).toFixed(1)} °C</p>
            <p>Weather: ${data2.weather[0].description}</p>
        </div>
    `;
}
