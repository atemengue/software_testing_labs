import { describe, it, expect } from "vitest";
import getExchangeRate from "../../../js/promotions/exchange/exchange";

describe('getExchangeRate', () => {
    it('should return the correct exchange rate for supported currencies', async () => {
      const callback = (response) => {
        expect(response).toEqual({
          originalCurrency: 'GBP',
          newCurrency: 'USD',
          exchangeRate: 1.25,
        });
      };
  
      await getExchangeRate('USD', callback);
    });
  
    it('should throw an error for unsupported currencies', async () => {
      await expect(getExchangeRate('JPY', () => {})).rejects.toThrow('Currency not supported');
    });
  });