import {describe, expect, vi} from 'vitest';
import getExchangeRate from './exchange';
import exchangeRateProvider from './exchangeRateProvider';

vi.mock('./exchangeRateProvider');


describe('getExchangeRate', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('calls the provider and returns the correct response', async () => {
        const mockExchangeRate = 1.25;
        exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(mockExchangeRate);

        const currencyCode = 'USD';
        const callback = vi.fn();

        await getExchangeRate(currencyCode, callback);

        expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: currencyCode,
            exchangeRate: mockExchangeRate,
        });
    });

    test('handles provider errors gracefully', async () => {
        const mockError = new Error('Provider error');
        exchangeRateProvider.callExchangeRateProvider.mockRejectedValue(mockError);

        const currencyCode = 'USD';
        const callback = vi.fn();

        await expect(getExchangeRate(currencyCode, callback)).rejects.toThrow('Provider error');

        expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
        expect(callback).not.toHaveBeenCalled();
    });

    test('should retrieve the exchange rate for a valid currency', async () => {
        const currencyCode = 'USD';
        const expectedExchangeRate = 1.25;
        const expectedResponse = {
            originalCurrency: 'GBP',
            newCurrency: currencyCode,
            exchangeRate: expectedExchangeRate,
        };

        exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(expectedExchangeRate);
        const mockCallback = vi.fn();

        await getExchangeRate(currencyCode, mockCallback);

        expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
        expect(mockCallback).toHaveBeenCalledWith(expectedResponse);
    });


    test('should call the provided callback function', async () => {
        const currencyCode = 'EUR';
        const expectedExchangeRate = 1.18;
        const expectedResponse = {
            originalCurrency: 'GBP',
            newCurrency: currencyCode,
            exchangeRate: expectedExchangeRate,
        };

        exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(expectedExchangeRate);
        const mockCallback = vi.fn();

        await getExchangeRate(currencyCode, mockCallback);

        expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
        expect(mockCallback).toHaveBeenCalledWith(expectedResponse);
    });
});
