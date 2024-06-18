import { describe, it, expect, vi } from 'vitest';
import { User, userExists, createUserId } from './users';

// Test for User class
describe('User class', () => {
    it('should create a user with given id and username', () => {
        const user = new User(1, 'testuser');
        expect(user.id).toBe(1);
        expect(user.username).toBe('testuser');
        expect(user.isPremium).toBe(false);
    });
});

// Test for userExists function
describe('userExists function', () => {
    it('should return true if the user exists', async () => {
        const result = await userExists('newuser1@pluralsight.com');
        expect(result).toBe(true);
    });

    it('should return false if the user does not exist', async () => {
        const result = await userExists('nonexistentuser@pluralsight.com');
        expect(result).toBe(false);
    });
});

// Test for createUserId function
describe('createUserId function', () => {
    it('should return a user id', () => {
        const userId = createUserId();
        expect(userId).toBe(2); // Assuming the placeholder always returns 2
    });
});
