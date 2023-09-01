const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers > button');
const actions = document.querySelectorAll('.actions > button');
const equalOp = document.querySelector('#equal');
const clearOp = document.querySelector('#clear');

let subject, finalSubject, operator, firstVisit;
function initialize() {
  subject = '';
  finalSubject = '';
  operator = null;
  firstVisit = true;
}

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => {
  if (b === 0) return 'dbz';
  return (a / b).toFixed(2);
};

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
    if (subject.length > 10) return;
    let number = event.target.dataset.value;
    if (subject === '0') subject = '';
    subject += number;

    display.textContent = subject;
  });
});

actions.forEach((action) => {
  action.addEventListener('click', (event) => {
    if (firstVisit) {
      finalSubject = subject;
      operator = event.target.dataset.action;
      subject = '';
      firstVisit = false;
    } else {
      if (subject) {
        // To avoid inconsistencies after pressing equals to
        finalSubject = operate(operator, finalSubject, subject);

        if (finalSubject === 'dbz') {
          // handle divide-by-zero
          display.textContent = 'Invalid';
          initialize();
        } else {
          operator = event.target.dataset.action;

          display.textContent = finalSubject;
          subject = '';
        }
      } else {
        // to keep the operator clicked after pressing equals to
        operator = event.target.dataset.action;
      }
    }
  });
});

equalOp.addEventListener('click', () => {
  if (subject && finalSubject && operator) {
    let result = operate(operator, finalSubject, subject);

    if (result === 'dbz') {
      // handle divide-by-zero
      display.textContent = 'Invalid';
      initialize();
    } else {
      display.textContent = result;
      finalSubject = result;
      subject = '';
    }
  }
});

clearOp.addEventListener('click', () => {
  initialize();
  display.textContent = 0;
});

initialize();
