import { describe, it, expect, vi } from 'vitest';
import { userExists, createUserId } from '../../js/users/users';

describe('userExists', () => {
  it('should return true if the user exists', async () => {
    const username = "newuser1@pluralsight.com";
    const result = await userExists(username);
    expect(result).toBe(true);
  });

  it('should return false if the user does not exist', async () => {
    const username = "nonexistentuser@pluralsight.com";
    const result = await userExists(username);
    expect(result).toBe(false);
  });
});

describe('createUserId', () => {
  it('should return a user id', () => {
    const result = createUserId();
    expect(result).toBe(2);
  });
});
