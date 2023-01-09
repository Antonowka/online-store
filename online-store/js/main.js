// CREATE products item from products.js
import updateHeader from './updateCart.js'
import viewmode from './view-mode.js'
import dualInputRange from './input-dual-range.js'

const string = (a, b, dir = 1) => a?.localeCompare(b) * dir
const number = (a, b, dir = 1) => (a - b) * dir

const sortFnByField = {
  default: () => 0,
  price: number,
  rating: number,
  name: string,
}

function createProducts() {
  const userCardTemplate = document.querySelector("[data-user-template]")
  const userCardContainer = document.querySelector("[data-user-cards-container]")
  const searchInput = document.querySelector("[data-search]")
  const sorting = document.querySelector('.sort-menu')
  const productContainer = document.querySelector('.products-container')
  const checkboxes = document.querySelectorAll('.filter-input')

  function renderProducts(products) {
    console.log('renderProducts', products)
    productContainer.innerHTML = ''
    // render product list as HTML here
    products.forEach(product => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const info = card.querySelector("[data-name]")
      const cost = card.querySelector("[data-cost]")
      const src = card.querySelector("[data-src]")
      const href = card.querySelector("[data-href]")
      const btn_add = card.querySelector("[data-btn-add]")
      const rating = card.querySelector("[data-rating]")
      const stock = card.querySelector("[data-stock]")
      info.textContent = product.name
      cost.innerHTML = product.price + ' $';
      src.src = product.thumbnail;
      href.href = `#item-${product.id}`;
      rating.innerHTML = product.rating;
      stock.innerHTML = `Stock: ${product.stock}`;
      userCardContainer.append(card)
      btn_add.id = `btn-add-${product.id}`;

      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        checkbox.addEventListener('click', sortCheckbox)

        function sortCheckbox() {
          if (checkbox.value === product.category || checkbox.value === product.brand) {
            info.textContent = product.name
            cost.innerHTML = product.price + ' $';
            src.src = product.thumbnail
          } else if (!checkbox.checked) {
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
  }

  
  fetch('../js/products.json')
    .then(res => res.json())
    .then(data => {
      // Use renderProducts() functions to render the products here
      const productsRaw = data
      renderProducts(productsRaw)

      // <<<--- Добавление товара в корзину Добавление товара в корзину --->>>
      let cartProducts = [];

      if (localStorage.getItem("RS-cart") === null) {
        localStorage.setItem('RS-cart', JSON.stringify([]));
      }

      cartProducts = JSON.parse(localStorage.getItem("RS-cart"));

      for (let i = 0; i < cartProducts.length; i++) {
        document.getElementById(`btn-add-${cartProducts[i].id}`).innerHTML = 'Drob item';
        document.getElementById(`btn-add-${cartProducts[i].id}`).classList.toggle("drop-active");
      }

      for (let i = 0; i < productsRaw.length; i++) {
        document.querySelectorAll('.button__add')[i].addEventListener('click', addToCart);
      }

      function addToCart(e) {

        const item_id = parseInt(e.currentTarget.id.slice(8), 10);
        if (document.getElementById(`btn-add-${item_id}`).innerHTML === "Add to cart") {
          document.getElementById(`btn-add-${item_id}`).innerHTML = "Drop item";
          document.getElementById(`btn-add-${item_id}`).classList.toggle("drop-active");
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
          document.getElementById(`btn-add-${item_id}`).classList.remove("drop-active");
        }
        updateHeader()
      }

      // SORTING
      sorting.addEventListener("change", (event) => {
        const [sortBy, sortByDirection] = event.target.value.split('-')

          const sortFn = sortFnByField[sortBy] ?? sortFnByField.default
          const dir = sortByDirection === 'asc' ? 1 : -1
      
          const ary = productsRaw.sort((a, b) => {      
            return sortFn(a[sortBy], b[sortBy], dir)
          })

          renderProducts(ary)
      });

      // search
      searchInput.addEventListener("input", e => {
        const value = e.target.value.trim().toLowerCase()
        const arr = productsRaw.filter(product => product.name.toLowerCase().includes(value))
        renderProducts(arr)
      })
    })
}


export {createProducts, viewmode, dualInputRange}