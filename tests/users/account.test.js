// purchase.test.js

import { isValidUserName, createAccount, getPastPurchases } from './purchase';
import exception from '../../error-handling/exceptions';
import users from '../../users';
import purchaseHistory from '../../purchaseHistory';

jest.mock('../../users', () => ({
    userExists: jest.fn(),
    createUserId: jest.fn().mockReturnValue('newUserId'),
}));

jest.mock('../../purchaseHistory', () => ({
    getPurchaseHistory: jest.fn(),
}));

describe('Purchase Module Tests', () => {
    test('isValidUserName - Valid Username', async () => {
        const result = await isValidUserName('user@example.com');
        expect(result).toBe(true);
    });

    test('isValidUserName - Invalid Username without "@"', async () => {
        const result = await isValidUserName('username');
        expect(result).toBe(false);
    });

    test('isValidUserName - Empty Username', async () => {
        const result = await isValidUserName('');
        expect(result).toBe(false);
    });

    test('createAccount - Valid Username', async () => {
        users.userExists.mockResolvedValue(false);
        const result = await createAccount('newuser@example.com');
        expect(result.data).toEqual({
            userId: 'newUserId',
            username: 'newuser@example.com',
        });
    });

    test('createAccount - Invalid Username', async () => {
        await expect(createAccount('invalidusername')).rejects.toThrow(exception.InvalidUsernameError);
    });

    test('createAccount - Existing Username', async () => {
        users.userExists.mockResolvedValue(true);
        await expect(createAccount('existinguser@example.com')).rejects.toEqual("User already exists");
    });

    test('getPastPurchases - Retrieve Successfully', () => {
        purchaseHistory.getPurchaseHistory.mockReturnValue({
            readyState: 4,
            response: {
                events: ['event1', 'event2'],
            },
        });
        const result = getPastPurchases('validUserId');
        expect(result).toEqual(['event1', 'event2']);
    });

    test('getPastPurchases - Fail to Retrieve', () => {
        purchaseHistory.getPurchaseHistory.mockReturnValue({
            readyState: 1,
        });
        expect(() => {
            getPastPurchases('validUserId');
        }).toThrow("Failed to get purchase history");
    });

    // Add more test cases as per the test plan
});
