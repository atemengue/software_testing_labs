import { describe, it, expect, vi,beforeEach ,afterEach } from 'vitest';
import { getPurchaseHistory, parsePurchaseResponse } from '../../js/users/account/purchaseHistory/purchaseHistory';
import { Purchase } from '../../js/users/account/account';
import xhrMock from 'xhr-mock';

// Mock the Purchase class constructor
vi.mock('../../js/users/account/account', () => ({
    Purchase: vi.fn(),
}));

describe('getPurchaseHistory', () => {
    beforeEach(() => {
        xhrMock.setup();
    });

    afterEach(() => {
        xhrMock.teardown();
    });

    it('should create a correct XMLHttpRequest', (done) => {
        const userId = 'user123';
        const BASE_URL = 'http://example.com';
        global.BASE_URL = BASE_URL;  // Mock global variable

        const expectedURL = `${BASE_URL}/account/orders/history?userId=${userId}`;

        xhrMock.get(expectedURL, (req, res) => {
            expect(req.url().toString()).toBe(expectedURL);
            done();
            return res.status(200).body(JSON.stringify({ events: [] }));
        });

        const request = getPurchaseHistory(userId);

        expect(request).toBeInstanceOf(XMLHttpRequest);
    });
});

describe('parsePurchaseResponse', () => {
    it('should parse purchase data correctly', () => {
        const purchaseData = [
            { event: 'Concert', tickets: 2, price: 50 },
            { event: 'Theater', tickets: 3, price: 100 },
        ];

        parsePurchaseResponse(purchaseData);

        expect(Purchase).toHaveBeenCalledTimes(purchaseData.length);
        expect(Purchase).toHaveBeenCalledWith('Concert', 2, 50);
        expect(Purchase).toHaveBeenCalledWith('Theater', 3, 100);
    });
});
