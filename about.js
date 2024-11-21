// Feedback Popup Logic
document.addEventListener("DOMContentLoaded", () => {
    const feedbackPopup = document.getElementById("feedback-popup");
    const submitFeedback = document.getElementById("submit-feedback");
    const closeFeedback = document.getElementById("close-feedback");
    const feedbackInput = document.getElementById("feedback-input");

    // Show popup after a delay
    setTimeout(() => {
        feedbackPopup.classList.remove("hidden");
    }, 3000); // Show popup after 3 seconds

    // Handle feedback submission
    submitFeedback.addEventListener("click", () => {
        const feedback = feedbackInput.value.trim();
        if (feedback) {
            alert("Thank you for your feedback!");
            feedbackInput.value = ""; // Clear input
            feedbackPopup.classList.add("hidden"); // Hide popup
        } else {
            alert("Please enter your feedback before submitting.");
        }
    });

    // Close the popup
    closeFeedback.addEventListener("click", () => {
        feedbackPopup.classList.add("hidden");
    });
});
