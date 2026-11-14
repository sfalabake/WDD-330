import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // 1. Fixed URL path to step out of the product_listing directory
  // 2. Updated image source to pull from the API's new structure (Images.PrimaryMedium)
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Pass the category dynamically to get the correct list of products
    const list = await this.dataSource.getData(this.category);
    
    // Render the list directly without the hardcoded Tent ID filter
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}