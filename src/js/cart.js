import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productListElement = document.querySelector(".product-list");
  const cartFooterElement = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector(".cart-total");

  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productListElement.innerHTML = htmlItems.join("");

    cartFooterElement.classList.remove("hide");
    const total = calculateCartTotal(cartItems);
    cartTotalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    productListElement.innerHTML = "<p>Your cart is currently empty.</p>";
    cartFooterElement.classList.add("hide");
  }
}

function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
