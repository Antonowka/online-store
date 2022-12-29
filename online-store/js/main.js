// CREATE products item from products.js

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
        info.textContent = product.name
        cost.innerHTML = product.price + ' $';
        src.src = product.thumbnail;
        href.href = `#item-${product.id}`;
        userCardContainer.append(card)

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
    })
}

export default createProducts