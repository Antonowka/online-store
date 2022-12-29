import myJson from './products.json' assert {
  type: 'json'
};

const products = myJson;

function fillDetailPage() {
  const productId = parseInt(document.location.hash.slice(6), 10);

  const productName = products[productId-1].name;
  document.querySelector('.detail__title').append(productName);

  const productDscr = products[productId-1].description;
  document.querySelector('.detail__main__dscr').append(productDscr);

  const productDiscount = products[productId-1].discountPercentage;
  document.querySelector('.detail__main__discount').append(`${productDiscount} %`);

  const productRating = products[productId-1].rating;
  document.querySelector('.detail__main__rating').append(productRating);

  const productStock = products[productId-1].stock;
  document.querySelector('.detail__main__stock').append(productStock);

  const productBrand = products[productId-1].brand;
  document.querySelector('.detail__main__brand').append(productBrand);

  const productCategory = products[productId-1].category;
  document.querySelector('.detail__main__category').append(productCategory);

  const productPrice = products[productId-1].price;
  document.querySelector('.detail__main__price').append(`${productPrice} $`);

  const productThumb = products[productId-1].thumbnail;
  document.querySelector('.detail__main__photo__big').style.backgroundImage = `url('${productThumb}')`;

  for (let i = 0; i < products[productId-1].images.length; i++) {
    const newSmallPhoto = document.createElement('div');
    newSmallPhoto.className = 'detail__main__photo__carousel__item';
    newSmallPhoto.style.backgroundImage = `url('${products[productId-1].images[i]}')`;
    document.querySelector('.detail__main__photo__carousel').append(newSmallPhoto);
  }
}

export default fillDetailPage