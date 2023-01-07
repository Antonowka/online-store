import myJson from './products.json' assert {
  type: 'json'
};
import actionModal from './modal.js';

function fillCartPage() {
  let cartProducts = JSON.parse(localStorage.getItem("RS-cart"));

  updateCart()
  function updateCart() {
    cartProducts = JSON.parse(localStorage.getItem("RS-cart"));
    document.querySelector('.cart__prouducts__list__wrapper').innerHTML = '';
    for (let i = 0; i < cartProducts.length; i++) {
      let productCount = cartProducts[i].count;

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


      let itemNameWrapper = document.createElement('div');
      itemNameWrapper.className = 'cart__prouducts__info__wrapper';
      document.querySelectorAll('.cart__prouducts__list__photo')[i].append(itemNameWrapper);

      let itemName = document.createElement('div');
      itemName.className = 'cart__prouducts__list__detail__title';
      itemName.innerHTML = `${myJson[productId-1].name}`;
      document.querySelectorAll('.cart__prouducts__info__wrapper')[i].append(itemName);

      let itemStock = document.createElement('div');
      itemStock.className = 'cart__prouducts__list__count__stock';
      itemStock.innerHTML = `Stock: ${myJson[productId-1].stock}`;
      document.querySelectorAll('.cart__prouducts__info__wrapper')[i].append(itemStock);

      let itemRate = document.createElement('div');
      itemRate.className = 'cart__prouducts__list__detail__rating';
      itemRate.innerHTML = `Rating: ${myJson[productId-1].rating}`;
      document.querySelectorAll('.cart__prouducts__info__wrapper')[i].append(itemRate);

      let itemCountWrap = document.createElement('div');
      itemCountWrap.className = 'cart__prouducts__list__count';
      document.querySelectorAll('.cart__prouducts__list')[i].append(itemCountWrap);

      let itemCountBtn = document.createElement('div');
      itemCountBtn.className = 'cart__prouducts__list__count__items';
      document.querySelectorAll('.cart__prouducts__list')[i].append(itemCountBtn);

      let newBtnLeft = document.createElement('button');
      newBtnLeft.className = 'btn_items_left';
      newBtnLeft.id = `btn_items_left-${productId}`;
      newBtnLeft.innerText = '-';
      document.querySelectorAll('.cart__prouducts__list__count__items')[i].appendChild(newBtnLeft);

      let itemCountSum = document.createElement('div');
      itemCountSum.className = 'cart__prouducts__list__count__items__sum';
      itemCountSum.id = `items__sum-${productId}`;
      itemCountSum.innerHTML = productCount;
      document.querySelectorAll('.cart__prouducts__list__count__items')[i].append(itemCountSum);

      let newBtnRight = document.createElement('button');
      newBtnRight.className = 'btn_items_right';
      newBtnRight.id = `btn_items_right-${productId}`;
      newBtnRight.innerText = '+';
      document.querySelectorAll('.cart__prouducts__list__count__items')[i].appendChild(newBtnRight);

      let itemPriceSum = document.createElement('div');
      itemPriceSum.className = 'cart__prouducts__list__count__sum';
      itemPriceSum.innerHTML = `${myJson[productId-1].price * productCount}$`;
      document.querySelectorAll('.cart__prouducts__list')[i].append(itemPriceSum);

      let itemPriceSumSubtotal = document.createElement('div');
      itemPriceSumSubtotal.className = 'cart__prouducts__list__count__subtotal';
      itemPriceSumSubtotal.innerHTML = `${myJson[productId-1].price} $`;
      document.querySelectorAll('.cart__prouducts__list__count')[i].append(itemPriceSumSubtotal);

      document.querySelectorAll('.btn_items_right')[i].addEventListener('click', countPlus);
      document.querySelectorAll('.btn_items_left')[i].addEventListener('click', countLeft);
    }
    updateCount()
  }

  // <--- Функция увеличения
  function countPlus(e) {
    const item_id = parseInt(e.currentTarget.id.slice(16), 10);

    let newArray = cartProducts.map(i => {
      const container ={};
      container.id = i.id;

      if (i.id === item_id) {
        if (document.getElementById(`items__sum-${i.id}`).innerHTML < myJson[item_id-1].stock) {
          container.count = ++i.count;
        } else {
          container.count = i.count;
        }
      } else {
        container.count = i.count;
      }

      container.price = i.price;
      return container;
    })

    localStorage.setItem('RS-cart', JSON.stringify(newArray));
    updateCount()
  }
  // Функция увеличения --->

  // <--- Функция уменьшения
  function countLeft(e) {
    const item_id = parseInt(e.currentTarget.id.slice(15), 10);
    let newArray = []

    if (document.getElementById(`items__sum-${item_id}`).innerHTML === "1") {
      newArray = JSON.parse(localStorage.getItem("RS-cart")).filter(val => val.id != item_id);
      document.querySelector('.cart__prouducts__list__wrapper').innerHTML = '';
      updateCart()

    } else {
      newArray = cartProducts.map(i => {
        const container = {};

        container.id = i.id;

        if (i.id === item_id) {
          if (document.getElementById(`items__sum-${i.id}`).innerHTML <= myJson[item_id-1].stock) {
            container.count = --i.count;
          } else {
            container.count = i.count;
          }
        } else {
          container.count = i.count;
        }

        container.price = i.price;

        return container
      })
    }

    localStorage.setItem('RS-cart', JSON.stringify(newArray));
    updateCount()
    updateCart()
  }

  function updateCount() {
    var sumCount = 0;
    var sumPrice = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      document.querySelectorAll('.cart__prouducts__list__count__items__sum')[i].innerHTML = cartProducts[i].count;
      document.querySelectorAll('.cart__prouducts__list__count__sum')[i].innerHTML = `${myJson[cartProducts[i].id-1].price * cartProducts[i].count}$`;
      sumCount += cartProducts[i].count;
      sumPrice += cartProducts[i].count * cartProducts[i].price;
    }

    document.querySelector('.cart__summary__list__count__items').innerHTML = sumCount;
    document.querySelector('.cart__summary__list__total__sum').innerHTML = `${sumPrice}$`

    document.querySelector('.header__count').innerHTML = sumCount;
    document.querySelector('.header__cost').innerHTML = `Cart total: ${sumPrice}$`
  }
  updateCount()
  actionModal()

}

export default fillCartPage