import myJson from './products.json' assert {
  type: 'json'
};

import updateHeader from './updateCart'
import actionModal from './modal';

const products = myJson;

function fillDetailPage() {
  const productId = parseInt(document.location.hash.slice(6), 10);

  const productName = products[productId-1].name;
  (document.querySelector('.detail__title') as HTMLElement).append(productName);

  const productDscr = products[productId-1].description;
  (document.querySelector('.detail__main__dscr') as HTMLElement).append(productDscr);

  const productDiscount = products[productId-1].discountPercentage;
  (document.querySelector('.detail__main__discount') as HTMLElement).append(`${productDiscount} %`);

  const productRating = products[productId-1].rating;
  (document.querySelector('.detail__main__rating') as HTMLElement).append((productRating as unknown as string));

  const productStock = products[productId-1].stock;
  (document.querySelector('.detail__main__stock') as HTMLElement).append(productStock as unknown as string);

  const productBrand = products[productId-1].brand;
  (document.querySelector('.detail__main__brand') as HTMLElement).append(productBrand);

  const productCategory = products[productId-1].category;
  (document.querySelector('.detail__main__category') as HTMLElement).append(productCategory);

  const productPrice = products[productId-1].price;
  (document.querySelector('.detail__main__price') as HTMLElement).append(`${productPrice} $`);

  const productThumb = products[productId-1].thumbnail;
  const bigImg = new Image();
  bigImg.id = "img__big";
  bigImg.src = productThumb;
  bigImg.alt = "big img";
  (document.querySelector('.detail__main__photo__big') as HTMLElement).appendChild(bigImg);

  for (let i = 0; i < products[productId-1].images.length; i++) {
    const newSmallPhoto: HTMLElement = document.createElement('div');
    newSmallPhoto.className = 'detail__main__photo__carousel__item';
    const smallImg = new Image();
    smallImg.src = `${products[productId-1].images[i]}`;
    smallImg.alt = "small img";
    smallImg.className = "img__small";
    newSmallPhoto.appendChild(smallImg);
    (document.querySelector('.detail__main__photo__carousel') as HTMLElement).append(newSmallPhoto);
  }

  for (let i = 0; i < products[productId-1].images.length; i++) {
    document.querySelectorAll('.img__small')[i].addEventListener('click', function (e) {
      let expandImg: HTMLElement | null = document.getElementById("img__big");
      (expandImg as HTMLImageElement).src = (e.currentTarget as HTMLImageElement).src;
    });
  }

  let breadcrumbLastChild = document.querySelectorAll('.breadcrumb__ul > li')[2];
  breadcrumbLastChild.innerHTML = `${myJson[productId-1].category}`;

  const btn_add: HTMLElement | null = document.querySelector('.button__add');
  (btn_add as HTMLElement).id = `btn-add-${productId}`;

  // let cartProducts = [];
  let cartProducts = JSON.parse(localStorage.getItem("RS-cart") || '');

  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id == parseInt((document.querySelector('.button__add') as HTMLElement).id.slice(8), 10)) {
      (document.querySelector('.button__add') as HTMLElement).innerHTML = 'Drop item';
    }
  }

  (document.querySelector('.button__add') as HTMLElement).addEventListener('click', addToCart);

  function addToCart(e: Event) {

    const item_id = parseInt((e.currentTarget as HTMLElement).id.slice(8), 10);
    if ((document.getElementById(`btn-add-${item_id}`) as HTMLElement).innerHTML === "Add to cart") {
      (document.getElementById(`btn-add-${item_id}`) as HTMLElement).innerHTML = "Drop item";
      cartProducts.push({
        id: item_id,
        count: 1,
        price: products[item_id - 1].price
      })
      localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
    } else {
      (document.getElementById(`btn-add-${item_id}`) as HTMLElement).innerHTML = "Add to cart";
      cartProducts = cartProducts.filter((value: { id: number; }) => value.id != item_id);
      localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
    }
    updateHeader()
  }

  const btn_buy_now: HTMLElement | null = document.querySelector('.button__buy__now');
  (btn_buy_now as HTMLElement).id = `btn-byu-${productId}`;
  (btn_buy_now as HTMLElement).addEventListener('click', buyNow)

  function buyNow(e: Event) {
    const item_id = parseInt((e.currentTarget as HTMLElement).id.slice(8), 10);
    cartProducts = [];
    cartProducts.push({
      id: item_id,
      count: 1,
      price: products[item_id - 1].price
    });
    localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
    updateHeader();
    window.location.href = '#cart';

    const transparentModal: HTMLElement | null = document.querySelector('.transparent__modal');
    (transparentModal as HTMLElement).addEventListener('click', closeModalWindow);
    const modalWindow: HTMLElement | null = document.querySelector('.purchase__modal');

    (transparentModal as HTMLElement).style.display = 'block';
    (modalWindow as HTMLElement).style.display = 'flex';

    function closeModalWindow() {
      (transparentModal as HTMLElement).style.display = 'none';
      (modalWindow as HTMLElement).style.display = 'none';
    }

    actionModal()
  }
}

export default fillDetailPage