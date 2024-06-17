import { describe, test, expect, vi,beforeEach} from 'vitest';
import { getPurchaseHistory, parsePurchaseResponse } from '../../../js/users/account/purchaseHistory/purchaseHistory';
import { Purchase } from '../../../js/users/account/account';

//--------------------(8)
describe('Test cases for getPurchaseHistory function', () => {
    const baseUrl = 'https://example.com';

    beforeEach(() => {
      global.XMLHttpRequest = vi.fn().mockReturnValue({
        open: vi.fn(),
      });
      global.URL = vi.fn().mockReturnValue({
        searchParams: {
          append: vi.fn(),
        },
        toString: vi.fn().mockReturnValue(`${baseUrl}/account/orders/history`),
      });
    });

    //(8.1)
    test('Should return a request if the userID is valid', () => {
        const userId = 1;
        const request = getPurchaseHistory(userId);
    expect(request).toBeInstanceOf(XMLHttpRequest);
    });

    //(8.2)
    test('Should return an error if the userID is invalid', () => {
        const userId = 'parole';
    expect(() => getPurchaseHistory(userId)).toThrow(TypeError);
    });

    //(8.3)
    test('Should return an error if the userID does not exist', () => {
        const userId = 45;
        const request = getPurchaseHistory(userId);
    expect(request).toBeInstanceOf(XMLHttpRequest);
  });
});

//--------------------(9)
describe('Test cases for parsePurchaseResponse function', () => {

    //(9.1)
    test('Should return an array of purchases if the purchaseData is valid', () => {
        const purchaseData = [
        { event: 'cobra', tickets: 3, price: 40 },
        { event: 'dance', tickets: 6, price: 75 },
        ];
        const purchases = parsePurchaseResponse(purchaseData);
    expect(purchases).toEqual([
      new Purchase('cobra', 3, 40),
      new Purchase('dance', 6, 75),
    ]);
  });

    //(9.2)
    test('Should return an error if the purchaseData is invalid', () => {
        const purchaseData1 = 90;
        const purchaseData2 = 'cobra';
        const purchaseData3 = [{ tickets: 8, price: 3 }, { event: 'dance', price: 75 }];

    expect(() => parsePurchaseResponse(purchaseData1)).toThrow(TypeError);
    expect(() => parsePurchaseResponse(purchaseData2)).toThrow(TypeError);
    expect(() => parsePurchaseResponse(purchaseData3)).toThrow(TypeError);
  });
});