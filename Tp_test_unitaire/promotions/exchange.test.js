import { vi, expect, test } from 'vitest';
import getExchangeRate from './exchange';
import exchangeRateProvider from './exchangeRateProvider';

vi.mock('./exchangeRateProvider');

test('getExchangeRate handles successful exchange rate fetch', async () => {
  // Arrange
  const currencyCode = 'USD';
  const exchangeRate = 1.23;
  exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(exchangeRate);

  // Act
  const callback = vi.fn();
  await getExchangeRate(currencyCode, callback);

  // Assert
  expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
  expect(callback).toHaveBeenCalledWith({
    originalCurrency: 'GBP',
    newCurrency: currencyCode,
    exchangeRate,
  });
});


// Test de gestion d'un code de devise non valide
test('getExchangeRate gère un code de devise non valide', async () => {
    const currencyCode = 'XYZ';
    exchangeRateProvider.callExchangeRateProvider.mockRejectedValue(new Error('Code de devise non valide'));
  
    const callback = vi.fn();
    await expect(getExchangeRate(currencyCode, callback)).rejects.toThrow('Code de devise non valide');
  
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    expect(callback).not.toHaveBeenCalled();
  });
  
  // Test de gestion d'une erreur réseau
  test('getExchangeRate gère une erreur réseau', async () => {
    const currencyCode = 'EUR';
    exchangeRateProvider.callExchangeRateProvider.mockRejectedValue(new Error('Erreur réseau'));
  
    const callback = vi.fn();
    await expect(getExchangeRate(currencyCode, callback)).rejects.toThrow('Erreur réseau');
  
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    expect(callback).not.toHaveBeenCalled();
  });
  
  // Test de gestion d'une réponse vide du fournisseur de taux de change
  test('getExchangeRate gère une réponse vide du fournisseur de taux de change', async () => {
    const currencyCode = 'AUD';
    exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(null);
  
    const callback = vi.fn();
    await getExchangeRate(currencyCode, callback);
  
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    expect(callback).toHaveBeenCalledWith({
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      exchangeRate: null,
    });
  });
 
 