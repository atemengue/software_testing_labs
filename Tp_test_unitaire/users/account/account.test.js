import { describe,it,test,vi ,expect,afterEach,beforeEach,beforeAll} from 'vitest';
import { init } from '../../../app';
import { createAccount, isValidUserName,getPastPurchases } from './account';
import * as users from '../users';
import * as purchaseHistory from './purchaseHistory/purchaseHistory';
import{ getPurchaseHistory} from './purchaseHistory/purchaseHistory';
import * as account from './account'


// Mock the userExists function
vi.mock('./users', () => ({
  userExists: vi.fn(), // Initially assume user doesn't exist
  createUserId: vi.fn().mockReturnValue(2), // Mock the userId generation
}));


  
  describe(' Testing isValidUserName', () => {
   
    it('should return false for an empty username', async () => {
      expect(await isValidUserName('')).toBe(false);
    });
  
    it('should return false for a username without an "@" symbol', async () => {
      expect(await isValidUserName('testuser')).toBe(false);
    });
  
    it('should return true for a valid username', async () => {
      expect(await isValidUserName('test@example.com')).toBe(true);
    });
  });
  
  
  describe('createAccount', () => {
    it('should create a new account with a valid username', async () => {
      vi.spyOn(account, 'isValidUserName').mockReturnValue(true); 
      const username = 'testUser@example.com';
      const result = await createAccount(username);
      expect(result).toEqual({
        data: {
          userId: 2,
          username: username,
        },
      });
      
    });
    it('should throw an error if the username is invalid', async () => {
      // Mock isValidUserName to return false for this specific test
      vi.spyOn(account, 'isValidUserName').mockReturnValue(false); 
      const username = 'invalidUsername';
  
      // Use toBeRejectedWith instead of rejects.toThrowError for promise rejections
      await expect(createAccount(username)).rejects.toThrowError('Please enter a valid username'); 
  
      expect(isValidUserName).toHaveBeenCalledWith(username); 
      expect(users.userExists).not.toHaveBeenCalled(); // UserExists should not be called if username is invalid
    });
  
    it('should throw an error if the user already exists', async () => {
      // Mock userExists to return true (user already exists)
      users.userExists.mockResolvedValueOnce(true); 
      const username = 'existingUser@example.com';
      await expect(createAccount(username)).rejects.toThrowError('User already exists');
      expect(users.userExists).toHaveBeenCalledWith(username);
    });
  });
