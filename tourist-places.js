const clientId = "ATLM5ZWOA5QEZ0T4KTPM5KT5S32UGN3FMMSE5N5OY2N4V53P";  // Replace with your Foursquare API Key
const clientSecret = "QOEI5RZQAKUIA5VJL3YGCOVL3NRXMGMOHQCUR51PW31JQPHE";  // Replace with your Foursquare Client Secret

// Function to handle the city search and fetch tourist places data
async function getTouristPlaces(city) {
    const url = `https://api.foursquare.com/v2/venues/explore?near=${city}&section=sights&client_id=${clientId}&client_secret=${clientSecret}&v=20240101`;  // API version is specified here
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log(data);  // Log the data to check the structure

        // Check if data contains tourist places
        if (data.response.groups && data.response.groups.length > 0) {
            const places = data.response.groups[0].items;
            if (places.length > 0) {
                displayTouristPlaces(places);
            } else {
                throw new Error("No tourist places found.");
            }
        } else {
            throw new Error("No tourist places found.");
        }
    } catch (error) {
        console.error("Error fetching tourist places:", error);
        document.getElementById("tourist-places").innerHTML = `<p>No tourist places found for this city. Please try another city.</p>`;
    }
}

// Function to display the list of tourist places with images
function displayTouristPlaces(places) {
    const placesContainer = document.getElementById("tourist-places");
    placesContainer.innerHTML = ""; // Clear any previous data

    places.forEach(place => {
        const venue = place.venue;
        const placeName = venue.name;
        const placeAddress = venue.location.address || "Address not available";
        const placeCategory = venue.categories.length > 0 ? venue.categories[0].name : "Category not available";
        const placeImage = venue.photos && venue.photos.groups.length > 0 ? venue.photos.groups[0].items[0].prefix + "200x200" : "https://via.placeholder.com/200";  // Default image if no photo

        const placeCard = document.createElement("div");
        placeCard.classList.add("place-card");

        placeCard.innerHTML = `
            <img src="${placeImage}" alt="${placeName}" class="place-image">
            <h4>${placeName}</h4>
            <p><strong>Category:</strong> ${placeCategory}</p>
            <p><strong>Address:</strong> ${placeAddress}</p>
        `;

        placesContainer.appendChild(placeCard);
    });
}

// Search button event listener
document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) {
        getTouristPlaces(city);
    } else {
        alert("Please enter a city name.");
    }
});
