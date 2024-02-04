// Wait for the entire page to load
window.addEventListener("load", (event) => {
  // Hide the loading screen
  document.querySelector(".loading-screen").style.display = "none";

  // Show the actual content
  document.getElementById("content").style.display = "block";
});
