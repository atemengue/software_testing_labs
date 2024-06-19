import { describe, it, expect, vi } from 'vitest';
import { InvalidUsernameError } from '../../../js/error-handling/exceptions';
import { User, createUserId } from '../../../js/users/users';
import purchaseHistory, { __getPurchaseHistory } from '../../../js/users/account/purchaseHistory/__mocks__/purchaseHistory';
import { Purchase, isValidUserName, createAccount, getPastPurchases } from '../../../js/users/account/account';

vi.mock('../../../js/users/users', () => ({
  User: vi.fn(),
  createUserId: vi.fn(),
}));

vi.mock('../../../js/users/account/purchaseHistory/__mocks__/purchaseHistory',  () => ({
  getPurchaseHistory: vi.fn(),
}));

describe('account.js', () => {
  describe('isValidUserName', async () => {
    it('should return false for invalid usernames', async () => {
      expect(await isValidUserName('')).toBe(false);
      expect(await isValidUserName('invalidusername')).toBe(false);
    });

    it('should return true for valid usernames', async () => {
      expect(await isValidUserName('valid@username.com')).toBe(true);
    });
  });

  describe('createAccount', async () => {
    it('should throw an error for invalid usernames', async () => {
      await expect(createAccount('invalidusername')).rejects.toThrow(new InvalidUsernameError("Please enter a valid username"));
    });

    it('should resolve with new user data if user does not exist', async () => {
      const mockUser = {
        username: null,
      };
      User.mockImplementation(() => mockUser);
      createUserId.mockReturnValue('12345');

      await expect(createAccount('newuser@domain.com')).resolves.toEqual({
        data: {
          userId: '12345',
          username: 'newuser@domain.com',
        },
      });
    });

    it('should reject if user already exists', async () => {
      const mockUser = {
        username: 'newuser1@pluralsight.com',
      };
      User.mockImplementation(() => mockUser);

      await expect(createAccount('newuser1@pluralsight.com')).rejects.toEqual('User already exists');
    });
  });

  describe('getPastPurchases', () => {
    it('should return past purchases for a valid userId', () => {
      const mockPurchases = {
        readyState: 4,
        response: {
          events: [
            new Purchase('Event 1', 2, 100),
            new Purchase('Event 2', 1, 50),
          ],
        },
      };
      purchaseHistory.getPurchaseHistory.mockReturnValue(mockPurchases);

      const result = getPastPurchases('validUserId');
      expect(result).toEqual(mockPurchases.response.events);
    });

    it('should throw an error if purchase history is not ready', () => {
      const mockPurchases = {
        readyState: 3,
        response: {},
      };
      purchaseHistory.getPurchaseHistory.mockReturnValue(mockPurchases);

      expect(() => getPastPurchases('validUserId')).toThrow('Failed to get purchase history');
    });
  });
});