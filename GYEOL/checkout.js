const checkoutProducts = {
  soil: {
    badge: "Deep Woody",
    name: "SOIL",
    description: "비에 젖은 흙과 나무결이 겹쳐지는 차분하고 깊은 우디 향.",
    price: "₩59,000",
    image: "./assets/소프트 우디 2.png",
    imageAlt: "SOIL fragrance bottle",
  },
  root: {
    badge: "Warm Earth",
    name: "ROOT",
    description: "깊은 뿌리처럼 중심을 단단하게 잡아 주는 따뜻하고 안정적인 우디 향.",
    price: "₩59,000",
    image: "./assets/웜 우디 2.png",
    imageAlt: "ROOT fragrance bottle",
  },
  grove: {
    badge: "Fresh Green",
    name: "GROVE",
    description: "숲길의 공기와 잎사귀의 바람을 담은 맑고 선명한 그린 우디 향.",
    price: "₩59,000",
    image: "./assets/드라이 우디 2.png",
    imageAlt: "GROVE fragrance bottle",
  },
};

const productImage = document.querySelector("#checkout-product-image");
const productBadge = document.querySelector("#checkout-product-badge");
const productName = document.querySelector("#checkout-product-name");
const productDescription = document.querySelector("#checkout-product-description");
const productPrice = document.querySelector("#checkout-product-price");
const subtotal = document.querySelector("#checkout-subtotal");
const total = document.querySelector("#checkout-total");

function getSelectedProduct() {
  const params = new URLSearchParams(window.location.search);
  const productKey = (params.get("product") || "soil").toLowerCase();

  return checkoutProducts[productKey] || checkoutProducts.soil;
}

function renderCheckoutProduct(product) {
  if (productImage) {
    productImage.src = product.image;
    productImage.alt = product.imageAlt;
  }

  if (productBadge) {
    productBadge.textContent = product.badge;
  }

  if (productName) {
    productName.textContent = product.name;
  }

  if (productDescription) {
    productDescription.textContent = product.description;
  }

  if (productPrice) {
    productPrice.textContent = product.price;
  }

  if (subtotal) {
    subtotal.textContent = product.price;
  }

  if (total) {
    total.textContent = product.price;
  }
}

renderCheckoutProduct(getSelectedProduct());
