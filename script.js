const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers > button');
let subject = 0;

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

// let num1 = prompt('Enter a number');
// let operator = prompt('Action');
// let num2 = prompt('Enter second number');

function operate(op, num1, num2) {
  n1 = Number(num1);
  n2 = Number(num2);
  let result;

  switch (op) {
    case '+':
      result = add(n1, n2);
      break;
    case '-':
      result = sub(n1, n2);
      break;
    case '*':
      result = mul(n1, n2);
      break;
    case '/':
      result = div(n1, n2);
      break;
    default:
      result = 0;
  }

  console.log(result);
}

numbers.forEach((number) => {
  number.addEventListener('click', (event) => {
    let number = event.target.dataset.value;

    display.textContent = number;
    subject = number;
  });
});
