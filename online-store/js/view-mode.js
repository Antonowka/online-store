function viewProducts(){
  const viewBox = document.querySelector('.view-box')
  const productContainer = document.querySelector('[data-user-cards-container]')

  viewBox.addEventListener('click', () =>{
    viewBox.classList.toggle('active')
    productContainer.classList.toggle('active')
  })
}

export default viewProducts