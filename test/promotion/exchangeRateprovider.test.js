import { describe, it, expect } from 'vitest';
import exchangeRateProvider from '../../js/promotions/exchange/exchangeRateProvider';

describe('Testing exchangeRateProvider', () => {
    it('Should return the correct exchange rate for USD', () => {
        const rate = exchangeRateProvider.callExchangeRateProvider('USD');
        expect(rate).toBe(1.25);
    });

    it('Should return the correct exchange rate for EUR', () => {
        const rate = exchangeRateProvider.callExchangeRateProvider('EUR');
        expect(rate).toBe(1.18);
    });

    it('Should return the correct exchange rate for NZD', () => {
        const rate = exchangeRateProvider.callExchangeRateProvider('NZD');
        expect(rate).toBe(1.93);
    });

    it('Should throw an error for unsupported currency', () => {
        expect(() => exchangeRateProvider.callExchangeRateProvider('ABC')).toThrow('Currency not supported');
    });
});
