import { describe, it, expect, vi } from 'vitest';
import { fizzBuzz, add, max, subtract, multiply, divide, isEqual } from '../intro.js';

// test de la fonction max
describe('tester la fonction max', () => {
    it('Doit retourner a si a est plus grand que b', () => {

        // arrange
        let a = 5;
        let b = 3;
        let resultatAttendu = 5;

        // act
        let result = max(a, b); // utilise la fonctionnalite du systeme a tester (SUT)

        // assert
        expect(result).toBe(resultatAttendu);
    });

    it('Doit retourner b si b est plus grand que a', () => {

        //arrange
        let a = 5;
        let b = 6;
        let resultatAttendu = 6;

        //act
        let result = max(a, b);

        // assert
        expect(result).toBe(resultatAttendu);
    });

    it('Doit retourner a si a = b', () => {

        // arrange
        let a = 4;
        let b = 4;
        let resultatAttendu = 4;

        // act
        let result = max(a, b);

        // assert
        expect(result).toBe(resultatAttendu);

    })
});

// test de la fonction fizzBuzz

describe('tester la fonction fizzbuzz', () => {
    it('Doit retourner fizzBuzz si n est divisible par 3 et 5', () => {
        // arrange
        const n = 15;

        // act
        const result = fizzBuzz(n);

        // assert
        expect(result).toBe('FizzBuzz');

    });

    it('Doit retourner fizz si n est divisible par 3', () => {

        // arrange
        const n = 3;

        // act
        const result = fizzBuzz(n);

        // assert
        expect(result).toBe('Fizz');
    });

    it('Doit retourner Buzz si n est divisible par 5', () => {

        // arrange
        const n = 5;

        // act
        const result = fizzBuzz(n);

        // assert
        expect(result).toBe('Buzz');
    })
});

// test de la fonction addition

describe('tester la fonction add', () => {
    it('Doit retourner la somme de a et b', () => {

        //arrange
        let a = 3;
        let b = 4;
        let resultatAttendu = 7;

        // act
        let result = add(a, b);

        // assert
        expect(result).toBe(resultatAttendu);

    });

});

// test de la fonction soustraction

describe('tester la fonction substract', () => {
    it('Doit retourner la soustraction de a et b', () => {

        //arrange
        let a = 4;
        let b = 3;
        let resultatAttendu = 1;

        //act
        let result = subtract(a, b);

        //assert
        expect(result).toBe(resultatAttendu);
    });
});

// test de la fonction multiplication
describe('tester la fonction multiplications', () => {
    it('Doit retourner la multiplication de a et b', () => {

        // arrange
        let a = 5;
        let b = 4;
        let resultatAttendu = 20;

        // act
        let result = multiply(a, b);

        // assert
        expect(result).toBe(resultatAttendu);
    });
});

// test de la fonction division
describe('tester la fonction division', () => {
    it('retourne une erreur si b est égal à zéro', () => {
        // Arrange
        const a = 2;
        const b = 0;

        // Act & Assert
        expect(() => {
            divide(a, b);
        }).toThrow('Division par zéro');
    });

    it('Doit retourner la division de a et b', () => {
        //arrange
        let a = 10;
        let b = 2;
        let resultatAttendu = 5;

        // act
        let result = divide(a, b);

        // assert
        expect(result).toBe(resultatAttendu);
    });


});

describe('tester la fonction egalite', () => {
    it('Doit retourner vrai si a est egal a b', () => {

        //arrange
        let a = 3;
        let b = 3;

        // act
        let result = isEqual(a, b);

        //assert
        expect(result).toEqual(true);
    });
});
