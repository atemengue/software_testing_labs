
import { describe, it, expect, vi } from 'vitest';
import { createAccount, getPastPurchases, isValidUserName } from '../../../js/users/account/account';
import * as users from '../../../js/users/users';
import * as purchaseHistory from '../../../js/users/account/purchaseHistory/purchaseHistory';
import { InvalidUsernameError } from '../../../js/error-handling/exceptions';

vi.mock('../../../js/users/users', () => ({
    userExists: vi.fn(),
    createUserId: vi.fn(),
}));

vi.mock('../../../js/users/account/purchaseHistory/purchaseHistory', () => ({
    getPurchaseHistory: vi.fn(),
}));

describe('isValidUserName', () => {
    it('should return false for invalid username', async () => {
        const result = await isValidUserName('invalid');
        expect(result).toBe(false);
    });

    it('should return true for valid username', async () => {
        const result = await isValidUserName('valid@example.com');
        expect(result).toBe(true);
    });
});


describe('createAccount', () => {
  it('should throw InvalidUsernameError for invalid username', async () => {
      await expect(createAccount('invalid')).rejects.toThrow(InvalidUsernameError);
  });

  it('should create account for valid username', async () => {
      users.userExists.mockResolvedValue(false);
      users.createUserId.mockReturnValue(2);

      const result = await createAccount('valid@example.com');
      expect(result).toEqual({
          data: {
              userId: 2,
              username: 'valid@example.com',
          },
      });
  });

  it('should reject if user already exists', async () => {
      users.userExists.mockResolvedValue(true);

      await expect(createAccount('existinguser@example.com')).rejects.toEqual('User already exists');
  });
});

describe('getPastPurchases', () => {
    it('should return purchase history for valid userId', () => {
        const mockResponse = {
            readyState: 4,
            response: {
                events: [
                    { event: 'Concert', tickets: 2, price: 100 },
                    { event: 'Movie', tickets: 1, price: 50 },
                ],
            },
        };

        purchaseHistory.getPurchaseHistory.mockReturnValue(mockResponse);

        const result = getPastPurchases(1);
        expect(result).toEqual(mockResponse.response.events);
    });

    it('should throw error if failed to get purchase history', () => {
        const mockResponse = {
            readyState: 3,
            response: {},
        };

        purchaseHistory.getPurchaseHistory.mockReturnValue(mockResponse);

        expect(() => getPastPurchases(1)).toThrow('Failed to get purchase history');
    });
});
