// CREATE products item from products.js
import updateHeader from './updateCart'
import viewmode from './view-mode'
import dualInputRange from './input-dual-range'

const string = (a: string, b: string, dir: number ): string | number | boolean => a?.localeCompare(b) * dir
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
type IProduct = {
  name: string;
  price: number;
  thumbnail: string;
  id: number;
  rating: string;
  stock: number;
}

function createProducts() {
  const userCardTemplate = document.querySelector("[data-user-template]")
  const userCardContainer = document.querySelector("[data-user-cards-container]")
  const searchInput = document.querySelector("[data-search]")
  const sorting = document.querySelector('.sort-menu')
  const productContainer = document.querySelector('.products-container')

  function renderProducts(products: Array<IProduct>): void {
    let filteredProducts = products;
    (productContainer as HTMLElement).innerHTML = ''

    filteredProducts.forEach((product: IProduct) => {
      const card = ((userCardTemplate as HTMLTemplateElement).content.cloneNode(true) as HTMLElement).children[0];
      const info = card.querySelector("[data-name]");
      const cost = card.querySelector("[data-cost]");
      const src = card.querySelector("[data-src]");
      const href = card.querySelector("[data-href]");
      const btn_add = card.querySelector("[data-btn-add]");
      const rating = card.querySelector("[data-rating]");
      const stock = card.querySelector("[data-stock]");
      (info as HTMLElement).textContent = product.name;
      (cost as HTMLElement).innerHTML = product.price + ' $';
      (src as HTMLImageElement).src = product.thumbnail;
      (href as HTMLAnchorElement).href = `#item-${product.id}`;
      (rating as HTMLElement).innerHTML = product.rating;
      (stock as HTMLElement).innerHTML = `Stock: ${product.stock}`;
      (userCardContainer as HTMLElement).append(card);
      (btn_add as HTMLElement).id = `btn-add-${product.id}`;
    })
  }

  fetch('../js/products.json')
    .then(res => res.json())
    .then((data: IProduct) => {
      (productsRaw as unknown as IProduct) = data
      renderProducts((productsRaw as unknown as Array<IProduct>))

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

      function addToCart(e: Event): void {
        const item_id = parseInt((e.currentTarget as HTMLElement).id.slice(8), 10);
        if ((document.getElementById(`btn-add-${item_id}`) as HTMLElement).innerHTML === "Add to cart") {
          (document.getElementById(`btn-add-${item_id}`) as HTMLElement).innerHTML = "Drop item";
          (document.getElementById(`btn-add-${item_id}`) as HTMLElement).classList.toggle("drop-active");
          cartProducts.push({
            id: (item_id as unknown as string),
            count: 1,
            price: data[item_id - 1].price
          })
          localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
        } else {
          (document.getElementById(`btn-add-${item_id}`) as HTMLElement).innerHTML = "Add to cart";
          cartProducts = cartProducts.filter((value: { id: unknown | number; }) => value.id != item_id)
          localStorage.setItem('RS-cart', JSON.stringify(cartProducts));
          (document.getElementById(`btn-add-${item_id}`) as HTMLElement).classList.remove("drop-active");
        }
        updateHeader()
      }

      // SORTING
      (sorting as HTMLSelectElement).addEventListener("change", (event: Event) => {
        const [sortBy, sortByDirection] = ((event.target as HTMLSelectElement).value).split('-')

          const sortFn: any = (sortFnByField as unknown as string)[(sortBy as unknown as number)] ?? sortFnByField.default
          const dir: any = sortByDirection === 'asc' ? 1 : -1

          const ary = filteredProducts.sort((a, b) => {
            return sortFn((a as unknown as string)[(sortBy as unknown as number)], (b as unknown as string)[(sortBy  as unknown as number)], dir)
          })

          renderProducts((ary as unknown as Array<IProduct>))
      });

      // search
      (searchInput as HTMLInputElement).addEventListener("input", e => {
        const value = ((e.target as HTMLInputElement).value).trim().toLowerCase()
        if (!value) return renderProducts((productsRaw as unknown as Array<IProduct>))

        const ary = productsRaw.filter(product => (product as unknown as IProduct).name.toLowerCase().includes(value))
        renderProducts((ary as unknown as Array<IProduct>))
      })

      // filter
      const checkboxes = document.querySelectorAll('.filter-input')
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
          const checked = Array.from(checkboxes).filter(checkbox => (checkbox as HTMLInputElement).checked)

          if (!checked.length) return renderProducts((productsRaw as unknown as Array<IProduct>))
          const filters = checked.reduce((acc, curr) => {
              if (!acc[curr.dataset.filter]) {
                acc[(curr as HTMLElement).dataset.filter] = []
              }

              acc[(curr as HTMLElement).dataset.filter].push((curr as unknown as HTMLElement)).value

              return acc
          }, ({} as unknown as string))
          
          const ary: HTMLElement[] = productsRaw.filter(product => {
            return Object.keys(filters).every(filter => {
              return (filters as string)[(filter as unknown as number)].includes((product as unknown as string)[(filter as unknown as number)])
            })
          })
          renderProducts((ary as unknown as Array<IProduct>))
        })
      })
    })
}


export {createProducts, viewmode, dualInputRange}