import { describe, it, expect, vi } from 'vitest';
import getExchangeRate from './exchange';

// Mock the exchangeRateProvider module
vi.mock('./exchangeRateProvider', () => {
  return {
    default: {
      callExchangeRateProvider: vi.fn(),
    },
  };
});

describe('getExchangeRate', () => {
  it('should fetch the exchange rate and call the callback with the response', async () => {
    const mockExchangeRate = 1.25;
    const mockCallback = vi.fn();
    const currencyCode = 'USD';

    // Import the mock after it has been set up
    const exchangeRateProvider = (await import('./exchangeRateProvider')).default;

    // Mock the resolved value for callExchangeRateProvider
    exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(mockExchangeRate);

    // Call the function being tested
    await getExchangeRate(currencyCode, mockCallback);

    // Assertions
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    expect(mockCallback).toHaveBeenCalledWith({
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      exchangeRate: mockExchangeRate,
    });
  });
});