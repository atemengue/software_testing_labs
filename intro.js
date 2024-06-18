
// Lesson: Writing your first tests
export function max(a, b) {
  if (a > b) return a;
  else if (b > a) return b;
  return a;
}

// Fonction FizzBuzz
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}

// Fonction d'addition
export function add(a, b) {
  return a + b;
}

// Fonction de soustraction
export function subtract(a, b) {
  return a - b;
}

// Fonction de multiplication
export function multiply(a, b) {
  return a * b;
}

// Fonction de division
export function divide(a, b) {
  if (b === 0) {
    throw new Error('Division par zéro');
  }
  return a / b;
}

// Fonction de comparaison
export function isEqual(a, b) {
  return a === b;
}


