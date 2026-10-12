// cover.png is 1586x992 (desk photo with no laptop in it)
const PHOTO_W = 1586;
const PHOTO_H = 992;
// where the laptop cutout should sit on the desk (in that image's own pixel space)
const LAPTOP_IN_PHOTO = { left: 574, top: 465, right: 1283 };

// laptop.png is 849x570, and its opaque (non-transparent) pixels sit at this box
const PNG_W = 849;
const PNG_H = 570;
const LAPTOP_IN_PNG = { left: 50, top: 89, right: 822, bottom: 508 };

function alignCoverLaptop() {
  const cover = document.querySelector(".cover");
  const laptop = document.querySelector(".cover-laptop");
  if (!cover || !laptop) return;

  const containerW = cover.clientWidth;
  const containerH = cover.clientHeight;

  // Same math the browser uses for `background-size: cover`
  const coverScale = Math.max(containerW / PHOTO_W, containerH / PHOTO_H);
  const offsetX = (containerW - PHOTO_W * coverScale) / 2;
  const offsetY = (containerH - PHOTO_H * coverScale) / 2;

  const targetW = (LAPTOP_IN_PHOTO.right - LAPTOP_IN_PHOTO.left) * coverScale;
  const pngLaptopW = LAPTOP_IN_PNG.right - LAPTOP_IN_PNG.left;
  const scale = targetW / pngLaptopW;

  const renderedW = PNG_W * scale;
  const left = offsetX + LAPTOP_IN_PHOTO.left * coverScale - LAPTOP_IN_PNG.left * scale;
  const top = offsetY + LAPTOP_IN_PHOTO.top * coverScale - LAPTOP_IN_PNG.top * scale;

  laptop.style.width = `${renderedW}px`;
  laptop.style.left = `${left}px`;
  laptop.style.top = `${top}px`;
}

window.addEventListener("load", alignCoverLaptop);
window.addEventListener("resize", alignCoverLaptop);
