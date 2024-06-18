import { describe, expect, it } from 'vitest'
import { Stack, calculateDiscount, createProduct, fetchData, getCoupons, isPriceInRange, isStrongPassword, isValidUsername } from '../core'

// getCoupons function test
describe('getCoupons function', () => {
    // Test case 1
    it('Should return an array', () => 
    {
        let check = Array.isArray(getCoupons()) ? true : false;
        expect(check).toBeTruthy()
    });

    // Test case 2
    it('Should return an array of objects', () => {
        let check = true;

        getCoupons().forEach(elt => {
            if (typeof(elt) !== "object")
                check = false;
        });

        expect(check).toBeTruthy()
    })

    // Test case 3
    it('Should return an array of objects not empty', () => {
        let check = true;
        getCoupons().forEach(elt => {
            if (Object.keys(elt).length === 0)
                check = false
        })

        expect(check).toBeTruthy();
    })
});

//  calculateDiscount function test
describe('CalculateDiscount function', () => {
    // Test Case 1
    it('Should return Invalid price if price <= 0', () => {
        // Arrange
        let price = -3;
        let discountCode = 'aba';
        let resultatAttendu = 'Invalid';
        // Act
        let resultatActuel = calculateDiscount(price, discountCode);
        // Assert
        expect(resultatActuel).toMatch(resultatAttendu);
    });

    // Test Case 2
    it('Should return Invalid price if price is not a number', () => {
        // Arrange
        let price = "price";
        let discountCode = "code";
        let resultatAttendu = 'Invalid';
        // Act
        let resultatActuel = calculateDiscount(price, discountCode);
        // Assert
        expect(resultatActuel).toMatch(resultatAttendu);
    });

    // Test Case 3
    it('Should return Invalid discount code if discountCode is not a string', () => {
        // Arrange
        let price = 7;
        let discountCode = [3];
        let resultatAttendu = 'Invalid';
        // Act
        let resultatActuel = calculateDiscount(price, discountCode);
        // Assert
        expect(resultatActuel).toMatch(resultatAttendu);
    });

    // Test case 4
    it('Should return a price if discountCode is neither equal to \'SAVE10\' nor \'SAVE20\'', () => {
        // Arrange
        let price = 7;
        let discountCode = "Code";
        let resultatAttendu = 7;
        // Act
        let resultatActuel = calculateDiscount(price, discountCode);
        // Assert
        expect(resultatActuel).toEqual(resultatAttendu);
    });

    // Test case 5
    it('Should return price - price * 0.1 if discountCode is \'SAVE10\'', () => {
        // Arrange
        let price = 20;
        let discountCode = "SAVE10";
        let resultatAttendu = 18;
        // Act
        let resultatActuel = calculateDiscount(price, discountCode);
        // Assert
        expect(resultatActuel).toEqual(resultatAttendu);
    });

    // Test case 6
    it('Should return price - price * 0.2 if discountCode is \'SAVE20\'', () => {
        // Arrange
        let price = 20;
        let discountCode = "SAVE20";
        let resultatAttendu = 16;
        // Act
        let resultatActuel = calculateDiscount(price, discountCode);
        // Assert
        expect(resultatActuel).toEqual(resultatAttendu);
    });

});

// IsPriceInRange function test
describe('IsPriceInRange function', () => {
    // Test Case 1
    it('Should return true if price is in range min and max', () => {
        // Arrange
        let min = 1;
        let max = 10;
        let price = 5
        // Act
        let result = isPriceInRange(price, min, max)
        // Assert
        expect(result).toBeTruthy();
    });

    // Test Case 2
    it('Should return false if price isn\'t range min and max', () => {
        // Arrange
        let min = 1;
        let max = 10;
        let price = 15
        // Act
        let result = isPriceInRange(price, min, max)
        // Assert
        expect(result).toBeFalsy();

    });
});

// IsValidUsername function test
describe('IsValidUsername function', () => {

    // Test Case 1
    it('Should return true if the length of username is between 5 and 15 caracters', () => {
        expect(isValidUsername("Axelle")).toBeTruthy();
    });

    // Test Case 2
    it('Should return false if the length of username isn\'t between 5 and 15 caracters', () => {
        expect(isValidUsername("Guemgne Nelly Sorelle")).toBeFalsy();
    });

});

// fetchData function test
describe('FetchData function', () => {
    // Test case 1
    it('Should get an array', async () => {
        const data = await fetchData();
        let check = Array.isArray(data)
        expect(check).toBeTruthy();
      });
})

// Stack Class Test
describe('Stack Class Test', () =>{
    // Test Case 1
    it('Should be an instance of a class Stack', () => {
        const newObject = new Stack();

        expect(newObject).instanceOf(Stack);
    });

    // Test case 2
    it('Should be an instance of a class Stack', () => {
        const newObject = new Stack();

        const check = Array.isArray(newObject.items) ? true : false;

        expect(check).toBeTruthy();
        
    });

    // Test case 3
    it('The length of array should be increment of 1 after the call of the push method', () => {
        const myClass = new Stack();
        let initialLength = myClass.items.length;
        myClass.push(237);
        let newLength = myClass.items.length;

        let difference = newLength - initialLength;

        expect(difference).toBe(1);
    });

    // Test case 4
    it('Should throw an error if we call the pop method with an empty array of items', () => {
        const myClass = new Stack();
        expect(() => myClass.pop()).toThrowError();
    });

    // Test case 5
    it('The length of array should be decrement of 1 after the call of the pop method', () => {
        const myClass = new Stack();
        myClass.push(15);
        let initialLength = myClass.items.length;
        myClass.pop()
        let newLength = myClass.items.length;

        let difference = initialLength - newLength;

        expect(difference).toBe(1);
    });

    // Test case 6
    it('Should throw an error if we call the peek method with an empty array of items', () => {
        const myClass = new Stack();
        expect(() => myClass.peek()).toThrowError();
    });

    // Test case 7
    it('Should return the last element of the array items', () => {
        const myClass = new Stack();
        myClass.push("Hello");
        myClass.push("World");
        myClass.push(237);

        expect(myClass.peek()).toBe(237);
    });

    // Test case 8
    it('Should return true if the items array is empty', () => {
        expect(new Stack().isEmpty()).toBeTruthy();
    });

    // Test case 10
    it('Should return false if the items array is not empty', () => {
        const myClass = new Stack();
        myClass.push(25);
        expect(myClass.isEmpty()).toBeFalsy();
    });

    // Test case 11
    it('Should return the length of the items array', () => {
        expect(new Stack().size()).toBe(0);
    });

    // Test case 12
    it('The length of items array should be zero after the call of the clear method', () => {
        const myClass = new Stack();
        myClass.push("Hello");
        myClass.clear();
        expect(myClass.size()).toBe(0);
    });
});

// createProduct function Test
describe('createProduct function Test', () =>{
    // Test case 1
    it('Should return an object', () => { 
        const checkTable = [];
        checkTable[0] = typeof(createProduct({})) === 'object' ? true : false;
        checkTable[1] = typeof(createProduct({name:'test',price:-2})) === 'object' ? true : false;
        checkTable[2] = typeof(createProduct({name:'nk',price:5})) === 'object' ? true : false;

        let check = true;

        for(let i=0;i<checkTable.length;i++)
        {
            if(checkTable[i] != true)
            {
                check = false;
                break;
            }
        }
        expect(check).toBeTruthy();
    });

    // Test case 2
    it('Should return an object with an error key if the name does not exist', () => {
        let check;
        if(createProduct([]).error)
            check = true;
        else
            check = false;

        expect(check).toBeTruthy();
    });

    // Test case 3
    it('Should return an object with an error key if the price is invalid', () => {
        let check;
        if(createProduct({name:"myName",price:-8}).error)
            check = true;
        else
            check = false;

        expect(check).toBeTruthy();
    });

    // Test case 4
    it('Should return an object with a message key if the name exist and the price is valid', () => {
        let check;
        if(createProduct({name:"myName",price:2500}).message)
            check = true;
        else
            check = false;

        expect(check).toBeTruthy();
    });
});

// isStrongPassword function Test
describe('isStrongPassword function Test', () =>{
    // Test case 1
    it('Should return false if the length of the password is less than 8', () => { 
        expect(isStrongPassword("azerty5")).toBeFalsy();
    });

    // Test case 2
    it('Should return false if the password does not contain at least one upper case letter', () => {
        expect(isStrongPassword("qwerty525")).toBeFalsy();
    });

    // Test case 3
    it('Should return false if the password does not contain at least one lower case letter', () => {
        expect(isStrongPassword("QWERTY525")).toBeFalsy();
    });

    // Test case 4
    it('Should return false if the password does not contain at least one digit', () => {
        expect(isStrongPassword("QWERTYazerty")).toBeFalsy();
    });

    // Test case 5
    it('Should return true if all criteria are met', () => {
        expect(isStrongPassword("QWERTYazerty123")).toBeTruthy();
    });
});