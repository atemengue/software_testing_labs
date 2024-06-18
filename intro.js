
// Lesson: Writing your first tests
export function max(a, b) {
  if (a > b) return a;
  else if (b > a) return b;
  return a;
}
// implementation du TTd
// calcluer la moy d'un tab

export function ManagemetMarks(cc,tp,ee){
  if (cc<0 || cc>20 || typeof(cc)=='string' || cc==null )
    return "error cc";
  if (tp<0 || tp>30 || typeof(tp)=='string' || tp==null)
    return "error tp";
  if (ee<0 || ee>50 || typeof(ee)=='string' || ee==null)
    return "error ee";

    const note= cc+tp+ee;
  return note;
}

export function calcluerMoyenne(tab){
  if (tab.length==0){
    return NaN
  }
  if(tab.length==1){
    return tab[0]
  }
  if(tab.length>1){
    let sum=0;
    tab.forEach(element => {
      sum=sum+element;
    });
  return sum/tab.length;
  }
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


