const menu = document.querySelector("#mobile-menu");
const navLinks = document.querySelector(".nav-links");
const project4StaticWrap = document.querySelector("#project4StaticWrap");
const project4StaticImage = document.querySelector("#project4StaticImage");

menu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

function blockNavigation(event) {
  event.preventDefault();
  event.stopPropagation();
}

project4StaticWrap?.addEventListener("click", blockNavigation);
project4StaticImage?.addEventListener("click", blockNavigation);
