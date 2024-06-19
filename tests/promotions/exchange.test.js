import { describe, it, expect, vi, afterEach } from 'vitest';
import getExchangeRate from '../../js/promotions/exchange/exchange';
import exchangeRateProvider from '../../js/promotions/exchange/exchangeRateProvider';

vi.mock('../../js/promotions/exchange/exchangeRateProvider');
/*vi.mock('../../js/promotions/exchange/exchangeRateProvider', () => {
    return {
      callExchangeRateProvider: vi.fn().mockReturnValue(1.25)
    };
  });*/

describe('getExchangeRate', () => {
  it('should call the callExchangeRateProvider', async () => {
    const currencyCode = 'USD';
    const exchangeRate = 1.25;
    const mockCallback = vi.fn();
    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockResolvedValue(exchangeRate);

    await getExchangeRate(currencyCode, mockCallback);
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenLastCalledWith(currencyCode);
  });

  it('should call the callback with correct response', async () => {
    const currencyCode = 'USD';
    const exchangeRate = 1.25;
    const mockCallback = vi.fn();

    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockResolvedValue(exchangeRate);

    await getExchangeRate(currencyCode, mockCallback);

    expect(mockCallback).toHaveBeenLastCalledWith({
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      exchangeRate: exchangeRate,
    });
  });

  it('should handle unsupported currency codes', async () => {
    const currencyCode = 'JPY';

    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockImplementation(() => {
      throw new Error('Currency not supported');
    });

    const callback = vi.fn();
    await expect(getExchangeRate(currencyCode, callback)).rejects.toThrow('Currency not supported');
  });
});
