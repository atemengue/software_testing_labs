// tests/purchaseHistory.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPurchaseHistory, parsePurchaseResponse } from '../../../../js/users/account/purchaseHistory/purchaseHistory';
import { Purchase } from '../../../../js/users/account/account';



describe('parsePurchaseResponse', () => {
    it('should return an array of Purchase objects', () => {
        const mockResponse = [
            { event: 'Concert', tickets: 2, price: 100 },
            { event: 'Movie', tickets: 1, price: 50 },
        ];

        const result = parsePurchaseResponse(mockResponse);
        expect(result).toEqual([
            new Purchase('Concert', 2, 100),
            new Purchase('Movie', 1, 50),
        ]);
    });
});