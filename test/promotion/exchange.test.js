import { describe, it, expect, vi } from 'vitest';
import getExchangeRate from '../../js/promotions/exchange/exchange';
import exchangeRateProvider from '../../js/promotions/exchange/exchangeRateProvider';

describe('getExchangeRate', () => {
    it('should return the correct exchange rate response for USD', async () => {
        // Mock the callExchangeRateProvider method
        vi.spyOn(exchangeRateProvider, 'callExchangeRateProvider').mockResolvedValue(1.25);

        const callback = vi.fn();

        await getExchangeRate('USD', callback);

        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: 'USD',
            exchangeRate: 1.25
        });

        // Restore the original implementation
        exchangeRateProvider.callExchangeRateProvider.mockRestore();
    });

    it('should return the correct exchange rate response for EUR', async () => {
        // Mock the callExchangeRateProvider method
        vi.spyOn(exchangeRateProvider, 'callExchangeRateProvider').mockResolvedValue(1.18);

        const callback = vi.fn();

        await getExchangeRate('EUR', callback);

        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: 'EUR',
            exchangeRate: 1.18
        });

        // Restore the original implementation
        exchangeRateProvider.callExchangeRateProvider.mockRestore();
    });

    it('should throw an error for unsupported currency', async () => {
        // Mock the callExchangeRateProvider method to throw an error
        vi.spyOn(exchangeRateProvider, 'callExchangeRateProvider').mockImplementation(() => {
            throw new Error('Currency not supported');
        });

        const callback = vi.fn();

        await expect(getExchangeRate('ABC', callback)).rejects.toThrow('Currency not supported');

        // Ensure callback was not called
        expect(callback).not.toHaveBeenCalled();

        // Restore the original implementation
        exchangeRateProvider.callExchangeRateProvider.mockRestore();
    });
});
