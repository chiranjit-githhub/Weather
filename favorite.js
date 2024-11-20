const addFavoriteBtn = document.getElementById('add-favorite-btn');
const favoriteCityInput = document.getElementById('favorite-city-input');
const favoritesList = document.getElementById('favorites-list');

// Load the favorite cities from localStorage
document.addEventListener('DOMContentLoaded', loadFavorites);

addFavoriteBtn.addEventListener('click', () => {
    const city = favoriteCityInput.value.trim();
    if (city) {
        addFavoriteCity(city);
    }
});

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.innerHTML = '';
    favorites.forEach(city => {
        const cityItem = document.createElement('div');
        cityItem.classList.add('favorite-city');
        cityItem.innerHTML = `
            <span>${city}</span>
            <button class="remove-favorite" onclick="removeFavoriteCity('${city}')">Remove</button>
        `;
        favoritesList.appendChild(cityItem);
    });
}

function addFavoriteCity(city) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
    }
}

function removeFavoriteCity(city) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(fav => fav !== city);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    loadFavorites();
}
