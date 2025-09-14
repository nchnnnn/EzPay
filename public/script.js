const loginInputs = document.querySelectorAll('.login input');

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