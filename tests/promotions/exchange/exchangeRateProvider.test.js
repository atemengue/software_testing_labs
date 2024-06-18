import {describe, it, expect} from 'vitest';
// Import de la fonction à tester
import exchangeRateProvider from '../../../js/promotions/exchange/exchangeRateProvider';

describe('callExchangeRateProvider', () => {
    it('Doit me retourner le taux d echange correct pour USD', () => {
        const exchangeRate = exchangeRateProvider.callExchangeRateProvider('USD');
        expect(exchangeRate).toBe(1.25);
    });

    it('Doit me retourner le taux d echange correct pour EUR', () => {
        const exchangeRate = exchangeRateProvider.callExchangeRateProvider('EUR');
        expect(exchangeRate).toBe(1.18);
    });

    it('Doit me retourner le taux d echange correct pour NZD', () => {
        const exchangeRate = exchangeRateProvider.callExchangeRateProvider('NZD');
        expect(exchangeRate).toBe(1.93);
    });

    it('Doit me generer le message d erreur <Currency not supported>si le taux d echange n est pas valide', () => {
        expect(() => {
            exchangeRateProvider.callExchangeRateProvider('AUD');
        }).toThrowError('Currency not supported');
    });
});
