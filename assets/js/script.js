'use strict'

//? PRELOAD
//? Loading will be end after document is loaded

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.classList.add("loaded");
        document.body.classList.add("loaded");
    }, 1000)

})


//? ADD EVENT LISTENER ON MULTIPLE ELEMENTS

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

//? NAVBAR
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar)

//? HEADER & BACK TO TOP
const header = document.querySelector("[data-header]");
const backToTop = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }
    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
        header.classList.add("active");
        backToTop.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active");
        backToTop.classList.remove("active");
    }
})

//? HERO SLIDER
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = () => {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = () => {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev)

//? Auto Slide
let autoSlideInterval;
const autoSlide = function () {
    autoSlideInterval = setInterval(() => {
        slideNext();
    }, 7000)
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", () => {
    clearInterval(autoSlideInterval)
})

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide)

window.addEventListener("load", autoSlide)

//? PARALLAX

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", (event) => {
    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    //? reverse the number eg. 20 -> -20, -5 -> 5;
    x = -x;
    y = -y;

    for (let i = 0; i < parallaxItems.length; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed)
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed)
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }
})