import { vi, it, describe, expect, test } from "vitest";
import { createAccount, getPastPurchases, isValidUserName, Purchase } from "../../js/users/account/account";
import { InvalidUsernameError } from "../../js/error-handling/exceptions";
import { userExists } from "../../js/users/users";

vi.mock('../../js/error-handling/exceptions');
vi.mock("../../js/users/users");

describe("Purchase", () => {
    describe("constructor", () => {
        it("doit creer une instance de la classe Purchase", () => {
            const result = new Purchase("Test Event", 12, 2600);
            expect(result).toBeTypeOf("object");
            expect(result).toBeInstanceOf(Purchase);
            expect(result).toHaveProperty("eventName");
            expect(result).toHaveProperty("tickets");
            expect(result).toHaveProperty("cost");
            expect(result.eventName).toBe("Test Event");
            expect(result.tickets).toBe(12);
            expect(result.cost).toBe(2600);
        });
    });
    describe("isValidUserName", () => {
        it.each([
            {scenario: 'le username est valide', username: "test@", result: true},
            {scenario: 'le username est invalide', username: "", result: false},
            {scenario: 'le username est invalide', username: "test", result: false}
        ])("doit retourner $result si $scenario", async ({username, result}) => {
            expect(await isValidUserName(username)).toBe(result);
        });
    });
    describe("createAccount", () => {
        it("doit renvoyer une exception si le nom d'utilisateur est invalid", async () => {
            vi.mocked(InvalidUsernameError).mockReturnThis();
            // vi.mocked(isValidUserName).mockResolvedValue(false);
            try{
                await createAccount("test");
            }catch(error){
                expect(InvalidUsernameError).toHaveBeenCalled();
                expect(error).toBeInstanceOf(InvalidUsernameError);
                expect(error.message).toBeTypeOf('string');
            }
        });
        it("doit créer un utilisateur si son username est nouveau", async () => {
            vi.mocked(userExists).mockResolvedValue(false);
            const result = await createAccount("test@");
            expect(result).toBeTypeOf('object');
            expect(result).toHaveProperty('data');
            expect(result.data).toHaveProperty('userId');
            expect(result.data).toHaveProperty('username');
            expect(result.data.username).toBe("test@");
        });
        it("doit renvoyer un string si le username est déjà existant", async () => {
            vi.mocked(userExists).mockResolvedValue(true);
            try{
                await createAccount("test@plurals");
            }catch(result){
                // console.log(result);
                expect(result).toBeTypeOf('string');
                expect(result).toMatch(/exist/);
            }
        });
    });
    describe("getPastPurcharses", () => {
        it("doit retourner un objet si la réponse du serveur est prête", () => {
            // vi.mocked(purchaseHistory.getPurchaseHistory).mockResolvedValue();
            try
            {
                getPastPurchases(1);
            }
            catch(result){
                expect(result).toBeTypeOf('object');
                expect(result).toBeInstanceOf(Error);
                // expect(result).toHaveProperty('events');
            }
        })
    })
})