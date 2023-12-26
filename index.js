document.addEventListener("DOMContentLoaded", function() {
    // Simulate content loading delay (you can replace this with your actual loading logic)
    setTimeout(function() {
        const loadingContainer = document.getElementById("loadingContainer");
        const content = document.getElementById("content");

        // Hide loading container and show content
        loadingContainer.style.opacity = 0;
        content.style.opacity = 1;

        // Delay removing the loading container to allow the fade-out effect
        setTimeout(function() {
            loadingContainer.style.display = "none";
        }, 500); // Adjust the delay to match the transition duration
    }, 2000); // Simulated loading time, adjust as needed
});
