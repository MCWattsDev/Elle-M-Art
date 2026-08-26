let slideNum = 1;
var timer = null;
const homeSlide = document.getElementById("home-slide");
const achromSlide = document.getElementById("achrom-slide");
const colorSlide = document.getElementById("color-slide");
const body = document.querySelector("body");

if (body.classList.contains("home")) { // Error prevention on other pages
    dispSlide(slideNum, homeSlide); // Calls first slide to be displayed on home page
}

function openModal(slider) { // Toggles the modal divs display "on"
    slider.style.display = "block";
    document.getElementById("achrom-thumb").scrollLeft = 0;
}

function closeModal(slider) { // Toggles the modal divs display "off"
    slider.style.display = "none";
}

function changeSlide(slide, slider) { // Function to move slides and moves thumbnail slider accordingly
    slideNum += slide; // Adds or "subtracts" 1 from slide count

    if (slider !== homeSlide) { // Verifies carousel is in gallery 
        if (slide > 0 && slideNum <= (slider.getElementsByClassName("slides").length)) { // Checks if movement is positive and slide is less than or equal to max
            document.getElementById("achrom-thumb").scrollLeft += 50; // Moves thumbnail slideshow +50 pixels
        } else if (slide < 0 && slideNum > 0) { // Checks if movement is negative and slide is greater than minimum
            document.getElementById("achrom-thumb").scrollLeft -= 50; // Moves thumbnail -50 pixels
        } else if (slide < 0 && slideNum === 0) { // Checks if movement is negative and slide is at min
            document.getElementById("achrom-thumb").scrollLeft = document.getElementById("achrom-thumb").scrollWidth; // Moves thumbnail to end
        } else {
            document.getElementById("achrom-thumb").scrollLeft -= document.getElementById("achrom-thumb").scrollWidth; // Moves thumbnail to start
        }
    }

    clearTimeout(timer);
    dispSlide(slideNum, slider);
}

function currSlide(slide, slider) { // Sets displayed slide to value sent to current slide function
    clearTimeout(timer);
    dispSlide(slideNum = slide, slider);
}

function dispSlide(slide, slider) {
    let i = 1;
    const slides = slider.getElementsByClassName("slides");
    const dots = slider.getElementsByClassName("dots");
    const achromCaption = document.getElementById("achrom-caption");
    const colorCaption = document.getElementById("color-caption");

    if (slide === undefined) { // Uses undefined parameter to ensure automated looping
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

    if (slider !== homeSlide) { // Matches alt text to caption for images in lightbox and auto-rotates home carousel
        achromCaption.innerHTML = dots[slideNum - 1].alt;
        colorCaption.innerHTML = dots[slideNum - 1].alt;
    } else {
        timer = setTimeout(() => {
            dispSlide(undefined, homeSlide);
        }, 6000);
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
            window.location.href = "/Elle-M-Art/ema_thanks.html";
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
