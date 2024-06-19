import { describe, it, expect, vi, beforeEach} from 'vitest';
import { getPurchaseHistory, parsePurchaseResponse } from '../../../../js/users/account/purchaseHistory/purchaseHistory';
import { Purchase } from '../../../js/users/account/account';

describe('getPurchaseHistory', () => {
    const BASE_URL = 'https://example.com';

    beforeEach(() => {
      global.XMLHttpRequest = vi.fn().mockReturnValue({
        open: vi.fn(),
      });
      global.URL = vi.fn().mockReturnValue({
        searchParams: {
          append: vi.fn(),
        },
        toString: vi.fn().mockReturnValue(`${BASE_URL}/account/orders/history`),
      });
    });

    it('Should return a request if the userID is valid', () => {
        const userId = 1;
        const request = getPurchaseHistory(userId);
    expect(request).toBeInstanceOf(XMLHttpRequest);
    });

    it('Should return an error if the userID is invalid', () => {
        const userId = 'yollande';
    expect(() => getPurchaseHistory(userId)).toThrow(TypeError);
    });

    it('Should return an error if the userID does not exist', () => {
        const userId = 34;
        const request = getPurchaseHistory(userId);
    expect(request).toBeInstanceOf(XMLHttpRequest);
  });
});

describe('parsePurchaseResponse', () => {

    it('Should return an array of purchases if the purchaseData is valid', () => {
        const purchaseData = [
        { event: 'Jogging', tickets: 100, price: 25 },
        { event: 'Cinema', tickets: 75, price: 100 },
        ];
        const purchases = parsePurchaseResponse(purchaseData);
    expect(purchases).toEqual([
      new Purchase('Jogging', 3, 40),
      new Purchase('Cinema', 6, 75),
    ]);
  });

    
    it('Should return an error if the purchaseData is invalid', () => {
        const purchaseData1 = 90;
        const purchaseData2 = 'Jogging';
        const purchaseData3 = [{ tickets: 8, price: 3 }, { event: 'Cinema', price: 75 }];

    expect(() => parsePurchaseResponse(purchaseData1)).toThrow(TypeError);
    expect(() => parsePurchaseResponse(purchaseData2)).toThrow(TypeError);
    expect(() => parsePurchaseResponse(purchaseData3)).toThrow(TypeError);
  });
});