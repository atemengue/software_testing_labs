import { describe, it, expect } from 'vitest';
import { User, userExists, createUserId } from '../../js/users/users';

describe('User', () => {
    it('should create a new user', () => {
        const user = new User(1, 'newuser1@pluralsight.com');
        expect(user.id).toBe(1);
        expect(user.username).toBe('newuser1@pluralsight.com');
        expect(user.isPremium).toBe(false);
    });
});

describe('userExists', () => {
    it('should return true if the user exists', async () => {
        const exists = await userExists('newuser1@pluralsight.com');
        expect(exists).toBe(true);
    });

    it('should return false if the user does not exist', async () => {
        const exists = await userExists('non-existing-user@example.com');
        expect(exists).toBe(false);
    });
});

describe('createUserId', () => {
    it('should create a new user ID', () => {
        const userId = createUserId();
        expect(userId).toBe(2);
    });
});