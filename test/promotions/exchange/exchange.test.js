import { describe, it, expect, vi } from 'vitest';
import exchangeRateProvider from './../../../js/promotions/exchange/exchangeRateProvider';
import getExchangeRate from './../../../js/promotions/exchange/exchange';

vi.mock("./../../../js/promotions/exchange/exchangeRateProvider");

describe('getExchangeRate', () => {
    it('should fetch exchange rate correctly', async () => {
        const currencyCode = 'USD';
        const mockExchangeRate = 1.25;

        vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockResolvedValue(mockExchangeRate);

        const callback = vi.fn();
        await getExchangeRate(currencyCode, callback);

        expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);

        const response = callback.mock.calls[0][0];
        expect(response.originalCurrency).toBe('GBP');
        expect(response.newCurrency).toBe(currencyCode);
        expect(response.exchangeRate).toBe(mockExchangeRate);
    });
});
