function dualInputRange(){
  const rangeInputPrice = document.querySelectorAll(".range-input__price input"),
  inputPrice = document.querySelectorAll(".price-input input"),
  rangePrice = document.querySelector(".slider-price .progress-price");
  let priceGap = 0;
  // Price
  inputPrice.forEach(input =>{
      input.addEventListener("input", e =>{
          let minPrice = parseInt(inputPrice[0].value),
          maxPrice = parseInt(inputPrice[1].value);
          
          if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInputPrice[1].max){
              if(e.target.className === "input-min"){
                  rangeInputPrice[0].value = minPrice;
                  rangePrice.style.left = ((minPrice / rangeInputPrice[0].max) * 100) + "%";
              }else{
                  rangeInputPrice[1].value = maxPrice;
                  rangePrice.style.right = 100 - (maxPrice / rangeInputPrice[1].max) * 100 + "%";
              }
          }
      });
  });
  rangeInputPrice.forEach(input =>{
      input.addEventListener("input", e =>{
          let minVal = parseInt(rangeInputPrice[0].value),
          maxVal = parseInt(rangeInputPrice[1].value);
          if((maxVal - minVal) < priceGap){
              if(e.target.className === "range-min"){
                  rangeInputPrice[0].value = maxVal - priceGap
              }else{
                  rangeInputPrice[1].value = minVal + priceGap;
              }
          }else{
              inputPrice[0].value = minVal;
              inputPrice[1].value = maxVal;
              rangePrice.style.left = ((minVal / rangeInputPrice[0].max) * 100) + "%";
              rangePrice.style.right = 100 - (maxVal / rangeInputPrice[1].max) * 100 + "%";
          }
      });
  });
  // Stock
  const rangeInputStock = document.querySelectorAll(".range-input__stock input"),
  inputStock = document.querySelectorAll(".stock-input input"),
  rangeStock = document.querySelector(".slider-stock .progress-stock");
  inputStock.forEach(input =>{
      input.addEventListener("input", e =>{
          let minPrice = parseInt(inputStock[0].value),
          maxPrice = parseInt(inputStock[1].value);
          
          if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInputStock[1].max){
              if(e.target.className === "input-min"){
                  rangeInputStock[0].value = minPrice;
                  rangeStock.style.left = ((minPrice / rangeInputStock[0].max) * 100) + "%";
              }else{
                  rangeInputStock[1].value = maxPrice;
                  rangeStock.style.right = 100 - (maxPrice / rangeInputStock[1].max) * 100 + "%";
              }
          }
      });
  });
  rangeInputStock.forEach(input =>{
      input.addEventListener("input", e =>{
          let minVal = parseInt(rangeInputStock[0].value),
          maxVal = parseInt(rangeInputStock[1].value);
          if((maxVal - minVal) < priceGap){
              if(e.target.className === "range-min"){
                  rangeInputStock[0].value = maxVal - priceGap
              }else{
                  rangeInputStock[1].value = minVal + priceGap;
              }
          }else{
              inputStock[0].value = minVal;
              inputStock[1].value = maxVal;
              rangeStock.style.left = ((minVal / rangeInputStock[0].max) * 100) + "%";
              rangeStock.style.right = 100 - (maxVal / rangeInputStock[1].max) * 100 + "%";
          }
      });
  });
}
dualInputRange()

export default dualInputRange