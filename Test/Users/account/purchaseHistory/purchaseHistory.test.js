import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getPurchaseHistory, parsePurchaseResponse } from '../../../../js/users/account/purchaseHistory/purchaseHistory';
import { Purchase } from '../../../../js/users/account/account';
import purchaseHistory from '../../../../js/users/account/purchaseHistory/__mocks__/purchaseHistory';

describe('mock purchaseHistory', () => {
  beforeEach(() => {
    // Reset mock data between tests
    vi.resetAllMocks();
  });

  describe('getPurchaseHistory', () => {
    it('fetches purchase history for a user', async () => {
      const userId = 123;
      const expectedUrl = new URL('/account/orders/history', BASE_URL);
      expectedUrl.searchParams.append('userId', userId);

      // Mock the XMLHttpRequest behavior
      vi.spyOn(window, 'XMLHttpRequest').mockImplementationOnce(() => ({
        open: vi.fn(),
        send: vi.fn(),
        readyState: 4, // Simulate a successful response
        onreadystatechange: null,
        response: JSON.stringify(purchaseHistory.__getPurchaseHistory().response), // Use mocked response data
      }));

     await getPurchaseHistory(userId);

      // Verify that XMLHttpRequest was called with the expected URL
      expect(window.XMLHttpRequest).toHaveBeenCalledWith('GET', expectedUrl.toString());
    });
  });

  describe('parsePurchaseResponse', () => {
    it('parses purchase data into Purchase objects', () => {
      const purchaseData = purchaseHistory.__getPurchaseHistory().response.events;

      const expectedPurchases = purchaseData.map(
        (purchase) => new Purchase(purchase.name, purchase.tickets, purchase.price)
      );

      const actualPurchases = parsePurchaseResponse(purchaseData);

      expect(actualPurchases).toEqual(expectedPurchases);
    });
  });
});
