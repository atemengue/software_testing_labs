// tests/__mocks__/purchaseHistory.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import purchaseHistory from '../../../../../js/users/account/purchaseHistory/__mocks__/purchaseHistory';
import { Purchase } from '../../../../../js/users/account/account';

describe('getPurchaseHistory', () => {
    it('should return the mocked purchase history response', () => {
        const result = purchaseHistory.getPurchaseHistory(1);
        expect(result.readyState).toBe(4);
        expect(result.response.events.length).toBe(3);
        expect(result.response.events[0].name).toBe("Punk Goes Pop - 90s");
    });
});

describe('parsePurchaseResponse', () => {
    it('should return an array of Purchase objects', () => {
        const mockPurchaseData = [
            { name: "Punk Goes Pop - 90s", tickets: 2, price: 40.00 },
            { name: "Adventures Live!", tickets: 5, price: 120.00 },
            { name: "Folk dance party!", tickets: 3, price: 75.00 }
        ];

        const result = purchaseHistory.parsePurchaseResponse(mockPurchaseData);
        expect(result).toEqual([
            new Purchase("Punk Goes Pop - 90s", 2, 40.00),
            new Purchase("Adventures Live!", 5, 120.00),
            new Purchase("Folk dance party!", 3, 75.00)
        ]);
    });
});