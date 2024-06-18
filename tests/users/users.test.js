import {describe, expect, it, vi} from 'vitest';
import { createUserId, User, userExists } from '../../js/users/users';

describe("User", () => {
    describe("constructor", () => {
        it("doit creer une instance de la classe User", () => {
            const user = new User(0, "Test");
            expect(user).toBeTypeOf("object");
            expect(user).toBeInstanceOf(User);
            expect(user).toHaveProperty("id");
            expect(user.id).toBe(0);
            expect(user).toHaveProperty("username");
            expect(user.username).toBe("Test");
            expect(user).toHaveProperty("isPremium");
        })
    })
    describe("userExists", () => {
        it.each([
            {scenario: "le nom d'utilisateur est deja existant", username: "newuser1@pluralsight.com", result: true},
            {scenario: "le nom d'utilisateur est inexistant", username: "test", result: false}
        ])("doit retourner $result si $scenario", async ({username, result}) => {
            expect(await userExists(username)).toBeTypeOf("boolean");
            expect(await userExists(username)).toBe(result);
        })
    })
    describe("createUserId", () => {
        it("doit retourner une valeur entiere", () => {
            expect(createUserId()).toBeTypeOf("number");
        });
    })
})