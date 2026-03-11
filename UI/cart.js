const cartItems = document.querySelector("#cartItems");
const cartEmptyState = document.querySelector("#cartEmptyState");
const totalPrice = document.querySelector("#totalPrice");
const grandTotal = document.querySelector("#grandTotal");
const checkoutButton = document.querySelector("#checkoutButton");

const productCatalog = {
  SOIL: {
    image: "./assets/소프트 우디 2.png",
    badge: "Deep Woody",
    description: "비에 젖은 흙과 나무결이 겹쳐지는 차분하고 깊은 우디 향.",
    checkoutKey: "soil",
  },
  ROOT: {
    image: "./assets/웜 우디 2.png",
    badge: "Warm Earth",
    description:
      "깊은 뿌리처럼 중심을 단단하게 잡아 주는 따뜻하고 안정적인 우디 향.",
    checkoutKey: "root",
  },
  GROVE: {
    image: "./assets/드라이 우디 2.png",
    badge: "Fresh Green",
    description: "숲길의 공기와 잎사귀의 바람을 담은 맑고 선명한 그린 우디 향.",
    checkoutKey: "grove",
  },
};

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

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function formatPrice(price) {
  return Number(price).toLocaleString("ko-KR");
}

function getProductMeta(name) {
  return (
    productCatalog[name] || {
      image: "./assets/로고.png",
      badge: "Fragrance",
      description: "선택한 향을 확인해 주세요.",
      checkoutKey: "soil",
    }
  );
}

function renderCart() {
  const cart = getCart();

  if (
    !cartItems ||
    !totalPrice ||
    !grandTotal ||
    !checkoutButton ||
    !cartEmptyState
  ) {
    return;
  }

  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartEmptyState.hidden = false;
    checkoutButton.classList.add("is-disabled");
    checkoutButton.href = "./shop.html";
    totalPrice.textContent = "0";
    grandTotal.textContent = "0";
    return;
  }

  cartEmptyState.hidden = true;
  checkoutButton.classList.remove("is-disabled");

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
        <img src="${product.image}" alt="${item.name} fragrance bottle" />
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

  const primaryProduct = getProductMeta(cart[0].name);
  checkoutButton.href = `./checkout.html?product=${primaryProduct.checkoutKey}`;
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

renderCart();

window.addToCart = addToCart;
