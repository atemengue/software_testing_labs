import { describe, it, expect, vi } from 'vitest';
import exchangeRateProvider from '../../../js/promotions/exchange/exchangeRateProvider';
import getExchangeRate from '../../../js/promotions/exchange/exchange';

describe('getExchangeRate Function', () => {
  it('should call the exchangeRateProvider and return the expected response', async () => {
    // Arrange
    const mockCallback = vi.fn();
    vi.spyOn(exchangeRateProvider, 'callExchangeRateProvider').mockReturnValue(1.25);

    // Act
    await getExchangeRate('USD', mockCallback);

    // Assert
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith('USD');
    expect(mockCallback).toHaveBeenCalledWith({
      originalCurrency: 'GBP',
      newCurrency: 'USD',
      exchangeRate: 1.25
    });
  });

  it('should handle errors from the exchangeRateProvider', async () => {
    // Arrange
    const mockCallback = vi.fn();
    vi.spyOn(exchangeRateProvider, 'callExchangeRateProvider').mockImplementation(() => {
      throw new Error('Currency not supported');
    });

    // Act
    await expect(getExchangeRate('JPY', mockCallback)).rejects.toThrowError('Currency not supported');
    expect(mockCallback).not.toHaveBeenCalled();
  });
});