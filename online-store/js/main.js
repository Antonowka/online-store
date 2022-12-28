import myJson from './products.json' assert {
  type: 'json'
};

// CREATE products item from products.js

function createProducts() {
  const products = myJson.products;
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    const productContainer = document.querySelector('.products-container')

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
    productPrice.className = 'product-price';
    productItemInfo.append(productPrice)

    const productCost = document.createElement('span');
    productCost.className = 'product-cost'
    productPrice.append(productCost)

    const productItemImageContainer = document.createElement('div');
    productItemImageContainer.className = 'product-item__image_container';
    newProduct.append(productItemImageContainer)

    const productItemImageLink = document.createElement('a');
    productItemImageLink.href = `#item-${i+1}`;
    productItemImageContainer.append(productItemImageLink);

    const productItemImage = document.createElement('img');
    productItemImage.className = 'product-item__image';
    productItemImageLink.append(productItemImage);

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

    // const category = element.category
    // if (category === 'smartphones') {
    //   productName.innerHTML = element.name;
    //   productCost.innerHTML = element.price + ' $';
    //   productItemImage.src = element.thumbnail;
    // } else if (category === 'laptops') {
    //   productName.innerHTML = element.name;
    //   productCost.innerHTML = element.price + ' $';
    //   productItemImage.src = element.thumbnail;
    // } else {
    //   newProduct.style.display = 'none';
    // }
    productName.innerHTML = element.name;
    productCost.innerHTML = element.price + ' $';
    productItemImage.src = element.thumbnail;
  }
}
createProducts()



// const categoryy = function () {
//   const category = element.category


// }
// categoryy()
// function liberty() {
//   const asd = document.getElementById('category-0')
//   console.log(asd);
//   if (asd === true) {
//     element.category === 'smartphone'
//   }
// }

export default createProducts