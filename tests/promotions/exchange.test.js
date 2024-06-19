// exchangeRateProvider.test.js

import exchangeRateProvider from './exchangeRateProvider';

describe('exchangeRateProvider Module Tests', () => {
    test('Retrieve Exchange Rate for USD', () => {
        const result = exchangeRateProvider.callExchangeRateProvider("USD");
        expect(result).toBe(1.25);
    });

    test('Retrieve Exchange Rate for EUR', () => {
        const result = exchangeRateProvider.callExchangeRateProvider("EUR");
        expect(result).toBe(1.18);
    });

    test('Retrieve Exchange Rate for NZD', () => {
        const result = exchangeRateProvider.callExchangeRateProvider("NZD");
        expect(result).toBe(1.93);
    });

    test('Unsupported Currency Code', () => {
        expect(() => {
            exchangeRateProvider.callExchangeRateProvider("JPY");
        }).toThrowError("Currency not supported");
    });

    test('Lowercase Currency Code', () => {
        const result = exchangeRateProvider.callExchangeRateProvider("usd");
        expect(result).toBe(1.25); // Should return the exchange rate for USD (case insensitive)
    });

    test('Default Exchange Rate (No Currency Code)', () => {
        const result = exchangeRateProvider.callExchangeRateProvider();
        expect(result).toBe(1); // Default exchange rate should be 1
    });

    // Add more test cases as per the test plan
});
