import { describe, it, expect } from "vitest";
import { User, userExists, createUserId } from "../../js/users/users";

describe("Testing User class", () => {
    it("Should create a new User instance with correct properties", () => {
        const user = new User(1, 'teacher');
        expect(user.id).toBe(1);
        expect(user.username).toBe('teacher');
        expect(user.isPremium).toBe(false);
    });
});

describe("Testing userExists function", () => {
    it("Should return true if the username exists", async () => {
        const result = await userExists('newuser1@pluralsight.com');
        expect(result).toBe(true);
    });

    it("Should return false if the username does not exist", async () => {
        const result = await userExists('teacher@gmail.com');
        expect(result).toBe(false);
    });
});

describe("Testing createUserId function", () => {
    it('Should return a valid user ID', () => {
        const userId = createUserId();
        expect(userId).toBe(2);
    });
});