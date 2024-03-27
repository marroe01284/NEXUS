document.getElementById("loginForm"). addEventListener("submit", function (event) {
    event.preventDefault();

    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let username = document.getElementById("username").value;

    localStorage.setItem("fname", firstName);
    localStorage.setItem("lname", lastName);
    localStorage.setItem("username", username);

    window.location.href = "profile.html";
});