import { describe, it, expect, vi } from 'vitest';
import getExchangeRate from './exchange';
import exchangeRateProvider from './exchangeRateProvider';

vi.mock('./exchangeRateProvider');

describe('getExchangeRate', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should retrieve the exchange rate for a valid currency', async () => {
    // Arrange
    const currencyCode = 'USD';
    const expectedExchangeRate = 1.25;
    const expectedResponse = {
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      exchangeRate: expectedExchangeRate,
    };

    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockReturnValue(expectedExchangeRate);
    const mockCallback = vi.fn();

    // Act
    await getExchangeRate(currencyCode, mockCallback);

    // Assert
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    expect(mockCallback).toHaveBeenCalledWith(expectedResponse);
  });

  it('should handle an invalid currency', async () => {
    // Arrange
    const currencyCode = 'INVALID';
    const expectedResponse = {
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      error: 'Currency not supported',
    };
  
    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockImplementationOnce(() => {
      throw new Error('Currency not supported');
    });
    const mockCallback = vi.fn();
  
    // Act
    await getExchangeRate(currencyCode, mockCallback);
  
    // Assert
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    expect(mockCallback).toHaveBeenCalledWith(expectedResponse);
  });
  

  it('should call the provided callback function', async () => {
    // Arrange
    const currencyCode = 'EUR';
    const expectedExchangeRate = 1.18;
    const expectedResponse = {
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      exchangeRate: expectedExchangeRate,
    };

    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockReturnValue(expectedExchangeRate);
    const mockCallback = vi.fn();

    // Act
    await getExchangeRate(currencyCode, mockCallback);

    // Assert
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    expect(mockCallback).toHaveBeenCalledWith(expectedResponse);
  });
});
