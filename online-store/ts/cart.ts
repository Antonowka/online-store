/* eslint-disable no-inner-declarations */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import myJson from './products.json' assert {
  type: 'json'
};
import actionModal from './modal';
// let actionModal = require('./modal.js')

function fillCartPage() {
  let cartProducts = JSON.parse(localStorage.getItem("RS-cart") || '');

  updateCart()
  function updateCart() {
    cartProducts = JSON.parse(localStorage.getItem("RS-cart") || '');
    (document.querySelector('.cart__prouducts__list__wrapper') as HTMLElement).innerHTML = '';
    (document.querySelector('.cart__prouducts__list__wrapper') as HTMLElement).style.textAlign = 'none';
    if (cartProducts.length == 0) {
      (document.querySelector('.cart__prouducts__list__wrapper') as HTMLElement).style.textAlign = 'center';
      (document.querySelector('.cart__prouducts__list__wrapper') as HTMLElement).innerHTML = 'CART IS EMPTY';
    }
    for (let i = 0; i < cartProducts.length; i++) {
      let productCount = cartProducts[i].count;

      let newItem = document.createElement('div');
      newItem.className = 'cart__prouducts__list';
      (document.querySelector('.cart__prouducts__list__wrapper') as HTMLElement).append(newItem);

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
    updateDiscount()
  }

  // <--- Функция увеличения

  type LocalStorageType = {
      count: number,
      id: number,
      price: number
  }

  function countPlus(e: Event) {
    const item_id = parseInt((e.currentTarget as HTMLElement).id.slice(16), 10);

    let newArray = cartProducts.map((i: { id: number; count: number; price: number; }) => {
      const container: LocalStorageType ={
        count: 0,
        id: 0,
        price: 0
      };
      container.id = i.id;

      if (i.id === item_id) {
        if (((document.getElementById(`items__sum-${i.id}`) as HTMLElement).innerHTML as unknown as number) < myJson[item_id-1].stock) {
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
    updateDiscount()
  }
  // Функция увеличения --->

  // <--- Функция уменьшения
  function countLeft(e: Event) {
    const item_id = parseInt((e.currentTarget as HTMLElement).id.slice(15), 10);
    let newArray = []

    if ((document.getElementById(`items__sum-${item_id}`) as HTMLElement).innerHTML === "1") {
      newArray = JSON.parse((localStorage.getItem("RS-cart") || '')).filter((val: { id: number; }) => val.id != item_id);
      (document.querySelector('.cart__prouducts__list__wrapper') as HTMLElement).innerHTML = '';
      updateCart()

    } else {
      newArray = cartProducts.map((i: { id: number; count: number; price: number; }) => {
        const container: LocalStorageType = {
          count: 0,
          id: 0,
          price: 0
        };

        container.id = i.id;

        if (i.id === item_id) {
          if (((document.getElementById(`items__sum-${i.id}`) as HTMLElement).innerHTML as unknown as number) <= myJson[item_id-1].stock) {
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
    updateDiscount()
  }

  function updateCount() {
    let sumCount = 0;
    let sumPrice = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      document.querySelectorAll('.cart__prouducts__list__count__items__sum')[i].innerHTML = cartProducts[i].count;
      document.querySelectorAll('.cart__prouducts__list__count__sum')[i].innerHTML = `${myJson[cartProducts[i].id-1].price * cartProducts[i].count}$`;
      sumCount += cartProducts[i].count;
      sumPrice += cartProducts[i].count * cartProducts[i].price;
    }

    ((document.querySelector('.cart__summary__list__count__items') as HTMLElement).innerHTML as unknown as number) = sumCount;
    (document.querySelector('.cart__summary__list__total__sum') as HTMLElement).innerHTML = `${sumPrice}$`;

    ((document.querySelector('.header__count') as HTMLElement).innerHTML as unknown as number) = sumCount;
    (document.querySelector('.header__cost') as HTMLElement).innerHTML = `Cart total: ${sumPrice}$`;
  }
  updateCount()
  updateDiscount()

  if (cartProducts.length > 0) {
    const btn_buy_now: HTMLButtonElement | null = document.querySelector('.btn__buynow');
    (btn_buy_now as HTMLButtonElement).addEventListener('click', showModalWindow);
    const transparentModal: HTMLElement  | null= document.querySelector('.transparent__modal');
    (transparentModal as HTMLElement).addEventListener('click', closeModalWindow);
    const modalWindow: HTMLElement | null = document.querySelector('.purchase__modal');

    function showModalWindow() {
      (transparentModal as HTMLElement).style.display = 'block';
      (modalWindow as HTMLElement).style.display = 'flex';
    }

    function closeModalWindow() {
      (transparentModal as HTMLElement).style.display = 'none';
      (modalWindow as HTMLElement).style.display = 'none';
    }

    actionModal()
  }

  // DISCOUNT START
  const promoInput: HTMLInputElement | null = document.querySelector('.promo__input');
  (promoInput as HTMLInputElement).addEventListener('input', getPromo);
  const promoBtnAdd1: HTMLButtonElement | null = document.querySelector('.btn__promo__add1');
  (promoBtnAdd1 as HTMLButtonElement).addEventListener('click', letDiscount);
  const promoBtnAdd2: HTMLButtonElement | null = document.querySelector('.btn__promo__add2');
  (promoBtnAdd2 as HTMLButtonElement).addEventListener('click', letDiscount);
  const promoBtnDrop1: HTMLButtonElement | null = document.querySelector('.btn__promo__drop1');
  (promoBtnDrop1 as HTMLButtonElement).addEventListener('click', leaveDiscount1);
  const promoBtnDrop2: HTMLButtonElement | null = document.querySelector('.btn__promo__drop2');
  (promoBtnDrop2 as HTMLButtonElement).addEventListener('click', leaveDiscount2);
  (document.querySelector('.promo__wrapper__apply1') as HTMLElement).style.display = 'none';
  (document.querySelector('.promo__wrapper__apply2') as HTMLElement).style.display = 'none';
  (document.querySelector('.promo__wrapper1') as HTMLElement).style.display = 'none';
  (document.querySelector('.promo__wrapper2') as HTMLElement).style.display = 'none';

  function getPromo() {
    if ((promoInput as HTMLInputElement).value == 'rs' && (document.querySelector('.promo__wrapper__apply1') as HTMLElement).style.display == 'none') {
      (document.querySelector('.promo__wrapper1') as HTMLElement).style.display = 'flex';
    } else {
      if ((promoInput as HTMLInputElement).value == 'sr' && (document.querySelector('.promo__wrapper__apply2') as HTMLElement).style.display == 'none') {
        (document.querySelector('.promo__wrapper2') as HTMLElement).style.display = 'flex';
      } else {
        (document.querySelector('.promo__wrapper1') as HTMLElement).style.display = 'none';
        (document.querySelector('.promo__wrapper2') as HTMLElement).style.display = 'none';
      }
    }
  }

  function letDiscount() {
    (promoInput as HTMLInputElement).value = '';
    if ((document.querySelector('.promo__wrapper1') as HTMLElement).style.display == 'flex') {
      (document.querySelector('.promo__wrapper__apply1') as HTMLElement).style.display = 'flex';
      (document.querySelector('.promo__wrapper1') as HTMLElement).style.display = 'none';
      (document.querySelector('.cart__summary__list__total') as HTMLElement).style.textDecoration = 'line-through';
      (document.querySelector('.cart__summary__list__total__disc') as HTMLElement).style.display = 'flex';
    } else {
      (document.querySelector('.promo__wrapper__apply2') as HTMLElement).style.display = 'flex';
      (document.querySelector('.promo__wrapper2') as HTMLElement).style.display = 'none';
      (document.querySelector('.cart__summary__list__total') as HTMLElement).style.textDecoration = 'line-through';
      (document.querySelector('.cart__summary__list__total__disc') as HTMLElement).style.display = 'flex';
    }
    updateDiscount();
  }

  function leaveDiscount1() {
    (document.querySelector('.promo__wrapper__apply1') as HTMLElement).style.display = 'none';
    if ((document.querySelector('.promo__wrapper__apply2') as HTMLElement).style.display == 'none') {
      (document.querySelector('.cart__summary__list__total') as HTMLElement).style.textDecoration = 'none';
      (document.querySelector('.cart__summary__list__total__disc') as HTMLElement).style.display = 'none';
    }
    updateDiscount()
  }
  function leaveDiscount2() {
    (document.querySelector('.promo__wrapper__apply2') as HTMLElement).style.display = 'none';
    if ((document.querySelector('.promo__wrapper__apply1') as HTMLElement).style.display == 'none') {
      (document.querySelector('.cart__summary__list__total') as HTMLElement).style.textDecoration = 'none';
      (document.querySelector('.cart__summary__list__total__disc') as HTMLElement).style.display = 'none';
    }
    updateDiscount()
  }

  function updateDiscount() {
    let currentSumPrice = parseInt((document.querySelector('.cart__summary__list__total__sum') as HTMLElement).innerHTML.slice(0, -1), 10);
    let newSumPrice = 0
    if ((document.querySelector('.promo__wrapper__apply1') as HTMLElement).style.display =='flex' && (document.querySelector('.promo__wrapper__apply2') as HTMLElement).style.display == 'flex') {
      newSumPrice = currentSumPrice*0.8
    } else {
      newSumPrice = currentSumPrice*0.9
    }
    (document.querySelector('.cart__summary__list__total__sum__disc') as HTMLElement).innerHTML = `${newSumPrice.toFixed(0)}$`
  }
  // DISCOUNT END
}

export default fillCartPage