import myJson from './products.json' assert {
  type: 'json'
};

function fillCartPage() {
  const cartProducts = JSON.parse(localStorage.getItem("RS-cart"));

  for (let i = 0; i < cartProducts.length; i++) {
    let newItem = document.createElement('div');
    newItem.className = 'cart__prouducts__list';
    document.querySelector('.cart__prouducts__list__wrapper').append(newItem);

    let itemN = document.createElement('div');
    itemN.className = 'cart__prouducts__list__n';
    itemN.innerHTML = `${i+1}`;
    document.querySelectorAll('.cart__prouducts__list')[i].append(itemN);

    let itemThumb = document.createElement('div');
    itemThumb.className = 'cart__prouducts__list__photo';
    const itemImg = new Image();
    let productId = cartProducts[i].id
    itemImg.src = `${myJson[productId-1].thumbnail}`;
    itemImg.alt = "item img";
    itemImg.className = "img__item";
    itemThumb.appendChild(itemImg)
    document.querySelectorAll('.cart__prouducts__list')[i].append(itemThumb);

    let listDetail = document.createElement('div');
    listDetail.className = 'cart__prouducts__list__detail';
    document.querySelectorAll('.cart__prouducts__list')[i].append(listDetail);

    let itemName = document.createElement('div');
    itemName.className = 'cart__prouducts__list__detail__title';
    itemName.innerHTML = `${myJson[productId-1].name}`;
    document.querySelectorAll('.cart__prouducts__list__detail')[i].append(itemName);

    let itemDscr = document.createElement('div');
    itemDscr.className = 'cart__prouducts__list__detail__dscr';
    itemDscr.innerHTML = `${myJson[productId-1].description}`;
    document.querySelectorAll('.cart__prouducts__list__detail')[i].append(itemDscr);

    let itemRd = document.createElement('div');
    itemRd.className = 'cart__prouducts__list__detail__rd';
    document.querySelectorAll('.cart__prouducts__list__detail')[i].append(itemRd);

    let itemRate = document.createElement('div');
    itemRate.className = 'cart__prouducts__list__detail__rating';
    itemRate.innerHTML = `Rating: ${myJson[productId-1].rating}`;
    document.querySelectorAll('.cart__prouducts__list__detail__rd')[i].append(itemRate);

    let itemDiscount = document.createElement('div');
    itemDiscount.className = 'cart__prouducts__list__detail__discount';
    itemDiscount.innerHTML = `Discount: ${myJson[productId-1].discountPercentage}%`;
    document.querySelectorAll('.cart__prouducts__list__detail__rd')[i].append(itemDiscount);

    let itemCountWrap = document.createElement('div');
    itemCountWrap.className = 'cart__prouducts__list__count';
    document.querySelectorAll('.cart__prouducts__list')[i].append(itemCountWrap);

    let itemStock = document.createElement('div');
    itemStock.className = 'cart__prouducts__list__count__stock';
    itemStock.innerHTML = `Stock: ${myJson[productId-1].stock}`;
    document.querySelectorAll('.cart__prouducts__list__count')[i].append(itemStock);

    let itemCountBtn = document.createElement('div');
    itemCountBtn.className = 'cart__prouducts__list__count__items';
    document.querySelectorAll('.cart__prouducts__list')[i].append(itemCountBtn);

    let newBtnMinus = document.createElement('button');
    newBtnMinus.className = 'btn_items_left';
    newBtnMinus.innerText = '-';
    document.querySelectorAll('.cart__prouducts__list__count__items')[i].appendChild(newBtnMinus);

    let itemCountSum = document.createElement('div');
    itemCountSum.className = 'cart__prouducts__list__count__items__sum';
    itemCountSum.innerHTML = "1";
    document.querySelectorAll('.cart__prouducts__list__count__items')[i].append(itemCountSum);

    let newBtnPlus = document.createElement('button');
    newBtnPlus.className = 'btn_items_right';
    newBtnPlus.innerText = '+';
    document.querySelectorAll('.cart__prouducts__list__count__items')[i].appendChild(newBtnPlus);

    let itemPriceSum = document.createElement('div');
    itemPriceSum.className = 'cart__prouducts__list__count__sum';
    itemPriceSum.innerHTML = `${myJson[productId-1].price}$`;
    document.querySelectorAll('.cart__prouducts__list__count')[i].append(itemPriceSum);
  }
}

export default fillCartPage