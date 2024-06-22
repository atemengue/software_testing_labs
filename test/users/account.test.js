// tests/allTests.test.js
import { describe, it, expect, vi } from 'vitest';
import { isValidUserName, createAccount, getPastPurchases } from '../../js/users/account/account';
import exception from '../../js/error-handling/exceptions';
import users from '../../js/users/users';
import purchaseHistory from '../../js/users/account/purchaseHistory/__mocks__/purchaseHistory';

// Mocks 
vi.mock('../../js/users/users');
vi.mock('../../js/users/account/purchaseHistory/__mocks__/purchaseHistory');

// Tests pour isValidUserName
describe('isValidUserName', () => {
  it('should return true for a valid username', async () => {
    // Arrange
    const validUsername = 'example@email.com';

    // Act
    const result = await isValidUserName(validUsername);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false for an invalid username', async () => {
    // Arrange
    const invalidUsername = 'example';

    // Act
    const result = await isValidUserName(invalidUsername);

    // Assert
    expect(result).toBe(false);
  });

  it('should return false for an empty username', async () => {
    // Arrange
    const emptyUsername = '';

    // Act
    const result = await isValidUserName(emptyUsername);

    // Assert
    expect(result).toBe(false);
  });
});

// Tests pour createAccount
describe('createAccount', () => {
  it('should create a new account for a valid username', async () => {
    // Arrange
    const validUsername = 'example@email.com';
    users.userExists.mockResolvedValue(false);
    users.createUserId.mockReturnValue('123456789');

    // Act
    const result = await createAccount(validUsername);

    // Assert
    expect(users.userExists).toHaveBeenCalledWith(validUsername);
    expect(users.createUserId).toHaveBeenCalled();
    expect(result).toEqual({
      data: {
        userId: '123456789',
        username: validUsername,
      },
    });
  });

  it('should throw an error for an invalid username', async () => {
    // Arrange
    const invalidUsername = 'example';
    users.userExists.mockResolvedValue(false);

    // Act & Assert
    await expect(createAccount(invalidUsername)).rejects.toThrow(
      new exception.InvalidUsernameError("Please enter a valid username")
    );
  });

  it('should throw an error for an existing username', async () => {
    // Arrange
    const existingUsername = 'example@email.com';
    users.userExists.mockResolvedValue(true);

    // Act & Assert
    await expect(createAccount(existingUsername)).rejects.toThrow("User already exists");
  });
});

// Tests pour getPastPurchases
describe('getPastPurchases', () => {
  it('should return the purchase history for a valid user', async () => {
    // Arrange
    const userId = '123456789';
    const expectedPurchases = [
      { eventName: 'Event 1', tickets: 2, cost: 50 },
      { eventName: 'Event 2', tickets: 1, cost: 25 },
    ];
    purchaseHistory.getPurchaseHistory.mockResolvedValue({
      readyState: 4,
      response: { events: expectedPurchases },
    });

    // Act
    const result = await getPastPurchases(userId);

    // Assert
    expect(purchaseHistory.getPurchaseHistory).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedPurchases);
  });

  it('should throw an error for a failed purchase history retrieval', async () => {
    // Arrange
    const userId = '123456789';
    purchaseHistory.getPurchaseHistory.mockResolvedValue({
      readyState: 0,
      response: { events: [] },
    });

    // Act & Assert
    await expect(getPastPurchases(userId)).rejects.toThrow("Failed to get purchase history");
  });
});
