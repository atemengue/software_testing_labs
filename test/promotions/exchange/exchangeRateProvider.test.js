import { describe, it, expect } from 'vitest';
import exchangeRateProvider from './../../../js/promotions/exchange/exchangeRateProvider';

describe('exchangeRateProvider', () => {
  it('should return exchange rate for USD', () => {
    const currencyCode = 'USD';
    const expectedExchangeRate = 1.25;

    const exchangeRate = exchangeRateProvider.callExchangeRateProvider(currencyCode);

    expect(exchangeRate).toBe(expectedExchangeRate);
  });

  it('should return exchange rate for EUR', () => {
    const currencyCode = 'EUR';
    const expectedExchangeRate = 1.18;

    const exchangeRate = exchangeRateProvider.callExchangeRateProvider(currencyCode);

    expect(exchangeRate).toBe(expectedExchangeRate);
  });

  it('should return exchange rate for NZD', () => {
    const currencyCode = 'NZD';
    const expectedExchangeRate = 1.93;

    const exchangeRate = exchangeRateProvider.callExchangeRateProvider(currencyCode);

    expect(exchangeRate).toBe(expectedExchangeRate);
  });

  it('should throw error for unsupported currency', () => {
    const currencyCode = 'AUD';

    try {
      exchangeRateProvider.callExchangeRateProvider(currencyCode);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe('Currency not supported');
    }
  });
});
