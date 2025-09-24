// Get DOM elements with updated selectors
const loginInputs = document.querySelectorAll('.login-form input'); // Updated selector
const registerInputs = document.querySelectorAll('.register-form input'); // Added for register form inputs
const logo = document.getElementById('logo');
const container = document.querySelector('main .container-styles');
const main = document.querySelector('main');

// Get navigation elements
const loginBtn = document.querySelector('.container-styles .land-page .login-btn');
const landPage = document.querySelector('.container-styles .land-page');
const loginForm = document.querySelector('.container-styles .login-form');
const registerForm = document.querySelector('.container-styles .register-form');

// Login button functionality
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  landPage.classList.remove('show');
  loginForm.classList.add('show');
});

// Register buttons functionality (multiple register buttons)
const registerBtns = document.querySelectorAll('.register-btn');
registerBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('show');
    registerForm.classList.add('show');
    landPage.classList.remove('show');
    // Optional: Add classes for different container sizing
    // container.classList.add('max-w-2xl');
    // main.classList.add('justify-center');
  });
});

// Input field functionality for floating labels - Login form
loginInputs.forEach(input => {
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

// Input field functionality for floating labels - Register form
registerInputs.forEach(input => {
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

// Register form submission
if (registerFormElement) {
  registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your register logic here
    console.log('Register form submitted');
  });
}

// Initialize the page (show landing page by default)
document.addEventListener('DOMContentLoaded', () => {
  // Ensure only landing page is visible on load
  landPage.classList.add('show');
  loginForm.classList.remove('show');
  registerForm.classList.remove('show');
});