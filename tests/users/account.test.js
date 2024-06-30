import { describe, it, expect, vi } from 'vitest';
import { isValidUserName, createAccount, getPastPurchases } from '../software_testing_labs/js/users/account/account';
import exception from '../software_testing_labs/js/error-handling/exceptions';
import * as users from '../software_testing_labs/js/users/users';
import * as purchaseHistory from '../software_testing_labs/js/users/account/purchaseHistory/_mocks_/purchaseHistory';

vi.mock('../software_testing_labs/js/users/users', () => ({
    userExists: vi.fn(),
    createUserId: vi.fn()
}));

vi.mock('../software_testing_labs/js/users/account/purchaseHistory/_mocks_/purchaseHistory', () => ({
    getPurchaseHistory: vi.fn()
}));

describe('isValidUserName', () => {
    it('should return false for invalid username', async () => {
        // Arrange & Act
        const result = await isValidUserName('invalidUsername');

        // Assert
        expect(result).toBe(false);
    });

    it('should return true for valid username', async () => {
        // Arrange & Act
        const result = await isValidUserName('valid@username.com');

        // Assert
        expect(result).toBe(true);
    });
});

describe('createAccount', () => {
    it('should create a new account for a valid username', async () => {
        // Arrange
        users.userExists.mockResolvedValue(false);
        users.createUserId.mockReturnValue(2);

        // Act
        const result = await createAccount('newuser@domain.com');

        // Assert
        expect(result).toEqual({
            data: {
                "userId": 2,
                "username": 'newuser@domain.com',
            }
        });
    });

    it('should throw an error if username is invalid', async () => {
        // Act & Assert
        await expect(createAccount('invalidUsername')).rejects.toThrow(exception.InvalidUsernameError);
    });

    it('should reject if user already exists', async () => {
        // Arrange
        users.userExists.mockResolvedValue(true);

        // Act & Assert
        await expect(createAccount('existinguser@domain.com')).rejects.toBe('User already exists');
    });
});

describe('getPastPurchases', () => {
    it('should return past purchases for a valid user ID', () => {
        // Arrange
        const purchaseResponse = {
            readyState: 4,
            response: {
                events: [{ eventName: 'Event1', tickets: 2, cost: 100 }]
            }
        };
        purchaseHistory.getPurchaseHistory.mockReturnValue(purchaseResponse);

        // Act
        const result = getPastPurchases(1);

        // Assert
        expect(result).toEqual([{ eventName: 'Event1', tickets: 2, cost: 100 }]);
    });

    it('should throw an error if unable to get purchase history', () => {
        // Arrange
        const purchaseResponse = { readyState: 0 };
        purchaseHistory.getPurchaseHistory.mockReturnValue(purchaseResponse);

        // Act & Assert
        expect(() => getPastPurchases(1)).toThrow('Failed to get purchase history');
    });
});
