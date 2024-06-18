import { describe, it, expect, vi } from 'vitest';
import getExchangeRate from '../../js/promotions/exchange/exchange';
import exchangeRateProvider from '../../js/promotions/exchange/exchangeRateProvider';

// Mocking exchangeRateProvider
vi.mock('../../js/promotions/exchange/exchangeRateProvider', () => {
    return {
        default: {
            callExchangeRateProvider: vi.fn((currencyCode) => {
                switch (currencyCode) {
                    case "USD":
                        return 1.25;
                    case "EUR":
                        return 1.18;
                    case "NZD":
                        return 1.93;
                    default:
                        throw new Error("Currency not supported");
                }
            })
        }
    };
});

describe('getExchangeRate function', () => {
    it('should return the correct exchange rate for USD', async () => {
        const callback = vi.fn();
        await getExchangeRate('USD', callback);
        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: 'USD',
            exchangeRate: 1.25
        });
    });

    it('should return the correct exchange rate for EUR', async () => {
        const callback = vi.fn();
        await getExchangeRate('EUR', callback);
        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: 'EUR',
            exchangeRate: 1.18
        });
    });

    it('should return the correct exchange rate for NZD', async () => {
        const callback = vi.fn();
        await getExchangeRate('NZD', callback);
        expect(callback).toHaveBeenCalledWith({
            originalCurrency: 'GBP',
            newCurrency: 'NZD',
            exchangeRate: 1.93
        });
    });

    it('should throw an error for unsupported currency', async () => {
        const callback = vi.fn();
        try {
            await getExchangeRate('AUD', callback);
        } catch (error) {
            expect(error).toEqual(new Error('Currency not supported'));
        }
        expect(callback).not.toHaveBeenCalled();
    });
});
