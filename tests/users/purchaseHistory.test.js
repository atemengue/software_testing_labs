import { describe, it, expect,vi } from 'vitest';
import { getPurchaseHistory, parsePurchaseResponse } from '../../js/users/account/purchaseHistory/purchaseHistory';
import { Purchase } from '../../js/users/account/account';

describe('getPurchaseHistory', () => {
  it('should return a promise that resolves to an array of Purchase objects', async () => {
    // Arrange
    const userId = '123';
    const mockPurchaseData = [
      {
        event: 'Punk Goes Pop - 90s',
        tickets: 2,
        price: 40.00,
      },
      {
        event: 'Adventures Live!',
        tickets: 5,
        price: 120.00,
      },
      {
        event: 'Folk dance party!',
        tickets: 3,
        price: 75.00,
      },
    ];
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockPurchaseData),
    });

    // Act
    const result = await getPurchaseHistory(userId);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`userId=${userId}`)
    );
    expect(result).toEqual([
      new Purchase('Punk Goes Pop - 90s', 2, 40.00),
      new Purchase('Adventures Live!', 5, 120.00),
      new Purchase('Folk dance party!', 3, 75.00),
    ]);
  });
});

describe('parsePurchaseResponse', () => {
  it('should transform the purchase data into an array of Purchase objects', () => {
    // Arrange
    const purchaseData = [
      {
        event: 'Punk Goes Pop - 90s',
        tickets: 2,
        price: 40.00,
      },
      {
        event: 'Adventures Live!',
        tickets: 5,
        price: 120.00,
      },
      {
        event: 'Folk dance party!',
        tickets: 3,
        price: 75.00,
      },
    ];

    // Act
    const result = parsePurchaseResponse(purchaseData);

    // Assert
    expect(result).toEqual([
      new Purchase('Punk Goes Pop - 90s', 2, 40.00),
      new Purchase('Adventures Live!', 5, 120.00),
      new Purchase('Folk dance party!', 3, 75.00),
    ]);
  });
});