import { describe, expect, test, it } from "vitest";
import  exchangeRateProvider  from '../../../js/promotions/exchange/exchangeRateProvider';


describe("callExchangeRateProvider", () => {
    
    it.each([
        { scenario: 'currencyCode = USD', currencyCode: 'USD', result: 1.25 },
        { scenario: 'currencyCode = EUR', currencyCode: 'EUR', result: 1.18 },
        { scenario: 'currencyCode = NZD', currencyCode: 'NZD', result: 1.93 },
        ])('doit me retourner $result si $scenario', ({ currencyCode,result }) => {
            expect(exchangeRateProvider.callExchangeRateProvider(currencyCode)).toBe(result);
            });
                test("doit me renvoyer l\'erreur Currency not supported si currencycode d\'est egale a aucune des valeurs suivantes: USD, EUR, NZD", () => {
                    const currencyCode = "PYZ";
                    expect(() => exchangeRateProvider.callExchangeRateProvider(currencyCode)).toThrowError('Currency not supported');
                });
});