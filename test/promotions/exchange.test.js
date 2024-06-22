
import { describe, it, expect, vi } from 'vitest';
import exchangeRateProvider from '../../js/promotions/exchange/exchangeRateProvider';
import getExchangeRate from '../../js/promotions/exchange/exchange';

vi.mock('../../js/promotions/exchange/exchangeRateProvider');

describe('getExchangeRate', () => {
  it('should call the exchange rate provider and return the expected response', async () => {
    // Arrange
    const currencyCode = 'USD';
    const expectedExchangeRate = 1.25;
    const expectedResponse = {
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      exchangeRate: expectedExchangeRate,
    };

    // Mock the exchange rate provider
    exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(expectedExchangeRate);

    // Act
    const callback = vi.fn();
    await getExchangeRate(currencyCode, callback);

    // Assert
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    expect(callback).toHaveBeenCalledWith(expectedResponse);
  });
});


/* Nous utilisons également vi.mock('../exchangeRateProvider') 
pour remplacer l'implémentation réelle de exchangeRateProvider.callExchangeRateProvider par un mock, 
afin de pouvoir contrôler le comportement de cette dépendance pendant le test.

Ce test vérifie que la fonction getExchangeRate appelle correctement 
le fournisseur de taux de change et retourne la réponse attendue. */