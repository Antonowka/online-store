import products from './products.js'

// CREATE products item from products.js

const newProduct = function () {
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    const productContainer = document.querySelector('.products-container')
    // const productCategory = document.querySelector('.products-container')

    const newProduct = document.createElement('div');
    newProduct.className = 'product-item';
    productContainer.append(newProduct)

    const productItemInfo = document.createElement('div');
    productItemInfo.className = 'product-item__info'
    newProduct.append(productItemInfo)

    const productName = document.createElement('h3');
    productName.className = 'product-name';
    productItemInfo.append(productName)

    const productPrice = document.createElement('p');
    // productPrice.innerHTML = "Price: ";
    productPrice.className = 'product-price';
    productItemInfo.append(productPrice)

    const productCost = document.createElement('span');
    productCost.className = 'product-cost'
    productPrice.append(productCost)

    const productItemImage = document.createElement('img');
    productItemImage.className = 'product-item__image';
    newProduct.append(productItemImage)

    const productButtons = document.createElement('div');
    productButtons.className = 'product-buttons';
    newProduct.append(productButtons)

    const buttonAdd = document.createElement('button');
    buttonAdd.innerHTML = "add to cart";
    buttonAdd.className = 'button';
    productButtons.append(buttonAdd)

    const buttonBuy = document.createElement('button');
    buttonBuy.innerHTML = "by now";
    buttonBuy.className = 'button';
    productButtons.append(buttonBuy)

    productName.innerHTML = element.name;
    productCost.innerHTML = element.price;
    productItemImage.src = element.image
  
  }
}
newProduct()



// const categoryy = function () {
//   const category = element.category
//   if (category === 'smartphonez') {
//     productName.innerHTML = element.name;
//     productCost.innerHTML = element.price;
//     productItemImage.src = element.image
//   } else if (category === 'smartphonev'){
//     productName.innerHTML = element.name;
//     productCost.innerHTML = element.price;
//     productItemImage.src = element.image
//   } else {
//     newProduct.style.display = 'none';
//   }
  
// }
// categoryy()
// function liberty() {
//   const asd = document.getElementById('category-0')
//   console.log(asd);
//   if (asd === true) {
//     element.category === 'smartphone'
//   }
// }