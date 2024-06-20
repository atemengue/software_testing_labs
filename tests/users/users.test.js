// user.test.js

import { User, userExists, createUserId } from './user';

describe('User Module Tests', () => {
    test('Create a User Instance', () => {
        const user = new User(1, 'testuser@example.com');
        expect(user.id).toBe(1);
        expect(user.username).toBe('testuser@example.com');
        expect(user.isPremium).toBe(false);
    });

    test('userExists - User Exists', async () => {
        const result = await userExists('newuser1@pluralsight.com');
        expect(result).toBe(true);
    });

    test('userExists - User Does Not Exist', async () => {
        const result = await userExists('nonexistinguser@example.com');
        expect(result).toBe(false);
    });

    test('createUserId - Create User ID', () => {
        const userId = createUserId();
        expect(userId).toBe(2);
    });

    // Add more test cases as per the test plan
});
