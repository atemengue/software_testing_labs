
// Lesson: Writing your first tests
// export function max(a, b) {
//   if (a > b) return a;
//   else if (b > a) return b;
//   return a;
// }
// refactorized max function
export function max(a,b){
  return (a >= b)?  a : b;
  
}


// Fonction FizzBuzz
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}

export function calculateAverage(numbers) {
  if (numbers.length === 0) return NaN;
  return numbers.reduce((sum, current) => sum + current, 0) / numbers.length
}

export function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 10) return 1;
  return n * factorial(n - 1);
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


//The some() method uses the function for its evaluation and it executes the 
//function once for each element present in the array. 
//If it finds the object/element in the array 
//then it returns true and stops the execution for the remaining 
//elements otherwise returns false

//The filter() method creates the array of all those elements/
//objects that pass the checking condition.

// userService.js
const users = [{ id: 1, name: 'joe', password: '1234' }]

function getUser(id) {
  const user = users.filter(user => user.id == id)[0];
  return user || null
}

async function createUser(id, name) {
  if (users.some(user => user.id == id)) {
    throw new Error('User already exists');
  }
  users.push({ id: id, name: name })
  return "User has created"
}

// New function to get user data before validation
async function getUserDataBeforeValidation(id, externalService) {
  const userData = await externalService(id);
  return userData;
}

