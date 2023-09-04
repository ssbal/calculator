const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const actions = document.querySelectorAll('.actions > button');
const equalOp = document.querySelector('#equal');
const clearOp = document.querySelector('#clear');
const bksp = document.querySelector('#bksp');

let subject, finalSubject, operator, firstVisit, pointCounter;
function initialize() {
  subject = '0';
  finalSubject = '';
  operator = null;
  firstVisit = true;
  pointCounter = false;
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

function displayNumber(value) {
  if (!operator && !firstVisit) initialize();

  let number = value;

  if (subject.length > 10) return;
  if (pointCounter && number === '.') return;
  if (number === '.') pointCounter = true;

  if (subject === '0') subject = '';
  if (subject === '' && number === '.') subject += '0';
  subject += number;

  display.textContent = subject;
}

function fireOperator(operand) {
  if (firstVisit) {
    finalSubject = subject;
    operator = operand;
    subject = '';
    firstVisit = false;
    pointCounter = false;
  } else {
    if (subject) {
      // To avoid inconsistencies after pressing equals to
      finalSubject = operate(operator, finalSubject, subject);

      if (finalSubject === 'dbz') {
        // handle divide-by-zero
        display.textContent = 'Invalid';
        initialize();
      } else {
        operator = operand;

        display.textContent = finalSubject;
        subject = '';
        pointCounter = false;
      }
    } else {
      // to keep the operator clicked after pressing equals to
      operator = operand;
    }
  }
}

function displayResult() {
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
      operator = null;
      pointCounter = false;
    }
  }
}

function clearScreen() {
  initialize();
  display.textContent = 0;
}

function makeCorrection() {
  if (subject.length > 1) {
    subject = subject.slice(0, subject.length - 1);
    display.textContent = subject;
  } else if (subject.length === 1) {
    subject = '0';
    display.textContent = subject;
  }
}

window.addEventListener('keydown', (event) => {
  if (event.key === '/') event.preventDefault();

  if (
    event.key === '0' ||
    event.key === '1' ||
    event.key === '2' ||
    event.key === '3' ||
    event.key === '4' ||
    event.key === '5' ||
    event.key === '6' ||
    event.key === '7' ||
    event.key === '8' ||
    event.key === '9' ||
    event.key === '.'
  ) {
    displayNumber(event.key);
  }

  if (
    event.key === '+' ||
    event.key === '-' ||
    event.key === '*' ||
    event.key === '/'
  ) {
    fireOperator(event.key);
  }

  if (event.key === '=' || event.key === 'Enter') displayResult();

  if (event.key === 'c') clearScreen();

  if (event.key === 'Backspace') makeCorrection();
});

numbers.forEach((number) => {
  number.addEventListener('click', (event) =>
    displayNumber(event.target.dataset.value)
  );
});

actions.forEach((action) => {
  action.addEventListener('click', (event) =>
    fireOperator(event.target.dataset.action)
  );
});

equalOp.addEventListener('click', () => displayResult());

clearOp.addEventListener('click', () => clearScreen());

bksp.addEventListener('click', () => makeCorrection());

initialize();
