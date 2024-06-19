import { describe, it, expect } from 'vitest';
import { User, userExists, createUserId } from '../../js/users/users';

describe('User class', () => {
    it('should create a user with the given id and username', () => {
        const user = new User(1, 'RodrigueDo');
        expect(user.id).toBe(1);
        expect(user.username).toBe('RodrigueDo');
        expect(user.isPremium).toBe(false);
    });
});

describe('userExists function', () => {
    it('should return true if the user exists', async () => {
        const exists = await userExists('newuser1@pluralsight.com');
        expect(exists).toBe(true);
    });

    it('should return false if the user does not exist', async () => {
        const exists = await userExists('nonexistentuser@pluralsight.com');
        expect(exists).toBe(false);
    });
});

describe('createUserId function', () => {
    it('should return the new user id', () => {
        const userId = createUserId();
        expect(userId).toBe(2);
    });
});
