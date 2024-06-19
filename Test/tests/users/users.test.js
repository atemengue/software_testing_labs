//const { User, userExists, createUserId } = require('./users');
import { User, userExists, createUserId } from '../js/users/users';

describe('User Class', () => {
  it('should create a new User instance with the correct properties', () => {
    const user = new User(1, 'john_doe');
    expect(user.id).toBe(1);
    expect(user.username).toBe('john_doe');
    expect(user.isPremium).toBe(false);
  });
});

describe('userExists', () => {
  it('should return true if the username exists in the list of existing users', async () => {
    const existingUsername = 'newuser1@pluralsight.com';
    const result = await userExists(existingUsername);
    expect(result).toBe(true);
  });

  it('should return false if the username does not exist in the list of existing users', async () => {
    const nonExistingUsername = 'nonexistinguser@pluralsight.com';
    const result = await userExists(nonExistingUsername);
    expect(result).toBe(false);
  });
});

describe('createUserId', () => {
  it('should return a new user ID', () => {
    const userId = createUserId();
    expect(userId).toBeDefined();
    expect(typeof userId).toBe('number');
  });
});