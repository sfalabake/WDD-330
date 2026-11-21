import {
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
  alertMessage,
} from "./utils.mjs";

function productDetailsTemplate(product) {
  const finalPrice = Number(product.FinalPrice);
  const retailPrice = Number(product.SuggestedRetailPrice);
  const hasDiscount = retailPrice > finalPrice;

  let priceMarkup = `<p class="product-card__price">$${finalPrice.toFixed(2)}</p>`;

  if (hasDiscount) {
    const discountAmount = (retailPrice - finalPrice).toFixed(2);
    const discountPercent = Math.round(
      ((retailPrice - finalPrice) / retailPrice) * 100,
    );

    priceMarkup = `<div class="product-detail__pricing">
      <span class="product-card__discount-badge">Save ${discountPercent}% ($${discountAmount} off)</span>
      <p class="product-card__price">
        <span class="product-card__original-price">$${retailPrice.toFixed(2)}</span>
        <span class="product-card__final-price">$${finalPrice.toFixed(2)}</span>
      </p>
    </div>`;
  }

  // Updated image source to pull PrimaryLarge from the new API structure
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    ${priceMarkup}
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product
    this.product = await this.dataSource.findProductById(this.productId);
    // render the HTML into <main>
    this.renderProductDetails("main");
    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cartContents = getLocalStorage("so-cart");
    if (!Array.isArray(cartContents)) {
      cartContents = [];
    }
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);

    // Update the superscript badge instantly when clicked
    updateCartCount();
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product),
    );
  }
}