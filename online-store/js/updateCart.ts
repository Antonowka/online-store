
function updateHeader() {
  if (localStorage.getItem('RS-cart') === null) {
    localStorage.setItem('RS-cart', JSON.stringify([ ]));
  }

  let cartProducts = JSON.parse(localStorage.getItem("RS-cart") || '');
  let sumCount = 0;
  let sumPrice = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    sumCount += cartProducts[i].count;
    sumPrice += cartProducts[i].count * cartProducts[i].price;
  }
  ((document.querySelector('.header__count') as HTMLElement).innerHTML as unknown as number) = sumCount;
  (document.querySelector('.header__cost') as HTMLElement).innerHTML = `Cart total: ${sumPrice}$`;
}
updateHeader()

export default updateHeader