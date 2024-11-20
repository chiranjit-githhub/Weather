const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const newsContainer = document.getElementById("news-container");

// Default city (can be set to any initial city)
let currentCity = "New Delhi";
const apiKey = "3f811c5a43e14d6fbe8887c783b858b1"; // Replace with your News API key

// Fetch and display the news for the initial or searched city
async function fetchNews(city) {
    const url = `https://newsapi.org/v2/everything?q=${city}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'ok') {
            throw new Error("Failed to fetch news data");
        }

        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = `<p>Sorry, we couldn't fetch news at the moment.</p>`;
    }
}

// Display news articles with images
function displayNews(articles) {
    newsContainer.innerHTML = ""; // Clear previous articles

    if (articles.length === 0) {
        newsContainer.innerHTML = "<p>No news available for this city.</p>";
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("news-article");

        const imageUrl = article.urlToImage || "default-image.jpg"; // If no image, use a default one

        articleElement.innerHTML = `
            <img src="${imageUrl}" alt="News image">
            <div>
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.description || "No description available."}</p>
            </div>
        `;

        newsContainer.appendChild(articleElement);
    });
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        currentCity = city; // Update current city
        fetchNews(city); // Fetch news for the entered city
    }
});

// Fetch and display the news when the page loads for the default city
fetchNews(currentCity);
