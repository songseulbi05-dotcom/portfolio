const cartItems = document.querySelector("#cartItems");
const cartEmptyState = document.querySelector("#cartEmptyState");
const totalPrice = document.querySelector("#totalPrice");
const grandTotal = document.querySelector("#grandTotal");
const checkoutButton = document.querySelector("#checkoutButton");

const productCatalog = {
  "금실 딸기 500g": {
    image: "./assets/Best Strawberry 1.JPG",
    badge: "Daily Sweet",
    description: "산뜻한 단맛이 매력적인 데일리 픽. 가볍게 즐기기 좋은 딸기입니다.",
  },
  "알프스 딸기 500g": {
    image: "./assets/Best Strawberry 2.JPG",
    badge: "Most Loved",
    description: "향과 과즙의 균형이 좋아 가장 만족도가 높은 베스트셀러입니다.",
  },
  "킹스베리 딸기 500g": {
    image: "./assets/Best Strawberry 3.png",
    badge: "Premium Gift",
    description: "크기와 존재감이 돋보여 특별한 날 선물용으로 잘 어울립니다.",
  },
};

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("sweetBerryCart")) || [];
  } catch {
    return [];
  }
}

function setCart(cart) {
  localStorage.setItem("sweetBerryCart", JSON.stringify(cart));
}

function formatPrice(price) {
  return Number(price).toLocaleString("ko-KR");
}

function getProductMeta(name) {
  return (
    productCatalog[name] || {
      image: "./assets/hero img.png",
      badge: "Sweet Berry",
      description: "선택한 딸기를 확인해 주세요.",
    }
  );
}

function addToCart(name, price) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  setCart(cart);
  window.alert("장바구니에 추가되었습니다.");
}

function renderCart() {
  const cart = getCart();

  if (
    !cartItems ||
    !cartEmptyState ||
    !totalPrice ||
    !grandTotal ||
    !checkoutButton
  ) {
    return;
  }

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartEmptyState.hidden = false;
    checkoutButton.classList.add("is-disabled");
    checkoutButton.href = "./Shop.html";
    totalPrice.textContent = "0";
    grandTotal.textContent = "0";
    return;
  }

  cartEmptyState.hidden = true;
  checkoutButton.classList.remove("is-disabled");

  let total = 0;

  cart.forEach((item, index) => {
    const product = getProductMeta(item.name);
    const quantity = Number(item.quantity) || 1;
    const itemPrice = Number(item.price) || 0;
    const itemTotal = itemPrice * quantity;

    total += itemTotal;

    const itemElement = document.createElement("article");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <div class="cart-item-image">
        <img src="${product.image}" alt="${item.name}" />
      </div>
      <div class="cart-item-content">
        <h3>${item.name}</h3>
        <p class="cart-item-copy">${product.description}</p>
        <div class="cart-item-meta">
          <span>${product.badge}</span>
          <span>수량 ${quantity}개</span>
        </div>
      </div>
      <div class="cart-item-side">
        <p class="cart-price">₩${formatPrice(itemTotal)}</p>
        <div class="cart-quantity">
          <button class="qty-btn" type="button" data-action="decrease" data-index="${index}">-</button>
          <span class="qty-value">${quantity}</span>
          <button class="qty-btn" type="button" data-action="increase" data-index="${index}">+</button>
        </div>
        <button class="remove-btn" type="button" data-action="remove" data-index="${index}">Remove</button>
      </div>
    `;

    cartItems.appendChild(itemElement);
  });

  totalPrice.textContent = formatPrice(total);
  grandTotal.textContent = formatPrice(total);
  checkoutButton.href = "./Shop.html";
}

function changeQty(index, amount) {
  const cart = getCart();
  const item = cart[index];

  if (!item) {
    return;
  }

  item.quantity = (Number(item.quantity) || 1) + amount;

  if (item.quantity <= 0) {
    cart.splice(index, 1);
  }

  setCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  setCart(cart);
  renderCart();
}

if (cartItems) {
  cartItems.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const action = target.dataset.action;
    const index = Number(target.dataset.index);

    if (!action || Number.isNaN(index)) {
      return;
    }

    if (action === "increase") {
      changeQty(index, 1);
    }

    if (action === "decrease") {
      changeQty(index, -1);
    }

    if (action === "remove") {
      removeItem(index);
    }
  });
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const addButton = target.closest("[data-add-to-cart]");

  if (!(addButton instanceof HTMLElement)) {
    return;
  }

  event.preventDefault();

  const { productName, productPrice } = addButton.dataset;

  if (!productName || !productPrice) {
    return;
  }

  addToCart(productName, Number(productPrice));
});

renderCart();

window.addToCart = addToCart;
