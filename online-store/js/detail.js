import myJson from './products.json' assert {
  type: 'json'
};

import updateHeader from './updateCart.js'
import actionModal from './modal.js';

const products = myJson;

function fillDetailPage() {
  const productId = parseInt(document.location.hash.slice(6), 10);

  const productName = products[productId-1].name;
  document.querySelector('.detail__title').append(productName);

  const productDscr = products[productId-1].description;
  document.querySelector('.detail__main__dscr').append(productDscr);

  const productDiscount = products[productId-1].discountPercentage;
  document.querySelector('.detail__main__discount').append(`${productDiscount} %`);

  const productRating = products[productId-1].rating;
  document.querySelector('.detail__main__rating').append(productRating);

  const productStock = products[productId-1].stock;
  document.querySelector('.detail__main__stock').append(productStock);

  const productBrand = products[productId-1].brand;
  document.querySelector('.detail__main__brand').append(productBrand);

  const productCategory = products[productId-1].category;
  document.querySelector('.detail__main__category').append(productCategory);

  const productPrice = products[productId-1].price;
  document.querySelector('.detail__main__price').append(`${productPrice} $`);

  const productThumb = products[productId-1].thumbnail;
  const bigImg = new Image();
  bigImg.id = "img__big";
  bigImg.src = productThumb;
  bigImg.alt = "big img";
  document.querySelector('.detail__main__photo__big').appendChild(bigImg);

  for (let i = 0; i < products[productId-1].images.length; i++) {
    const newSmallPhoto = document.createElement('div');
    newSmallPhoto.className = 'detail__main__photo__carousel__item';
    const smallImg = new Image();
    smallImg.src = `${products[productId-1].images[i]}`;
    smallImg.alt = "small img";
    smallImg.className = "img__small";
    newSmallPhoto.appendChild(smallImg)
    document.querySelector('.detail__main__photo__carousel').append(newSmallPhoto);
  }

  for (let i = 0; i < products[productId-1].images.length; i++) {
    document.querySelectorAll('.img__small')[i].addEventListener('click', function (e) {
      let expandImg = document.getElementById("img__big");
      expandImg.src = e.currentTarget.src;
    });
  }

  let breadcrumbLastChild = document.querySelectorAll('.breadcrumb__ul > li')[2];
  breadcrumbLastChild.innerHTML = `${myJson[productId-1].category}`;

  const btn_add = document.querySelector('.button__add');
  btn_add.id = `btn-add-${productId}`;

  let cartProducts = [];
  cartProducts = JSON.parse(localStorage.getItem("RS-cart"));

  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id == parseInt(document.querySelector('.button__add').id.slice(8), 10)) {
      document.querySelector('.button__add').innerHTML = 'Drop item';
    }
  }

  document.querySelector('.button__add').addEventListener('click', addToCart);

  function addToCart(e) {

    const item_id = parseInt(e.currentTarget.id.slice(8), 10);
    if (document.getElementById(`btn-add-${item_id}`).innerHTML === "Add to cart") {
      document.getElementById(`btn-add-${item_id}`).innerHTML = "Drop item";
      cartProducts.push({
        id: item_id,
        count: 1,
        price: products[item_id - 1].price
      })
      localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
    } else {
      document.getElementById(`btn-add-${item_id}`).innerHTML = "Add to cart";
      cartProducts = cartProducts.filter(value => value.id != item_id)
      localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
    }
    updateHeader()
  }

  const btn_buy_now = document.querySelector('.button__buy__now');
  btn_buy_now.id = `btn-byu-${productId}`;
  btn_buy_now.addEventListener('click', buyNow)

  function buyNow(e) {
    const item_id = parseInt(e.currentTarget.id.slice(8), 10);
    cartProducts = [];
    cartProducts.push({
      id: item_id,
      count: 1,
      price: products[item_id - 1].price
    });
    localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
    updateHeader();
    window.location.href = '#cart';

    const transparentModal = document.querySelector('.transparent__modal');
    transparentModal.addEventListener('click', closeModalWindow);
    const modalWindow = document.querySelector('.purchase__modal');

    transparentModal.style.display = 'block';
    modalWindow.style.display = 'flex';

    function closeModalWindow() {
      transparentModal.style.display = 'none';
      modalWindow.style.display = 'none';
    }

    actionModal()
  }
}

export default fillDetailPage