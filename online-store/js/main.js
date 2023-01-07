// CREATE products item from products.js
import updateHeader from './updateCart.js'
import viewmode from './view-mode.js'

function createProducts() {
  const userCardTemplate = document.querySelector("[data-user-template]")
  const userCardContainer = document.querySelector("[data-user-cards-container]")
  const searchInput = document.querySelector("[data-search]")

  let products = []

  searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    products.forEach(product => {
      const isVisible = product.name.toLowerCase().includes(value)
      product.element.classList.toggle("hide", !isVisible)
    })
  })

  const checkboxes = document.querySelectorAll('.filter-input')

  fetch('../js/products.json')
    .then(res => res.json())
    .then(data => {
      products = data.map(product => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const info = card.querySelector("[data-name]")
        const cost = card.querySelector("[data-cost]")
        const src = card.querySelector("[data-src]")
        const href = card.querySelector("[data-href]")
        const btn_add = card.querySelector("[data-btn-add]")
        const btn_buy_now = card.querySelector("[data-btn-buy-now]")
        info.textContent = product.name
        cost.innerHTML = product.price + ' $';
        src.src = product.thumbnail;
        href.href = `#item-${product.id}`;
        userCardContainer.append(card)
        btn_add.id = `btn-add-${product.id}`;
        btn_buy_now.id = `btn-buy-now-${product.id}`;

        btn_add.addEventListener('click', () => {
          btn_add.classList.toggle('button-active')
        })

        for (let i = 0; i < checkboxes.length; i++) {
          const checkbox = checkboxes[i];
          checkbox.addEventListener('click', sortCheckbox)

          function sortCheckbox() {
            if (checkbox.value === product.category || checkbox.value === product.brand) {
              info.textContent = product.name
              cost.innerHTML = product.price + ' $';
              src.src = product.thumbnail
            } else if (checkbox.checked !== true) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        }
        return {
          name: product.name,
          element: card
        }
      })

      // <<<--- Добавление товара в корзину
      // Добавление товара в корзину --->>>
      let cartProducts = [];

      if (localStorage.getItem("RS-cart") === null) {
        localStorage.setItem('RS-cart', JSON.stringify([]));
      }

      cartProducts = JSON.parse(localStorage.getItem("RS-cart"));

      for (let i = 0; i < cartProducts.length; i++) {
        document.getElementById(`btn-add-${cartProducts[i].id}`).innerHTML = 'Drop item';
      }

      for (let i = 0; i < products.length; i++) {
        document.querySelectorAll('.button__add')[i].addEventListener('click', addToCart);
      }

      function addToCart(e) {

        const item_id = parseInt(e.currentTarget.id.slice(8), 10);
        if (document.getElementById(`btn-add-${item_id}`).innerHTML === "Add to cart") {
          document.getElementById(`btn-add-${item_id}`).innerHTML = "Drop item";
          cartProducts.push({
            id: item_id,
            count: 1,
            price: data[item_id - 1].price
          })
          localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
        } else {
          document.getElementById(`btn-add-${item_id}`).innerHTML = "Add to cart";
          cartProducts = cartProducts.filter(value => value.id != item_id)
          localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
        }
        updateHeader()
      }
    })
}

export {createProducts, viewmode}