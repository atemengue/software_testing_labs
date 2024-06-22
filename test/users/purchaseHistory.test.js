import { describe, it, expect, vi } from 'vitest';
import { __getPurchaseHistory, parsePurchaseResponse } from '../../js/users/account/purchaseHistory/__mocks__/purchaseHistory';
import { Purchase } from '../../js/users/account/account';

// Mock de XMLHttpRequest pour les tests
global.XMLHttpRequest = vi.fn(() => ({
  open: vi.fn(),
  send: vi.fn(),
  response: JSON.stringify([
    { event: 'Event 1', tickets: 2, price: 50 },
    { event: 'Event 2', tickets: 1, price: 25 },
  ]),
  readyState: 4,
  status: 200,
  onload: vi.fn(),
}));

describe('__getPurchaseHistory', () => {
  it('should create an XMLHttpRequest with the correct URL and parameters', () => {
    // Arrange
    const userId = '12345';
    const BASE_URL = 'https://example.com';
    const expectedUrl = `${BASE_URL}/account/orders/history?userId=${userId}`;
    global.BASE_URL = BASE_URL;

    // Act
    const request = __getPurchaseHistory(userId);

    // Assert
    expect(request.open).toHaveBeenCalledWith('GET', expectedUrl);
  });
});

describe('parsePurchaseResponse', () => {
  it('should parse the purchase response correctly', () => {
    // Arrange
    const purchaseData = [
      { event: 'Event 1', tickets: 2, price: 50 },
      { event: 'Event 2', tickets: 1, price: 25 },
    ];

    // Act
    const purchases = parsePurchaseResponse(purchaseData);

    // Assert
    expect(purchases.length).toBe(2);
    expect(purchases[0]).toBeInstanceOf(Purchase);
    expect(purchases[0].event).toBe('Event 1');
    expect(purchases[0].tickets).toBe(2);
    expect(purchases[0].price).toBe(50);
    expect(purchases[1]).toBeInstanceOf(Purchase);
    expect(purchases[1].event).toBe('Event 2');
    expect(purchases[1].tickets).toBe(1);
    expect(purchases[1].price).toBe(25);
  });

  it('should return an empty array for empty purchase data', () => {
    // Arrange
    const purchaseData = [];

    // Act
    const purchases = parsePurchaseResponse(purchaseData);

    // Assert
    expect(purchases.length).toBe(0);
  });
});
