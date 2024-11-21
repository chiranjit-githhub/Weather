// signup.js

// Wait for the DOM to fully load before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Select the signup form by its ID
    const signupForm = document.getElementById("signup-form");

    // Attach a submit event listener to the signup form
    signupForm.addEventListener("submit", handleSignup);
});

/**
 * Handles the signup process when the signup form is submitted.
 * @param {Event} event - The form submission event.
 */
function handleSignup(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve input values from the form
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    // Basic validation to ensure all fields are filled
    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Additional validation: Check if email format is correct
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Retrieve existing users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email already exists in the users array
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
        alert("An account with this email already exists. Please log in.");
        return;
    }

    // Create a new user object
    const newUser = {
        username,
        email,
        password, // Note: In a real-world application, passwords should be hashed before storage
    };

    // Add the new user to the users array
    users.push(newUser);

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Provide feedback to the user and redirect to the login page
    alert("Signup successful! Please log in.");
    window.location.href = "login.html";
}

/**
 * Validates the email format using a regular expression.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if email is valid, false otherwise.
 */
function validateEmail(email) {
    // Simple email regex pattern for basic validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
