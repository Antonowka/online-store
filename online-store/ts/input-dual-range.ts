function dualInputRange(){
  const rangeInputPrice = document.querySelectorAll(".range-input__price input"),
  inputPrice = document.querySelectorAll(".price-input input"),
  rangePrice = document.querySelector(".slider-price .progress-price");
  let priceGap = 0;

  // Price
  inputPrice.forEach(input =>{
      input.addEventListener("input", e =>{
          let minPrice = parseInt((inputPrice[0] as HTMLInputElement).value),
          maxPrice = parseInt((inputPrice[1] as HTMLInputElement).value);

          if((maxPrice - minPrice >= priceGap) && maxPrice <= ((rangeInputPrice[1] as HTMLInputElement).max as unknown as number)){
              if((e.target as HTMLElement).className === "input-min"){
                  ((rangeInputPrice[0] as HTMLInputElement).value as unknown as number) = minPrice;
                  (rangePrice as HTMLElement).style.left = ((minPrice / ((rangeInputPrice[0] as HTMLInputElement).max as unknown as number)) * 100) + "%";
              }else{
                  ((rangeInputPrice[1] as HTMLInputElement).value as unknown as number) = maxPrice;
                  (rangePrice as HTMLElement).style.right = 100 - (maxPrice / ((rangeInputPrice[1] as HTMLInputElement).max as unknown as number)) * 100 + "%";
              }
          }
      });
  });
  rangeInputPrice.forEach(input =>{
      input.addEventListener("input", e =>{
          let minVal = parseInt((rangeInputPrice[0] as HTMLInputElement).value),
          maxVal = parseInt((rangeInputPrice[1] as HTMLInputElement).value);
          if((maxVal - minVal) < priceGap){
              if((e.target as HTMLElement).className === "range-min"){
                  ((rangeInputPrice[0] as HTMLInputElement).value as unknown as number) = maxVal - priceGap
              }else{
                  ((rangeInputPrice[1] as HTMLInputElement).value as unknown as number) = minVal + priceGap;
              }
          }else{
              ((inputPrice[0] as HTMLInputElement).value as unknown as number) = minVal;
              ((inputPrice[1] as HTMLInputElement).value as unknown as number) = maxVal;
              (rangePrice as HTMLElement).style.left = ((minVal / ((rangeInputPrice[0] as HTMLInputElement).max as unknown as number)) * 100) + "%";
              (rangePrice as HTMLElement).style.right = 100 - (maxVal / ((rangeInputPrice[1] as HTMLInputElement).max as unknown as number)) * 100 + "%";
          }
      });
  });
  // Stock
  const rangeInputStock = document.querySelectorAll(".range-input__stock input"),
  inputStock = document.querySelectorAll(".stock-input input"),
  rangeStock = document.querySelector(".slider-stock .progress-stock");
  inputStock.forEach(input =>{
      input.addEventListener("input", e =>{
          let minPrice = parseInt((inputStock[0] as HTMLInputElement).value),
          maxPrice = parseInt((inputStock[1] as HTMLInputElement).value);

          if((maxPrice - minPrice >= priceGap) && maxPrice <= ((rangeInputStock[1] as HTMLInputElement).max as unknown as number)){
              if((e.target as HTMLElement).className === "input-min"){
                  ((rangeInputStock[0] as HTMLInputElement).value as unknown as number) = minPrice;
                  (rangeStock as HTMLElement).style.left = ((minPrice / ((rangeInputStock[0] as HTMLInputElement).max as unknown as number)) * 100) + "%";
              }else{
                  ((rangeInputStock[1] as HTMLInputElement).value as unknown as number) = maxPrice;
                  (rangeStock as HTMLElement).style.right = 100 - (maxPrice / ((rangeInputStock[1] as HTMLInputElement).max as unknown as number)) * 100 + "%";
              }
          }
      });
  });
  rangeInputStock.forEach(input =>{
      input.addEventListener("input", e =>{
          let minVal = parseInt((rangeInputStock[0] as HTMLInputElement).value),
          maxVal = parseInt((rangeInputStock[1] as HTMLInputElement).value);
          if((maxVal - minVal) < priceGap){
              if((e.target as HTMLElement).className === "range-min"){
                  ((rangeInputStock[0] as HTMLInputElement).value as unknown as number) = maxVal - priceGap
              }else{
                  ((rangeInputStock[1] as HTMLInputElement).value as unknown as number) = minVal + priceGap;
              }
          }else{
              ((inputStock[0] as HTMLInputElement).value as unknown as number) = minVal;
              ((inputStock[1] as HTMLInputElement).value as unknown as number) = maxVal;
              (rangeStock as HTMLElement).style.left = ((minVal / ((rangeInputStock[0] as HTMLInputElement).max as unknown as number)) * 100) + "%";
              (rangeStock as HTMLElement).style.right = 100 - (maxVal / ((rangeInputStock[1] as HTMLInputElement).max as unknown as number)) * 100 + "%";
          }
      });
  });
}
dualInputRange()

export default dualInputRange