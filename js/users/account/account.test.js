import { describe, it, expect, vi } from 'vitest';
import * as account from '../../js/users/account/account';
import { InvalidUsernameError } from '../../js/error-handling/exceptions';
import * as users from '../../js/users/users';

// Mocks pour purchaseHistory et users
vi.mock('../../js/users/purchaseHistory/purchaseHistory', () => ({
    getPurchaseHistory: vi.fn(),
}));

vi.mock('../../js/users/users', () => ({
    userExists: vi.fn(),
    createUserId: vi.fn(() => 'newUserId'),
}));

// Tests pour la fonction createAccount
describe('createAccount', () => {
    it('should create an account with a valid username', async () => {
        // Arrange
        const username = "newuser@example.com";
        users.userExists.mockResolvedValue(false);
        users.createUserId.mockReturnValue('newUserId');

        // Act
        const result = await account.createAccount(username);

        // Assert
        expect(result).toEqual({
            data: {
                userId: 'newUserId',
                username: username,
            }
        });
    });

    it('should throw InvalidUsernameError for an invalid username', async () => {
        // Arrange
        const username = "invaliduser.com";

        // Act & Assert
        await expect(account.createAccount(username)).rejects.toThrow(InvalidUsernameError);
    });

    it('should reject if the user already exists', async () => {
        // Arrange
        const username = "existinguser@example.com";
        users.userExists.mockResolvedValue(true);

        // Act & Assert
        await expect(account.createAccount(username)).rejects.toThrow("User already exists");
    });
});

// Test pour getPastPurchases
describe('getPastPurchases', () => {
    it('should return past purchases when the request is successful', () => {
        // Ajoutez votre test ici
    });

    it('should throw an error if the request fails', () => {
        // Ajoutez votre test ici
    });
});
