const loginInputs = document.querySelectorAll('.login input');

const logo = document.getElementById('logo');

const container = document.querySelector('main .container');
const main = document.querySelector('main');
const loginBtn = document.querySelector('.container .land-page .login-btn');
const landPage = document.querySelector('.container .land-page');
const loginForm = document.querySelector('.container .login-form');

const registerForm = document.querySelector('.container .register-form');
loginBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  landPage.classList.remove('show');
  loginForm.classList.add('show');
});


const registerBtns = document.querySelectorAll('.register-btn'); 

registerBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); 
    loginForm.classList.remove('show');
    registerForm.classList.add('show');
    landPage.classList.remove('show');
    container.classList.add('max-w-2xl');
    main.classList.add('justify-center');
  });
});




loginInputs.forEach(input => {
  function checkValue() {
    if (input.value.trim() !== "") {
      input.parentElement.classList.add('filled');
    } else {
      input.parentElement.classList.remove('filled');
    }
  }
  input.addEventListener('input', checkValue);
  checkValue();
});


