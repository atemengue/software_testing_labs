import { describe, it, vi, expect } from 'vitest';
import getExchangeRate from '../../../js/promotions/exchange/exchange';
import exchangeRateProvider from '../../../js/promotions/exchange/exchangeRateProvider';

describe('getExchangeRate', () => {


    it('Doit appeler exchangeRateProvider.callExchangeRateProvider avec un code correct', async () => {
        const currencyCode = 'USD';
        const exchangeRate = 1.2345;

        vi.spyOn(exchangeRateProvider, 'callExchangeRateProvider').mockResolvedValue(exchangeRate);

        const callback = vi.fn();
        await getExchangeRate(currencyCode, callback);

        expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    });

    it('Doit appeler le callback avec un object correct associé comme reponse', async () => {
        const currencyCode = 'EUR';
        const exchangeRate = 0.9876;

        vi.spyOn(exchangeRateProvider, 'callExchangeRateProvider').mockResolvedValue(exchangeRate);

        const callback = vi.fn();
        await getExchangeRate(currencyCode, callback);

        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: currencyCode,
            exchangeRate: exchangeRate,
        });
    });

    it('Dois gerer correctement les erreurs liées à exchangeRateProvider.callExchangeRateProvider', async () => {
        const currencyCode = 'JPY';
        const error = new Error('Error fetching exchange rate');

        vi.spyOn(exchangeRateProvider, 'callExchangeRateProvider').mockRejectedValue(error);

        const callback = vi.fn();
        await expect(getExchangeRate(currencyCode, callback)).rejects.toThrow(error);
    });
});