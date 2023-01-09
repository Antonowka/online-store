function actionModal() {
  const modalWindow = document.querySelector('.purchase__modal');
  const btn_modal_confirm = document.querySelector('.btn__modal__confirm');
  const modal_input_name = document.getElementById('modal__input__name');
  const modal_input_phone = document.getElementById('modal__input__phone');
  const modal_input_adress = document.getElementById('modal__input__adress');
  const modal_input_email = document.getElementById('modal__input__email');
  const modal_input_cardNum = document.getElementById('modal__input__cardNum');
  const modal_input_cardDate = document.getElementById('modal__input__card__date');
  const modal_input_cvv = document.getElementById('modal__input__card__CVV');

  (btn_modal_confirm as HTMLInputElement).addEventListener('click', validateForms);
  (modal_input_phone as HTMLInputElement).addEventListener('input', validatePhone);
  (modal_input_cardDate as HTMLInputElement).addEventListener('input', validateDate);
  (modal_input_cardNum as HTMLInputElement).addEventListener('input', validateCardNum);
  (modal_input_cvv as HTMLInputElement).addEventListener('input', validateCVV);

  function validateForms() {
    if (!(modal_input_name as HTMLInputElement).checkValidity() || (modal_input_name as HTMLInputElement).value == '') {
      (document.querySelector('.error__name') as HTMLElement).innerHTML = 'Error. The field must contain at least two words, each at least 3 characters long';
    } else {
      (document.querySelector('.error__name') as HTMLElement).innerHTML = '';
    }

    if (!(modal_input_phone as HTMLInputElement).checkValidity() || (modal_input_phone as HTMLInputElement).value == '') {
      (document.querySelector('.error__phone') as HTMLElement).innerHTML = 'Error. The field must start with "&plus;", contain only numbers and be at least 9 characters long';
    } else {
      (document.querySelector('.error__phone') as HTMLElement).innerHTML = '';
    }

    if (!(modal_input_adress as HTMLInputElement).checkValidity() || (modal_input_adress as HTMLInputElement).value == '') {
      (document.querySelector('.error__adress') as HTMLElement).innerHTML = 'Error. The field must contain at least three words, each at least 5 characters long';
    } else {
      (document.querySelector('.error__adress') as HTMLElement).innerHTML = '';
    }

    if (!(modal_input_email as HTMLInputElement).checkValidity() || (modal_input_email as HTMLInputElement).value == '') {
      (document.querySelector('.error__email') as HTMLElement).innerHTML = 'Error. The field must contain email';
    } else {
      (document.querySelector('.error__email') as HTMLElement).innerHTML = '';
    }

    if (!(modal_input_cardNum as HTMLInputElement).checkValidity() || (modal_input_cardNum as HTMLInputElement).value == '') {
      (document.querySelector('.error__cardNum') as HTMLElement).innerHTML = 'Error. The number of digits entered must be 16';
    } else {
      (document.querySelector('.error__cardNum') as HTMLElement).innerHTML = '';
    }

    if (!(modal_input_cardDate as HTMLInputElement).checkValidity() || (modal_input_cardDate as HTMLInputElement).value == '') {
      (document.querySelector('.error__date') as HTMLElement).innerHTML = 'Error. Invalid date';
    } else {
      (document.querySelector('.error__date') as HTMLElement).innerHTML = '';
    }

    if (!(modal_input_cvv as HTMLInputElement).checkValidity() || (modal_input_cvv as HTMLInputElement).value == '') {
      (document.querySelector('.error__cvv') as HTMLElement).innerHTML = 'Error. Invalid CVV';
    } else {
      (document.querySelector('.error__cvv') as HTMLElement).innerHTML = '';
    }

    let modal_error = document.querySelectorAll('.modal__error');
    let join_error_text = '';

    for (let i = 0; i < modal_error.length; i++) {
      join_error_text += modal_error[i].innerHTML
    }

    if (join_error_text == '') {
      (modalWindow as HTMLElement).innerHTML = 'Thank you for your purchase. After 3 seconds you will be redirected to the main page'
      setTimeout(successPurchase, 3000);
    }

  }

  function validatePhone(e: Event) {
    var x = (e.target as HTMLInputElement).value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
    (e.target as HTMLInputElement).value = !(x as RegExpMatchArray)[2] ? (x as RegExpMatchArray)[1] : '+' + (x as RegExpMatchArray)[1] + ' ' + (x as RegExpMatchArray)[2] + ((x as RegExpMatchArray)[3] ? '-' + (x as RegExpMatchArray)[3] : '');
  }

  function validateDate(e: Event) {
    var x = (e.target as HTMLInputElement).value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
    (e.target as HTMLInputElement).value = !(x as RegExpMatchArray)[2] ? (x as RegExpMatchArray)[1] : (x as RegExpMatchArray)[1] + '/' + (x as RegExpMatchArray)[2];
  }

  function validateCardNum(e: Event) {
    var x = (e.target as HTMLInputElement).value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    (e.target as HTMLInputElement).value = !(x as RegExpMatchArray)[2] ? (x as RegExpMatchArray)[1] : (x as RegExpMatchArray)[1] + ' ' + (x as RegExpMatchArray)[2] + ((x as RegExpMatchArray)[3] ? ' ' + (x as RegExpMatchArray)[3] : '') + ((x as RegExpMatchArray)[4] ? ' ' + (x as RegExpMatchArray)[4] : '');

    if ((e.target as HTMLInputElement).value.startsWith('0')) {
      (e.target as HTMLInputElement).value = '';
    }
    if ((e.target as HTMLInputElement).value.startsWith('')) {
      (modal_input_cardNum as HTMLElement).style.backgroundImage = 'none';
    }
    if ((e.target as HTMLInputElement).value.startsWith('1') || (e.target as HTMLInputElement).value.startsWith('2') || (e.target as HTMLInputElement).value.startsWith('3')) {
      (modal_input_cardNum as HTMLElement).style.backgroundImage = 'url(../assets/icons/mastercard.png)';
    }
    if ((e.target as HTMLInputElement).value.startsWith('4') || (e.target as HTMLInputElement).value.startsWith('5')) {
      (modal_input_cardNum as HTMLElement).style.backgroundImage = 'url(../assets/icons/visa.png)';
    }
    if ((e.target as HTMLInputElement).value.startsWith('6') || (e.target as HTMLInputElement).value.startsWith('7')) {
      (modal_input_cardNum as HTMLElement).style.backgroundImage = 'url(../assets/icons/cirrus.png)';
    }
    if ((e.target as HTMLInputElement).value.startsWith('8') || (e.target as HTMLInputElement).value.startsWith('9')) {
      (modal_input_cardNum as HTMLElement).style.backgroundImage = 'url(../assets/icons/maestro.png)';
    }

  }

  function validateCVV(e: Event) {
    var z = (e.target as HTMLInputElement).value.replace(/\D/g, '').match(/(\d{0,3})/);
    (e.target as HTMLInputElement).value = !(z as RegExpMatchArray)[2] ? (z as RegExpMatchArray)[1] : (z as RegExpMatchArray)[1];
  }

  function successPurchase() {
    localStorage.setItem('RS-cart', JSON.stringify([]));
    window.location.href = '';
  }
}

export default actionModal