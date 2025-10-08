// Get DOM elements with updated selectors
const loginInputs = document.querySelectorAll('.login-form input');
const logo = document.getElementById('logo');
const container = document.querySelector('main .container-styles');
const main = document.querySelector('main');


const landPage = document.querySelector('.container-styles .land-page');
const loginForm = document.querySelector('.container-styles .login-form');
const registerForm = document.querySelector('.container-styles .register-form');

// Input field functionality for floating labels 
const labelTrigger = document.querySelectorAll('.form .input-field');
labelTrigger.forEach(input => {
  function checkValue() {
    if (input.value.trim() !== "") {
      input.parentElement.classList.add('filled');
    } else {
      input.parentElement.classList.remove('filled');
    }
  }
  input.addEventListener('input', checkValue);
  input.addEventListener('blur', checkValue); // Also check on blur
  checkValue(); // Initial check
});



// Register buttons functionality (multiple register buttons)
const registerBtns = document.querySelectorAll('.register-btn');
registerBtns.forEach(btn => {

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('show');
    registerForm.classList.add('show');
    landPage.classList.remove('show');

  });
});

// Login button functionality
const loginBtns = document.querySelectorAll('.landing-login-btn');
loginBtns.forEach(btn => {

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('show');
    registerForm.classList.remove('show');
    landPage.classList.remove('show');
  });
});

// Input field functionality for floating labels - Login form
// loginInputs.forEach(input => {
//   function checkValue() {
//     if (input.value.trim() !== "") {
//       input.parentElement.classList.add('filled');
//     } else {
//       input.parentElement.classList.remove('filled');
//     }
//   }
  
//   input.addEventListener('input', checkValue);
//   input.addEventListener('blur', checkValue); // Also check on blur
//   checkValue(); // Initial check
// });

// Input field functionality for floating labels - Register form


// Back to landing page functionality (optional)
const backToLandingButtons = document.querySelectorAll('.cancel-btn');
backToLandingButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('show');
    registerForm.classList.remove('show');
    landPage.classList.add('show');
  });
});

// Form submission handlers (optional - for future use)
const loginFormElement = document.querySelector('.login-form form');

const registerFormElement = document.querySelector('.register-form form');

// Login form submission
if (loginFormElement) {
  loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted');
  });
}

if (registerFormElement) {
  registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Register form submitted');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  landPage.classList.add('show');
  loginForm.classList.remove('show');
  registerForm.classList.remove('show');
});