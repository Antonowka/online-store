import myJson from './products.json' assert {
  type: 'json'
};

const products = myJson;
const sotring: HTMLElement | null = document.querySelector('.sort-menu');
const priceLowest: HTMLElement | null = document.querySelector('.price-lowest');
const priceHighest: HTMLElement | null = document.querySelector('.price-highest');
const ratingLowest: HTMLElement | null = document.querySelector('.rating-lowest');
const ratingHighest: HTMLElement | null = document.querySelector('.rating-highest');
const nameAz: HTMLElement | null = document.querySelector('.name-az');
const nameZa: HTMLElement | null = document.querySelector('.name-za');
const productContainer: HTMLElement | null = document.querySelector('.products-container');

(sotring as HTMLElement).addEventListener("change", () => {
  if((priceLowest as HTMLOptionElement).selected === true){
    products.sort((a, b) => a.price - b.price);
    (productContainer as HTMLElement).innerHTML = '';
    newProduct()
  }else if((priceHighest as HTMLOptionElement).selected === true){
    products.sort((a, b) => b.price - a.price);
    (productContainer as HTMLElement).innerHTML = '';
    newProduct()
  }else if((ratingLowest as HTMLOptionElement).selected === true){
    products.sort((a, b) => a.rating - b.rating);
    (productContainer as HTMLElement).innerHTML = '';
    newProduct()
  }else if((ratingHighest as HTMLOptionElement).selected === true){
    products.sort((a, b) => b.rating - a.rating);
    (productContainer as HTMLElement).innerHTML = '';
    newProduct()
  }else if((nameAz as HTMLOptionElement).selected === true){
    products.sort((a, b) => a.name > b.name ? 1 : -1);
    (productContainer as HTMLElement).innerHTML = '';
    newProduct()
  }else if((nameZa as HTMLOptionElement).selected === true){
    products.sort((a, b) => a.name > b.name ? -1 : 1);
    (productContainer as HTMLElement).innerHTML = '';
    newProduct()
  }
});


 function newProduct () {
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    const productContainer: HTMLElement | null = document.querySelector('.products-container')

    const newProduct = document.createElement('div');
    newProduct.className = 'product-item';
    (productContainer as HTMLElement).append(newProduct)

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

    const productCost: HTMLElement | null = document.createElement('span');
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
    ((productCost as HTMLElement).innerHTML as unknown as number) = element.price;
    productItemImage.src = element.thumbnail
  }
}
newProduct()
