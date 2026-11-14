import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function productDetailsTemplate(product) {
  // Updated image source to pull PrimaryLarge from the new API structure
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
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
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product),
    );
  }
}