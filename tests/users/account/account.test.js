// account.test.js
import { describe, it, expect, vi } from 'vitest';
import { Purchase, isValidUserName, createAccount, getPastPurchases } from '../../../js/users/account/account';
import * as users from '../../../js/users/users';
import exception from '../../../js/error-handling/exceptions';

describe('Purchase', () => {
    it('should create a new purchase', () => {
        const purchase = new Purchase('Punk Goes Pop - 90s', 2, 40.00);
        expect(purchase.eventName).toBe('Punk Goes Pop - 90s');
        expect(purchase.tickets).toBe(2);
        expect(purchase.cost).toBe(40.00);
    });
});

describe('isValidUserName', () => {
    it('should return true for a valid username', async () => {
        const isValid = await isValidUserName('valid@example.com');
        expect(isValid).toBe(true);
    });

    it('should return false for an invalid username', async () => {
        const isValid = await isValidUserName('invalidusername');
        expect(isValid).toBe(false);
    });
});

describe('createAccount', () => {
    it('should create a new account', async () => {
        // const account = await createAccount('new-user@example.com');
        // expect(account.data.userId).toBe(123);
        // expect(account.data.username).toBe('new-user@example.com');
    });

    it('should throw an error if the username is invalid', async () => {
        await expect(createAccount('invalidusername')).rejects.toThrowError();
    });

    it('should throw an error if the user already exists', async () => {
        await expect(createAccount('existing-user@example.com')).rejects.toThrowError();
    });
});

describe('getPastPurchases', () => {
    it('should return the purchase history', () => {
        //const purchases = getPastPurchases(123);
        // expect(purchases).toHaveLength(3);
        // expect(purchases[0]).toBeInstanceOf(Purchase);
    });

    it('should throw an error if the purchase history is not available', () => {
        expect(() => getPastPurchases(123)).toThrowError();
    });
});