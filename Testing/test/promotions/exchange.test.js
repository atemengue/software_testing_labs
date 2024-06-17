import {describe,expect,it,vi,afterEach} from 'vitest'
import { getExchangeRate} from '../../../js/promotions/exchange/exchange';

vi.mock('../../../js/promotions/exchange/exchangeRateProvider', () => {
  return {
    __esModule: true,
    default: {
      callExchangeRateProvider: vi.fn(),
    },
  };
});

describe('getExchangeRate', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

    it('should call the callback with the expected response', async () => {
    const currencyCode = 'USD';
    const callback = vi.fn();
    const exchangeRateProvider = await import('../../../js/promotions/exchange/exchangeRateProvider');
    const expectedResponse = {
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      exchangeRate: 1.25,
    };

   vi.mocked(exchangeRateProvider.default.callExchangeRateProvider).mockResolvedValue(1.25);

    await getExchangeRate(currencyCode, callback);

    expect(exchangeRateProvider.default.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    expect(callback).toHaveBeenCalledWith(expectedResponse);
  });

  it('should call exchangeRateProvider with the provided currencyCode', async () => {
    const currencyCode = 'USD';
    const callback = vi.fn();
    const exchangeRateProvider = await import('../../../js/promotions/exchange/exchangeRateProvider');

    vi.mocked(exchangeRateProvider.default.callExchangeRateProvider).mockResolvedValue(1.25);

    await getExchangeRate(currencyCode, callback);

    expect(exchangeRateProvider.default.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
    expect(callback).toHaveBeenCalledWith({
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      exchangeRate: 1.25,
    });
  });

 it('should throw an error for an unsupported currency', async () => {

  vi.mock('../../../js/promotions/exchange/exchangeRateProvider', () => ({
    __esModule: true,
    default: {
      callExchangeRateProvider: vi.fn(() => {
        throw new Error('Currency not supported');
      }),
    },
  }));

  const currencyCode = 'JPY';
  const callback = vi.fn();

  try {
    await getExchangeRate(currencyCode, callback);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Currency not supported');
    expect(callback).not.toHaveBeenCalled();
  }
});
});