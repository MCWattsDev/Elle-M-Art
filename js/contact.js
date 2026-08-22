const form = document.querySelector("form");
const email = document.getElementById("email");
const confEmail = document.getElementById("conf-email");

form.addEventListener("submit", (event) => { // Checks emails to verify they match
    if (!form.checkValidity()) {
      event.preventDefault();
    } else {
        if (!emailValidation) {
            event.preventDefault();
            confEmail.setCustomValidity("Email does not match");
        }
    }

    window.location.href = "/ema_thanks.html";
});

function emailValidation() {
    confEmail.setCustomValidity(""); // Resets error message to empty

    if (!confEmail.validity.valid) { // Returns if HTML verification passes
        return;
    }

    if (email.value !== confEmail.value) { // Errors if emails do not match
        return false;
    }
}