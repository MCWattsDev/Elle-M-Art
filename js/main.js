let slideNum = 1;
const homeSlide = document.getElementById("home-slide");
const achromSlide = document.getElementById("achrom-slide");
const colorSlide = document.getElementById("color-slide");
const body = document.querySelector("body");

if (body.classList.contains("home")) {
    dispSlide(slideNum, homeSlide);
}

function openModal(slider) { // Toggles the modal divs display "on"
    slider.style.display = "block";
}

function closeModal(slider) { // Toggles the modal divs display "off"
    slider.style.display = "none";
}

function changeSlide(slide, slider) { // Adds and "subtracts" value from change slide function and sets displayed slide to new value
    dispSlide(slideNum += slide, slider);
}

function currSlide(slide, slider) { // Sets displayed slide to value sent to current slide function
    dispSlide(slideNum = slide, slider);
}

function dispSlide(slide, slider) {
    let i = 1;
    const slides = slider.getElementsByClassName("slides");
    const dots = slider.getElementsByClassName("dots");
    const achromCaption = document.getElementById("achrom-caption");
    const colorCaption = document.getElementById("color-caption");

    if (slide === undefined) { // Prevents slide from being undefined on automated loop and sets/resets slide interval
        slide = ++slideNum;
    }

    if (slide > slides.length) { // If slide number is greater than total slides, go to 1
        slideNum = 1;
    }

    if (slide < 1) { // If slide number is less than 1, go to end value
        slideNum = slides.length;
    }

    for (i = 0; i < slides.length; i++) { // Ensures all slides are set to display none
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) { // Removes " active" addition from all dot class names
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if (slider === homeSlide) { // Toggles display on for slides, block for home, flex for galleries
        slides[slideNum - 1].style.display = "block";
    } else {
        slides[slideNum - 1].style.display = "flex";
    }
    
    dots[slideNum - 1].className += " active"; // Adds " active" to end of currently selected dot

    if (slider !== homeSlide) { // Matches alt text to caption for images in lightbox
        achromCaption.innerHTML = dots[slideNum - 1].alt;
        colorCaption.innerHTML = dots[slideNum - 1].alt;
    }
}

const form = document.getElementById("contact-form");

if (body.classList.contains("contact")) {
    form.addEventListener("submit", (e) => { // Prevents form from submitting if emails do not match and redirects to thank you page on a match
        if (!emailValidation()) {
            e.preventDefault();
            return;
        } else {
            e.preventDefault();
            window.location.href = "/ema_thanks.html";
        }
    });
}

function emailValidation() { // Converts emails to lowercase and compares to validate that they match
    const emailOne = document.getElementById("email");
    const emailTwo = document.getElementById("conf-email");
    const oneLC = emailOne.value.toLowerCase();
    const twoLC = emailTwo.value.toLowerCase();

    if (oneLC !== twoLC) {
        emailTwo.setCustomValidity("Email does not match");
        return false;
    } else {
        return true;
    }
}