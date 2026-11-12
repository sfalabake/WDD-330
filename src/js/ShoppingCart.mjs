import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

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

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  init() {
    const cartItems = getLocalStorage(this.key) || [];
    this.renderCartContents(cartItems);
  }

  calculateCartTotal(items) {
    return items.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
  }

  renderCartContents(cartItems) {
    const productListElement = document.querySelector(this.parentSelector);
    const cartFooterElement = document.querySelector(".cart-footer");
    const cartTotalElement = document.querySelector(".cart-total");

    if (cartItems.length > 0) {
      renderListWithTemplate(
        cartItemTemplate,
        productListElement,
        cartItems,
        "afterbegin",
        true,
      );

      cartFooterElement.classList.remove("hide");
      this.total = this.calculateCartTotal(cartItems);
      cartTotalElement.innerHTML = `Total: $${this.total.toFixed(2)}`;
    } else {
      productListElement.innerHTML = "<p>Your cart is currently empty.</p>";
      cartFooterElement.classList.add("hide");
    }
  }
}
