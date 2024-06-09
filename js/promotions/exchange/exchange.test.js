import getExchangeRate from './exchange';
import exchangeRateProvider from './exchangeRateProvider';

// Mock the exchangeRateProvider
jest.mock('./exchangeRateProvider', () => ({
    callExchangeRateProvider: jest.fn(),
}));

describe('Exchange Functions', () => {
    test('getExchangeRate calls the provider and returns the correct response', async () => {
        const mockExchangeRate = 1.25;
        exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(mockExchangeRate);

        const currencyCode = 'USD';
        const callback = jest.fn();

        await getExchangeRate(currencyCode, callback);

        expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: currencyCode,
            exchangeRate: mockExchangeRate,
        });
    });

    test('getExchangeRate handles provider errors gracefully', async () => {
        const mockError = new Error('Provider error');
        exchangeRateProvider.callExchangeRateProvider.mockRejectedValue(mockError);

        const currencyCode = 'USD';
        const callback = jest.fn();

        await expect(getExchangeRate(currencyCode, callback)).rejects.toThrow('Provider error');

        expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
        expect(callback).not.toHaveBeenCalled();
    });
});
