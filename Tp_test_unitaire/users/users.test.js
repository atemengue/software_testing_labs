import {describe, expect ,it, test } from 'vitest';
import {userExists,createUserId,User} from './users';



describe("Testing async fontion UserExists",()=> {
    it('should return true for existing users', async () => {
    const existingUser = 'newuser1@pluralsight.com';
    expect(await userExists(existingUser)).toBe(true);
    })

    it('should return false for non-existing users', async () => {
    const nonExistingUser = 'nonuser@example.com';
    expect(await userExists(nonExistingUser)).toBe(false);
  })

    it('userExists should handle multiple existing users', async () => {
    const existingUsers = ['newuser1@pluralsight.com', 'newuser1@pluralsight.com'];
    for (const user of existingUsers) {
        expect(await userExists(user)).toBe(true);
        }
    })

    it('should handle multiple non-existing users', async () => {
    const nonExistingUsers = ['nonuser1@example.com', 'nonuser2@example.com'];
    for (const user of nonExistingUsers) {
        expect(await userExists(user)).toBe(false);
    }   
    })

    it(' should return false for an empty array  an empty array of users', async () => {
    const emptyUsers = [];
    for (const user of emptyUsers) {
        expect(await userExists(user)).toBe(false);
    }
    })
})

describe('Testing createUserId',()=>{
    it('should return a positive integer', () => {
    const userId = createUserId();
    expect(userId).toBeGreaterThan(0);
    expect(Number.isInteger(userId)).toBe(true);
    })

    it('should return a unique id each time it is called', () => {
    const firstUserId = createUserId();
    const secondUserId = createUserId();
    expect(firstUserId).not.toBe(secondUserId);
    })

    it('should not return the same id for multiple calls within a short period', async () => {
    const firstUserId = createUserId();
    await new Promise(resolve => setTimeout(resolve, 10)); // Simulate delay
    const secondUserId = createUserId();
    expect(firstUserId).not.toBe(secondUserId);
    })

   it(' should handle concurrent calls without returning the same id', async () => {
    const firstUserIdPromise = Promise.resolve(createUserId());
    const secondUserIdPromise = Promise.resolve(createUserId());
    const [firstUserId, secondUserId] = await Promise.all([firstUserIdPromise, secondUserIdPromise]);
    expect(firstUserId).not.toBe(secondUserId); 
    })

    it('should return a consistent id when called multiple times in a row', async () => {
    const userId = createUserId();
    const repeatedUserId = createUserId();
    expect(repeatedUserId).toBe(userId);
    })
})
