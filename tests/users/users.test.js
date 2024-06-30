import { describe, it, expect, vi } from 'vitest';
import { User, userExists, createUserId } from '../software_testing_labs/js/users/users';
describe('User', () => {
    it('should create a user instance', () => {
        // Arrange
        const userId = 1;
        const username = 'testuser@domain.com';

        // Act
        const user = new User(userId, username);

        // Assert
        expect(user).toBeInstanceOf(User);
        expect(user.id).toBe(userId);
        expect(user.username).toBe(username);
        expect(user.isPremium).toBe(false);
    });
});

describe('userExists', () => {
    it('should return true if user exists', async () => {
        // Arrange
        const username = 'newuser1@pluralsight.com';

        // Act
        const result = await userExists(username);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false if user does not exist', async () => {
        // Arrange
        const username = 'nonexistent@domain.com';

        // Act
        const result = await userExists(username);

        // Assert
        expect(result).toBe(false);
    });
});

describe('createUserId', () => {
    it('should create a new user ID', () => {
        // Act
        const userId = createUserId();

        // Assert
        expect(userId).toBe(2); // Assuming this is a placeholder value
    });
});
