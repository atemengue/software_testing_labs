import { describe, it, expect } from 'vitest';
import exchangeRateProvider from '../../../js/promotions/exchange/exchangeRateProvider';

describe('exchangeRateProvider', () => {
  it('should return the correct exchange rate for USD', () => {
    expect(exchangeRateProvider.callExchangeRateProvider('USD')).toBe(1.25);
  });

  it('should return the correct exchange rate for EUR', () => {
    expect(exchangeRateProvider.callExchangeRateProvider('EUR')).toBe(1.18);
  });

  it('should return the correct exchange rate for NZD', () => {
    expect(exchangeRateProvider.callExchangeRateProvider('NZD')).toBe(1.93);
  });

  it('should throw an error for unsupported currencies', () => {
    expect(() => exchangeRateProvider.callExchangeRateProvider('JPY')).toThrowError('Currency not supported');
  });
});