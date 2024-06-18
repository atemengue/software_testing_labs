import {User, userExists, createUserId} from '../../../js/users/users'
import { test, describe, expect } from "vitest";

describe('Test cases for User class', () =>{
    test('Should create User object with valid data', () => {
        const user = new User(2, "pollah");
        expect(user).toEqual({
            id: 2,
            username: "pollah",
            isPremium: false 
        });
    });
 test('Should not create User object if invalid data tpes are passed', () => {
    expect(() => {
        try {
            new User("lop", 5);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            throw error;
        }
    });
});
});

describe('Test cases for UserExists function', () =>{
    test('Should return true if user exist', async() => {
        const username = "newuser1@pluralsight.com";
        const result = await userExists(username);
        expect(result).toBe(true);
    });
    test('Should return false if user does not exist', async() => {
        const username = "newuser2@pluralsight.com";
        const result = await userExists(username);
        expect(result).toBe(false);
    });
});

describe('Test cases for createUser function', () =>{
    test('Should return different user IDs on different calls', async() => {
        let userIDs =[]
        for(let i=0;i<3;i++){
            const userId= createUserId();
            userIDs.push(userId);
        }
        const uniqueUserId = new Set(userIDs);
        expect(uniqueUserId.size).toBe(3);
    });
});


