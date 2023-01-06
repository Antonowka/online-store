import myJson from './products.json' assert {
  type: 'json'
};

const products = myJson;
const sotring = document.querySelector('.sort-menu')
const priceLowest = document.querySelector('.price-lowest')
const priceHighest = document.querySelector('.price-highest')
const ratingLowest = document.querySelector('.rating-lowest')
const ratingHighest = document.querySelector('.rating-highest')
const nameAz = document.querySelector('.name-az')
const nameZa = document.querySelector('.name-za')
const productContainer = document.querySelector('.products-container')

sotring.addEventListener("change", () => {
  if(priceLowest.selected === true){
    products.sort((a, b) => a.price - b.price);
    productContainer.innerHTML = '';
    newProduct()
  }else if(priceHighest.selected === true){
    products.sort((a, b) => b.price - a.price);
    productContainer.innerHTML = '';
    newProduct()
  }else if(ratingLowest.selected === true){
    products.sort((a, b) => a.rating - b.rating);
    productContainer.innerHTML = '';
    newProduct()
  }else if(ratingHighest.selected === true){
    products.sort((a, b) => b.rating - a.rating);
    productContainer.innerHTML = '';
    newProduct()
  }else if(nameAz.selected === true){
    products.sort((a, b) => a.name > b.name ? 1 : -1);
    productContainer.innerHTML = '';
    newProduct()
  }else if(nameZa.selected === true){
    products.sort((a, b) => a.name > b.name ? -1 : 1);
    productContainer.innerHTML = '';
    newProduct()
  }
});


 function newProduct () {
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
    productItemImage.src = element.thumbnail
  }
}
newProduct()
