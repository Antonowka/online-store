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

  btn_modal_confirm.addEventListener('click', validateForms);
  modal_input_phone.addEventListener('input', validatePhone);
  modal_input_cardDate.addEventListener('input', validateDate);
  modal_input_cardNum.addEventListener('input', validateCardNum);
  modal_input_cvv.addEventListener('input', validateCVV);

  function validateForms() {
    if (!modal_input_name.checkValidity() || modal_input_name.value == '') {
      document.querySelector('.error__name').innerHTML = 'Error. The field must contain at least two words, each at least 3 characters long';
    } else {
      document.querySelector('.error__name').innerHTML = '';
    }

    if (!modal_input_phone.checkValidity() || modal_input_phone.value == '') {
      document.querySelector('.error__phone').innerHTML = 'Error. The field must start with "&plus;", contain only numbers and be at least 9 characters long';
    } else {
      document.querySelector('.error__phone').innerHTML = '';
    }

    if (!modal_input_adress.checkValidity() || modal_input_adress.value == '') {
      document.querySelector('.error__adress').innerHTML = 'Error. The field must contain at least three words, each at least 5 characters long';
    } else {
      document.querySelector('.error__adress').innerHTML = '';
    }

    if (!modal_input_email.checkValidity() || modal_input_email.value == '') {
      document.querySelector('.error__email').innerHTML = 'Error. The field must contain email';
    } else {
      document.querySelector('.error__email').innerHTML = '';
    }

    if (!modal_input_cardNum.checkValidity() || modal_input_cardNum.value == '') {
      document.querySelector('.error__cardNum').innerHTML = 'Error. The number of digits entered must be 16';
    } else {
      document.querySelector('.error__cardNum').innerHTML = '';
    }

    if (!modal_input_cardDate.checkValidity() || modal_input_cardDate.value == '') {
      document.querySelector('.error__date').innerHTML = 'Error. Invalid date';
    } else {
      document.querySelector('.error__date').innerHTML = '';
    }

    if (!modal_input_cvv.checkValidity() || modal_input_cvv.value == '') {
      document.querySelector('.error__cvv').innerHTML = 'Error. Invalid CVV';
    } else {
      document.querySelector('.error__cvv').innerHTML = '';
    }

    let modal_error = document.querySelectorAll('.modal__error');
    let join_error_text = '';

    for (let i = 0; i < modal_error.length; i++) {
      join_error_text += modal_error[i].innerHTML
    }

    if (join_error_text == '') {
      modalWindow.innerHTML = 'Thank you for your purchase. After 3 seconds you will be redirected to the main page'
      setTimeout(successPurchase, 3000);
    }

  }

  function validatePhone(e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
    e.target.value = !x[2] ? x[1] : '+' + x[1] + ' ' + x[2] + (x[3] ? '-' + x[3] : '');
  }

  function validateDate(e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '/' + x[2];
  }

  function validateCardNum(e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');

    if (e.target.value.startsWith('0')) {
      e.target.value = '';
    }
    if (e.target.value.startsWith('')) {
      modal_input_cardNum.style.backgroundImage = 'none';
    }
    if (e.target.value.startsWith('1') || e.target.value.startsWith('2') || e.target.value.startsWith('3')) {
      modal_input_cardNum.style.backgroundImage = 'url(../assets/icons/mastercard.png)';
    }
    if (e.target.value.startsWith('4') || e.target.value.startsWith('5')) {
      modal_input_cardNum.style.backgroundImage = 'url(../assets/icons/visa.png)';
    }
    if (e.target.value.startsWith('6') || e.target.value.startsWith('7')) {
      modal_input_cardNum.style.backgroundImage = 'url(../assets/icons/cirrus.png)';
    }
    if (e.target.value.startsWith('8') || e.target.value.startsWith('9')) {
      modal_input_cardNum.style.backgroundImage = 'url(../assets/icons/maestro.png)';
    }

  }

  function validateCVV(e) {
    var z = e.target.value.replace(/\D/g, '').match(/(\d{0,3})/);
    e.target.value = !z[2] ? z[1] : z[1];
  }

  function successPurchase() {
    localStorage.setItem('RS-cart', JSON.stringify([]));
    window.location.href = '';
  }
}

export default actionModal