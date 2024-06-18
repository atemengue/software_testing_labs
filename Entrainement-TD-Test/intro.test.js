import { describe, expect, it } from 'vitest'
import { max, fizzBuzz, add, subtract, multiply, divide, isEqual, averageTab } from '../intro'

// Max Function Test
describe ('Max function', () => {
    // Test case 1
    it( 'Should return b if b > a', () => {
        // Arrange
        let a = 1;
        let b = 2;
        let result = 2;
        
        // Act
        let actuelResult = max(a, b);
        
        // Assert
        expect(actuelResult).toBe(result);
    });

    it( 'Should return a if a > b', () => {
        // Arrange
        let a = 3;
        let b = 2;
        let result = 3;
        
        // Act
        let actuelResult = max(a, b);
        
        // Assert
        expect(actuelResult).toBe(result);
    });

    // Test case 2
    it( 'Should return a if a == a', () => {
        // Arrange
        let a = 3;
        let b = 3;
        let result = 3;
        
        // Act
        let actuelResult = max(a, b);
        
        // Assert
        expect(actuelResult).toBe(result);
    });


});

// FizzBuzz Function Test
describe('FizzBuss function', () => {
    // Test case 1
    it('Should return a string value', () => {
        // Arrange
        let a = 5;

        //Act
        let result = fizzBuzz(a);

        //Assert
        expect(result).toBeTypeOf('string')
    });

    // Test case 2
    it('Should return \'Fizz\' with 9 as input value', () => {
        // Arrange
        let a = 9;
        let result = /^Fizz$/

        // Act 
        let message = fizzBuzz(a);

        // Assert
        expect(message).toMatch(result)
    });

    // Test case 3
    it('Should return \'Buzz\' with 50 as input value', () => {
        // Arrange
        let a = 50;
        let result = /^Buzz$/;

        // Act 
        let message = fizzBuzz(a);

        // Assert
        expect(message).toMatch(result)
    });

    // Test case 4
    it('Should return \'FizzBuzz\' with 15 as input value', () => {
        // Arrange
        let a = 15;
        let result = /^FizzBuzz$/

        // Act 
        let message = fizzBuzz(a);

        // Assert
        expect(message).toMatch(result)
    });

    // Test case 5
    it('Should return \'7\' with 7 as input value', () => {
        // Arrange
        let a = 7;
        let result = '7'

        // Act 
        let message = fizzBuzz(a);

        // Assert
        expect(message).toBe(result)
    });
});

// Add Function Test
describe('Add Function', () => {
    // Test Case 1
    it('Should return 237 with 200 and 37 as inputs values', () => {
        expect(add(200, 37)).toEqual(237)
    });
});

// Subtract Function Test
describe('Subtract Function', () => {
    // Test Case 1
    it('Should return 20 with 27 and 7 as inputs values', () => {
        expect(subtract(27, 7)).toEqual(20)
    });

    // Test Case 2
    it('Should return NaN if one of the two input values is not a number', () => {
        expect(subtract('INF352', 7)).toBeNaN()
    });
});

// Multiplication Function Test
describe('Multiplication Function', () => {
    // Test Case 1
    it('Should return 15 with 3 and 5 as inputs values', () => {
        expect(multiply(3, 5)).toEqual(15)
    });

    // Test Case 2
    it('Should return NaN if one of the two input values is not a number', () => {
        expect(multiply(12,'INF352')).toBeNaN()
    });
});

// Divide Function Test
describe('Divide Function', () => {
    // Test Case 1
    it('Should return a value of division of a divided by b', () => {
        expect(divide(15, 3)).toEqual(5)
    });

    // Test Case 2
    it('Should throw an error if b === 0', () => {
        expect(() => divide(10, 0)).toThrowError();
    });
});

// isEqual Function Test
describe('isEqual Function', () => {
    // Test case 1
    it('Should return true if a === b', () => {
        expect(isEqual(1, 1)).toBeTruthy()
    });

    // Test case 2
    it ('Should return false if a !== b', () => {
        expect(isEqual(2, 3)).toBeFalsy()
    });
});
