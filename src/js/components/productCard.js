const displayProductCard = (product) => {

  const productDiv = document.createElement('div');
  productDiv.classList.add('card');

  const discountdPrice = product.discount ? product.price - (product.price * product.discount/100) : '';

  productDiv.innerHTML = `<img src=${product.url_image || './src/img/no_image.jpg'} class="card-img-top" alt=${product.name}></img>`+
    '<div class="card-body">'+
    (product.discount ? `<div class="badge bg-danger text-white position-absolute discount-badge">Discount: ${product.discount}%</div>` : '') +
    `<h5 class="card-title">${product.name}</h5>`+
    (product.discount ? `<p class="card-text product-price"><small>$${product.price}</small> $${discountdPrice}</p>` 
                      : `<p class="card-text product-price">$${product.price}</p>`) +
    '<button class="btn btn-outline-dark mt-auto">Add to Cart <i class="fas fa-shopping-cart"></i></button>'+
    '</div>';

  document.querySelector('#products-list').append(productDiv);

}

export default displayProductCard;