import { describe, it, expect, vi } from "vitest";
import { Purchase, isValidUserName, createAccount, getPastPurchases } from "../../../js/users/account/account";
//import purchaseHistory from "../../../js/users/account/purchaseHistory/__mocks__/purchaseHistory";
import * as users from "../../../js/users/users";
import * as purchaseHistoty from '../../../js/users/account/purchaseHistory/purchaseHistory';

vi.mock('../../../js/users/account/purchaseHistory/purchaseHistory', () => ({
    getPurchaseHistory: vi.fn(() => {
        return {
            readyState: 4,
            response: {
                events: [
                    {
                        eventName: "Punk Goes Pop - 90s",
                        tickets: 2,
                        price: 40.00,
                    },
                    {
                        eventName: "Adventures Live!",
                        tickets: 5,
                        price: 120.00,
                    },
                    {
                        eventName: "Folk dance party!",
                        tickets: 3,
                        price: 75.00,
                    }
                ],
            }
        };
    })
}));

vi.mock('../../../js/users/users');

describe('Testing Purchase Class', () => {
    it('should create a Purchase object with correct properties', () => {
        const purchase = new Purchase('Concert', 2, 50.00);
        expect(purchase.eventName).toBe('Concert');
        expect(purchase.tickets).toBe(2);
        expect(purchase.cost).toBe(50.00);
    });
});

describe('Testing isValidUserName function', () => {
    it('Should return false for invalid usernames', async () => {
        const result = await isValidUserName('invalidusername');
        expect(result).toBe(false);
    });

    it('Should return true for valid usernames', async () => {
        const result = await isValidUserName('teacher@ms.com');
        expect(result).toBe(true);
    });
});

describe("Testing createAccount function", () => {
    it('Should create a new account for a valid username', async () => {
        users.userExists.mockResolvedValue(false);
        users.createUserId.mockReturnValue(2);
        
        const username = 'teacher@ms.com';
        const result = await createAccount(username);
        expect(result.data.userId).toBe(2);
        expect(result.data.username).toBe(username);
    });

    it('Should throw an error for an existing username', async () => {
        users.userExists.mockResolvedValue(true);

        const username = 'teacher@ms.com';
        await expect(createAccount(username)).rejects.toBe('User already exists');
    });

});

describe('Testing getPastPurchases function', () => {
    it('Should return past purchases for a valid user ID', () => {
        const userId = 1;
        const purchases = getPastPurchases(userId);
        expect(purchases.length).toBeGreaterThan(0);
    });

    it('Should throw an error if purchase history cannot be retrieved', () => {
        purchaseHistoty.getPurchaseHistory.mockReturnValue({ readyState: 3 });
        const userId = 2;
        expect(() => getPastPurchases(userId)).toThrow('Failed to get purchase history');
    });
});
