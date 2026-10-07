const resultHit = (hit, helpers) => {
  const html = helpers.html;
  const highlight = helpers.components.Highlight;

  function viewProduct(event) {
    event.stopPropagation();
    helpers.sendEvent('click', hit, 'Product Clicked');
  }

  function addToCart(event) {
    event.stopPropagation();
    helpers.sendEvent('conversion', hit, 'Product Added to Cart');
  }

  return html`
    <a class="result-hit">
      <div class="result-hit__image-container">
        <img class="result-hit__image" src="${hit.image}" />
      </div>
      <div class="result-hit__details">
        <h3 class="result-hit__name">${highlight({ attribute: 'name', hit })}</h3>
        <p class="result-hit__price">$${hit.price}</p>
      </div>
      <div class="result-hit__controls">
        <button id="view-item" class="result-hit__view" onClick=${viewProduct}>View</button>
        <button id="add-to-cart" class="result-hit__cart" onClick=${addToCart}>Add To Cart</button>
      </div>
    </a>
  `;
};

export default resultHit;
