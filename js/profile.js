// this gets the info from registration page, you can use this when displaying
// first and last name, and username on the profile page
document.getElementById("firstName").textContent = localStorage.getItem("firstName");
document.getElementById("lastName").textContent = localStorage.getItem("lastName");
document.getElementById("username").textContent = localStorage.getItem("username");
