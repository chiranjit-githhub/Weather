// login.js

// Wait for the DOM to fully load before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Select the login form by its ID
    const loginForm = document.getElementById("login-form");

    // Attach a submit event listener to the login form
    loginForm.addEventListener("submit", handleLogin);
});

/**
 * Handles the login process when the login form is submitted.
 * @param {Event} event - The form submission event.
 */
function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve input values from the form
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;

    // Basic validation to ensure all fields are filled
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Retrieve existing users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find a user that matches the entered email and password
    const matchedUser = users.find((user) => user.email === email && user.password === password);

    if (matchedUser) {
        // Successful login
        alert(`Welcome back, ${matchedUser.username}! Redirecting to the Home Page...`);
        window.location.href = "home.html"; // Redirect to home page
    } else {
        // Failed login
        alert("Invalid email or password. Please try again.");
    }
}
