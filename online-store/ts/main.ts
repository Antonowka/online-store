// CREATE products item from products.js
import updateHeader from './updateCart.js'
import viewmode from './view-mode.js'
import dualInputRange from './input-dual-range.js'

const string = (a: string, b: string, dir: number = 1): string | number => a?.localeCompare(b) * dir
const number = (a: number, b: number, dir: number = 1) => (a - b) * dir

const sortFnByField = {
  default: () => 0,
  price: number,
  rating: number,
  name: string,
  id: number,
  stock: number,
}

let productsRaw: Array<HTMLElement> = []
let filteredProducts: Array<Element> = []

function createProducts() {
  const userCardTemplate = document.querySelector("[data-user-template]")
  const userCardContainer = document.querySelector("[data-user-cards-container]")
  const searchInput = document.querySelector("[data-search]")
  const sorting = document.querySelector('.sort-menu')
  const productContainer = document.querySelector('.products-container')

  function renderProducts(products: ReadonlyArray<string>) {
    let filteredProducts = products
    (productContainer as HTMLElement).innerHTML = ''

    filteredProducts.forEach(product => {
      const card = (userCardTemplate as HTMLElement).content.cloneNode(true).children[0]
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
      (userCardContainer as HTMLElement).append(card)
      btn_add.id = `btn-add-${product.id}`;
    })
  }


  fetch('../js/products.json')
    .then(res => res.json())
    .then(data => {
      productsRaw = data
      renderProducts(productsRaw)

      // <<<--- Добавление товара в корзину Добавление товара в корзину --->>>
      let cartProducts: Array<HTMLElement> = [];
      localStorage:
      if (localStorage.getItem("RS-cart") === null) {
        localStorage.setItem('RS-cart', JSON.stringify([]));
      }

      cartProducts = JSON.parse(localStorage.getItem("RS-cart") || '');

      for (let i = 0; i < cartProducts.length; i++) {
        (document.getElementById(`btn-add-${cartProducts[i].id}`) as HTMLElement).innerHTML = 'Drob item';
        (document.getElementById(`btn-add-${cartProducts[i].id}`) as HTMLElement).classList.toggle("drop-active");
      }

      for (let i = 0; i < productsRaw.length; i++) {
        document.querySelectorAll('.button__add')[i].addEventListener('click', addToCart);
      }

      function addToCart(e: Event) {
        const item_id = parseInt((e.currentTarget as HTMLElement).id.slice(8), 10);
        if ((document.getElementById(`btn-add-${item_id}`) as HTMLElement).innerHTML === "Add to cart") {
          (document.getElementById(`btn-add-${item_id}`) as HTMLElement).innerHTML = "Drop item";
          (document.getElementById(`btn-add-${item_id}`) as HTMLElement).classList.toggle("drop-active");
          cartProducts.push({
            id: item_id,
            count: 1,
            price: data[item_id - 1].price
          })
          localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
        } else {
          (document.getElementById(`btn-add-${item_id}`) as HTMLElement).innerHTML = "Add to cart";
          cartProducts = cartProducts.filter((value: { id: number; }) => value.id != item_id)
          localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
          (document.getElementById(`btn-add-${item_id}`) as HTMLElement).classList.remove("drop-active");
        }
        updateHeader()
      }

      // SORTING
      (sorting as HTMLSelectElement).addEventListener("change", (event: Event) => {
        const [sortBy, sortByDirection] = ((event.target as HTMLSelectElement).value).split('-')

          const sortFn = sortFnByField[sortBy] ?? sortFnByField.default
          const dir = sortByDirection === 'asc' ? 1 : -1

          const ary = filteredProducts.sort((a, b) => {
            return sortFn(a[sortBy], b[sortBy], dir)
          })

          renderProducts(ary)
      });

      // search
      (searchInput as HTMLInputElement).addEventListener("input", e => {
        const value = ((e.target as HTMLInputElement).value).trim().toLowerCase()
        if (!value) return renderProducts(productsRaw)

        const ary = productsRaw.filter(product => product.name.toLowerCase().includes(value))
        renderProducts(ary)
      })

      // filter
      const checkboxes = document.querySelectorAll('.filter-input')
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
          const checked = Array.from(checkboxes).filter(checkbox => checkbox.checked)

          if (!checked.length) return renderProducts(productsRaw)

          const filters = checked.reduce((acc, curr) => {
              if (!acc[curr.dataset.filter]) {
                acc[curr.dataset.filter] = []
              }

              acc[curr.dataset.filter].push(curr.value)

              return acc
          }, {})

          const ary = productsRaw.filter(product => {
            return Object.keys(filters).every(filter => {
              return filters[filter].includes(product[filter])
            })
          })
          renderProducts(ary)
        })
      })
    })
}


export {createProducts, viewmode, dualInputRange}