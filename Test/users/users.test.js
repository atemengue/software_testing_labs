import {test,expect,describe,it,vi} from 'vitest'
import { userExists,createUserId } from './js/users/users'
import{User} from './js/users/users'


describe('User', () => {
    test('doit me creer un utilisateur avec des proprietes correctes', () => {
      const userId = 1;
      const username = 'testuser@example.com';
      const user = new User(userId, username);
  
      expect(user.id).toEqual(userId);
      expect(user.username).toEqual(username);
      expect(user.isPremium).toBe(false);
    });
  });

describe('userExists', () => {
    test('doit me retourner True si username se trouve dans existingUsers', async () => {
      const existingUsername = 'newuser1@pluralsight.com';
      const result = await userExists(existingUsername);
      expect(result).toBe(true);
    });
  
    test('doit me retourner False si username ne se trouve pas dans existingUsers', async () => {
      const nonExistingUsername = 'nonexistinguser@example.com';
      const result = await userExists(nonExistingUsername);
      expect(result).toBe(false);
    });
  });