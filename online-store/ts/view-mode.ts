function viewProducts(){
  const viewBox: HTMLElement | null = document.querySelector('.view-box');
  const productContainer = document.querySelector('[data-user-cards-container]');

  (viewBox as HTMLElement).addEventListener('click', () =>{
    (viewBox as HTMLElement).classList.toggle('active');
    (productContainer as Element).classList.toggle('active');
  })
}

export default viewProducts