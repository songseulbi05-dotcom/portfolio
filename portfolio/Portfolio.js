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
