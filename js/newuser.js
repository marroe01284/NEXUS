document.getElementById("loginForm"). addEventListener("submit", function (event) {
    event.preventDefault();

    if (!this.checkValidity()) {
        return;
    }

    let password = document.getElementById("pwd").value;
    let confirmPassword = document.getElementById("pwd2").value;
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("username").value;

    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("username", username);

    window.location.href = "profile.html";
});

document.getElementById("pwd2").addEventListener("input", function () {
    let password = document.getElementById("pwd").value;
    let confirmPassword = this.value;
    let messageElement = document.getElementById("passwordMatchMessage");

    if (confirmPassword === '') {
        messageElement.textContent = '';
    } else if (password === confirmPassword) {
        messageElement.textContent = "Passwords match!";
        messageElement.style.color = "green";
    } else {
        messageElement.textContent = "Passwords do not match";
        messageElement.style.color = "red";
    }
});

