import { describe, expect, vi, test, afterEach } from "vitest";
import  getExchangeRate  from '../../../js/promotions/exchange/exchange';
import  exchangeRateProvider  from '../../../js/promotions/exchange/exchangeRateProvider';


describe('getExchangeRate', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });
  
    test('doit appeler exchangeRateProvider et renvoyer exchangeRate', () => {
      const currencyCode = 'USD';
      const exchangeRate = 1.25;
  
      // Mock the callExchangeRateProvider function
      const spy = vi.spyOn(exchangeRateProvider, 'callExchangeRateProvider').mockReturnValue(exchangeRate);

      const callback = (response) => {
        expect(response).toEqual({
          originalCurrency: 'GBP',
          newCurrency: currencyCode,
          exchangeRate: exchangeRate,
        });
      };
  
      getExchangeRate(currencyCode, callback);
  
      expect(spy).toHaveBeenCalledWith(currencyCode);
    });
  
    test('doit appeler la fonction callback avec un response correct', async () => {
      const currencyCode = 'EUR';
      const exchangeRate = 1.18;
  
      // Mock the callExchangeRateProvider function
      vi.spyOn(exchangeRateProvider, 'callExchangeRateProvider').mockReturnValue(exchangeRate);
  
      const callback = vi.fn();
  
        getExchangeRate(currencyCode, callback);
  
      expect(callback).toHaveBeenCalledWith({
        originalCurrency: 'GBP',
        newCurrency: currencyCode,
        exchangeRate: exchangeRate,
      });
    });
  });