import { describe, it, expect } from 'vitest';
import { getExchangeRate } from "../../promotions/exchange/exchange.js";
import exchangeRateProvider from "../../promotions/exchange/exchangeRateProvider.js";

// Mock du fournisseur de taux de change pour les tests
class MockExchangeRateProvider {
  async callExchangeRateProvider(currencyCode) {
    // Simulation d'un taux de change fictif pour les tests
    if (currencyCode === "USD") {
      return 1.2; // Exemple de taux de change fictif
    } else {
      throw new Error(`Currency ${currencyCode} not supported`);
    }
  }
}

// Remplacement du fournisseur de taux de change par le mock
const mockProvider = new MockExchangeRateProvider();
exchangeRateProvider.callExchangeRateProvider = mockProvider.callExchangeRateProvider.bind(mockProvider);

// Test de la fonction getExchangeRate
describe('getExchangeRate', () => {
  it('should retrieve exchange rate for USD', async () => {
    const callback = (response) => {
      expect(response.originalCurrency).toBe("GBP");
      expect(response.newCurrency).toBe("USD");
      expect(response.exchangeRate).toBe(1.2);
    };

    await getExchangeRate("USD", callback);
  });

  it('should throw an error for unsupported currency', async () => {
    try {
      await getExchangeRate("EUR", () => {});
    } catch (error) {
      expect(error.message).toBe("Currency EUR not supported");
    }
  });
});
