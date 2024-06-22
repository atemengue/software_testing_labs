import { describe, it, expect, test } from 'vitest';
import { getCoupons, calculateDiscount, isPriceInRange, isValidUsername, fetchData, Stack, createProduct, isStrongPassword } from '../core.js';

// test de la fonction getcoupon
describe('tester la fonction recuperer un coupons', () => {

    it('Doit retourner les objets vrai', () => {
        // arrange
        const resultatAttendu = [
            { code: 'SAVE20NOW', discount: 0.2 },
            { code: 'DISCOUNT50OFF', discount: 0.5 }];

        // act 
        const result = getCoupons();
        //et assert
        expect(result).toMatchObject(resultatAttendu);
    })
});

//test de la fonction calcultatediscount
describe('tester la fonction calcultatediscount', () => {
    it('Doit retourner prix invalide si le prix est inferieur a 0 ou est une chaine de caractere', () => {
        expect(calculateDiscount('cinq', 'SAVE10')).toBe('Invalid price');
        expect(calculateDiscount(-2, 'SAVE10')).toBe('Invalid price');
    });

    it('Doit retourner Invalid discount code si discountcode est different d une chaine ', () => {
        expect(calculateDiscount(20, 10)).toBe('Invalid discount code');
    });

    it('Doit retourner le prix si les valeurs price et discountCode sont correct', () => {
        expect(calculateDiscount(20, 'SAVE10')).toBe(18);
        expect(calculateDiscount(20, 'SAVE20')).toBe(16);
    });
});

//test de la fonction ispriceinrange
describe('tester la fonction ispriceinrange', () => {
    it('Doit retourner vrai si le prix est compris entre min et max', () => {

        expect(isPriceInRange(20, 10, 30)).toBeTruthy();
    });
    it('Doit retourner faux si le prix est inferieur a min', () => {

    })
    it('Doit retourner faux si le prix est sup a max', () => {

    });
    it('Doit retourner faux si le prix est egale ');
});

//test de la fonction isvalidusername
describe('test de la fonction isvalidusername', () => {
    it('Doit retourner vrai si la taille du username est compris entre minlength et maxlength', () => {

        expect(isValidUsername('sorelle')).toBeTruthy();

    })
});

//test de la fonction fetchData
describe('test de la fonction fetchData', () => {
    it('Doit retourner vrai si la promesse reussi', () => {

        expect(fetchData()).resolves.toBeTruthy();

    })

})

//test de setup et teardown
describe('test de la fonction Stack', () => {
    // Test du constructeur
    it('Doit initialiser les items à 0', () => {
        const stack = new Stack();
        expect(stack.items).toHaveLength(0);
    });

    // Test de la méthode push
    it('Doit ajouter un élément à la pile', () => {
        const stack = new Stack();

        stack.push(5);
        expect(stack.items).toEqual([5]);
    });

    it('Doit retourner erreur si Stack est vide lors de appel de pop', () => {

        const stack = new Stack();
        expect(() => {
            stack.pop();
        }).toThrow('Stack is empty');
    });

    it('Doit enlever les items', () => {
        const stack = new Stack();
        stack.push(5);
        const popstack = stack.pop();
        expect(popstack).toBe(5);

    });

    it('Doit retourner erreur si Stack est vide lors de appel de peek', () => {

        const stack = new Stack();
        expect(() => {
            stack.peek();
        }).toThrow('Stack is empty');
    });

    it('Doit soustraire les items', () => {
        const stack = new Stack();
        stack.push(5);
        const popstack = stack.pop();
        expect(popstack).toBe(5);
        expect(popstack).toBe(5);

    });

    it('Doit retourner le dernier element du tableau', () => {
        const stack = new Stack();
        stack.push(5);
        stack.push(3);
        const dernstack = stack.peek();
        expect(dernstack).toBe(3);

    });

    it('Doit retourner vrai si la taille de stack est egal a 0', () => {
        const stack = new Stack();

        const vide = stack.isEmpty();
        expect(vide).toBeTruthy();
    });

    it('Doit retourner la taille du tableau items', () => {
        const stack = new Stack();
        stack.push(5);
        stack.push(3);
        const taille = stack.size();
        expect(taille).toEqual(2);
    });

    it('Doit mettre le tableau items a vide', () => {
        const stack = new Stack();
        expect(stack.clear()).toBe();
    });

});

describe('test de la fonction creer produit', () => {
    it('Doit créer un produit avec succès', () => {
        const product = {
            name: 'Test Product',
            price: 10
        };
        const result = createProduct(product);
        expect(result.success).toBe(true);
        expect(result.message).toBe('Product was successfully published');
    });

    // Test avec un nom de produit manquant
    it('Doit renvoyer une erreur si le nom du produit est manquant', () => {
        const product = {
            price: 10
        };
        const result = createProduct(product);
        expect(result.success).toBe(false);
        expect(result.error.code).toBe('invalid_name');
        expect(result.error.message).toBe('Name is missing');
    });

    // Test avec un prix de produit invalide
    it('Doit renvoyer une erreur si le prix du produit est invalide', () => {
        const product = {
            name: 'Test Product',
            price: -5
        };
        const result = createProduct(product);
        expect(result.success).toBe(false);
        expect(result.error.code).toBe('invalid_price');
        expect(result.error.message).toBe('Price is missing');
    });

});

describe('Test de la fonction isStrongPassword', () => {
    // Test avec un mot de passe valide
    it('Doit retourner true pour un mot de passe fort', () => {
        const password = 'Test1234';
        const result = isStrongPassword(password);
        expect(result).toBe(true);
    });

    // Test avec un mot de passe trop court
    it('Doit retourner false pour un mot de passe trop court', () => {
        const password = 'Short1';
        const result = isStrongPassword(password);
        expect(result).toBe(false);
    });

    // Test avec un mot de passe sans majuscule
    it('Doit retourner false pour un mot de passe sans majuscule', () => {
        const password = 'onlylowercase123';
        const result = isStrongPassword(password);
        expect(result).toBe(false);
    });

    // Test avec un mot de passe sans minuscule
    it('Doit retourner false pour un mot de passe sans minuscule', () => {
        const password = 'ONLYUPPERCASE123';
        const result = isStrongPassword(password);
        expect(result).toBe(false);
    });

    // Test avec un mot de passe sans chiffre
    it('Doit retourner false pour un mot de passe sans chiffre', () => {
        const password = 'NoDigitsHere';
        const result = isStrongPassword(password);
        expect(result).toBe(false);
    });
});
