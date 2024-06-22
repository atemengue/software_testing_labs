import exchangeRateProvider from '../../../js/promotions/exchange/exchangeRateProvider';
import { describe, test, expect } from "vitest";

describe("EXCHANGE RATE PROVIDER FUNCTION", () => { 

    test('callExchangeRateProvider returns correct exchange rate for USD', () => {
        const currencyCode = 'USD';
        const expectedRate = 1.25;
        const actualRate = exchangeRateProvider.callExchangeRateProvider(currencyCode);

        expect(actualRate).toBe(expectedRate);
    });

    test('callExchangeRateProvider returns correct exchange rate for EUR', () => {
        const currencyCode = 'EUR';
        const expectedRate = 1.18;
        const actualRate = exchangeRateProvider.callExchangeRateProvider(currencyCode);

        expect(actualRate).toBe(expectedRate);
    });

    test('callExchangeRateProvider returns correct exchange rate for NZD', () => {
        const currencyCode = 'NZD';
        const expectedRate = 1.93;
        const actualRate = exchangeRateProvider.callExchangeRateProvider(currencyCode);

        expect(actualRate).toBe(expectedRate);
    });

    test('callExchangeRateProvider throws error for unsupported currency', () => {
        const currencyCode = 'UNKNOWN';

        expect(() => exchangeRateProvider.callExchangeRateProvider(currencyCode)).toThrowError('Currency not supported');
    });

});