function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

let num1 = prompt('Enter a number');
let operator = prompt('Action');
let num2 = prompt('Enter second number');

function operate(op, num1, num2) {
  n1 = Number(num1);
  n2 = Number(num2);
  let result = 0;

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
  }

  console.log(result);
}

operate(operator, num1, num2);
