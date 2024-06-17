import { describe, it, expect, vi } from 'vitest';
import getExchangeRate from '../../js/promotions/exchange/exchange';
import exchangeRateProvider from '../../js/promotions/exchange/exchangeRateProvider';

vi.mock('../../js/promotions/exchange/exchangeRateProvider');

describe('getExchangeRate', () => {
    it('should call the callback with the correct response for USD', async () => {
        exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(1.25);

        const callback = vi.fn();
        const currencyCode = 'USD';

        await getExchangeRate(currencyCode, callback);

        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: currencyCode,
            exchangeRate: 1.25
        });
    });

    it('should call the callback with the correct response for EUR', async () => {
        exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(1.18);

        const callback = vi.fn();
        const currencyCode = 'EUR';

        await getExchangeRate(currencyCode, callback);

        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: currencyCode,
            exchangeRate: 1.18
        });
    });

    it('should call the callback with the correct response for NZD', async () => {
        exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(1.93);

        const callback = vi.fn();
        const currencyCode = 'NZD';

        await getExchangeRate(currencyCode, callback);

        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: currencyCode,
            exchangeRate: 1.93
        });
    });

    it('should throw an error for unsupported currency', async () => {
        exchangeRateProvider.callExchangeRateProvider.mockImplementation(() => {
            throw new Error('Currency not supported');
        });

        const callback = vi.fn();
        const currencyCode = 'ABC';

        await expect(getExchangeRate(currencyCode, callback)).rejects.toThrow('Currency not supported');
    });
});
