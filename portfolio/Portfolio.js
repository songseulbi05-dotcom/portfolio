const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener("click", () => {
    const expanded = mobileMenu.getAttribute("aria-expanded") === "true";
    mobileMenu.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

const slides = document.querySelectorAll(".slide-item");
const sliderWrapper = document.querySelector(".slider-wrapper");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
let currentSlide = 0;

function updateSliderOffset() {
  const activeSlide = slides[currentSlide];
  const offset = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
  sliderWrapper.style.setProperty("--slide-offset", `-${offset}px`);
}

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slides[currentSlide].classList.add("active");
  updateSliderOffset();

  prevButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === slides.length - 1;
}

if (slides.length && sliderWrapper && prevButton && nextButton) {
  showSlide(currentSlide);
  prevButton.addEventListener("click", () => showSlide(currentSlide - 1));
  nextButton.addEventListener("click", () => showSlide(currentSlide + 1));
  window.addEventListener("resize", updateSliderOffset);
}
