
function updateHeader() {
  let cartProducts = JSON.parse(localStorage.getItem("RS-cart"));
  let sumCount = 0;
  let sumPrice = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    sumCount += cartProducts[i].count;
    sumPrice += cartProducts[i].count * cartProducts[i].price;
  }
  document.querySelector('.header__count').innerHTML = sumCount;
  document.querySelector('.header__cost').innerHTML = `Cart total: ${sumPrice}$`;
}
updateHeader()

export default updateHeader