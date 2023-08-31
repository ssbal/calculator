const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers > button');
const actions = document.querySelectorAll('.actions > button');
const equalOp = document.querySelector('#equal');
const clearOp = document.querySelector('#clear');

let subject = '';
let finalSubject = '';
let operator = null;

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

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

  return result;
}

numbers.forEach((number) => {
  number.addEventListener('click', (event) => {
    let number = event.target.dataset.value;
    subject += number;
    display.textContent = subject;
  });
});

let visit = 0;
let previousOperator;

actions.forEach((action) => {
  action.addEventListener('click', (event) => {
    if (subject || finalSubject) {
      if (visit === 0) {
        operator = event.target.dataset.action;
        finalSubject = subject;
        subject = '';
        visit = 1;
      } else if (visit === 1) {
        finalSubject = operate(operator, finalSubject, subject);
        operator = event.target.dataset.action;

        display.textContent = finalSubject;
        subject = '';
        visit = 2;
      } else if (visit === 2) {
        finalSubject = operate(operator, finalSubject, subject);
        operator = event.target.dataset.action;

        display.textContent = finalSubject;
        subject = '';
      }
    }
  });
});

equalOp.addEventListener('click', () => {
  if (subject && finalSubject) {
    let result = operate(operator, finalSubject, subject);
    display.textContent = result;
    finalSubject = '';
    subject = result;
    operator = null;
  }
});
