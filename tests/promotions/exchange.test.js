// import { describe, it, expect, vi } from 'vitest';
// import getExchangeRate from '../software_testing_labs/js/promotions/exchange/exchange';
// import exchangeRateProvider from '../software_testing_labs/js/promotions/exchange/exchangeRateProvider';

// // Mocking exchangeRateProvider
// vi.mock('../software_testing_labs/js/promotions/exchange/exchangeRateProvider', () => ({
//     callExchangeRateProvider: vi.fn()
// }));

// describe('getExchangeRate', () => {
//     it('should call exchangeRateProvider and return the exchange rate', async () => {
//         // Arrange
//         const currencyCode = 'USD';
//         const exchangeRate = 1.2;
//         exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(exchangeRate);

//         // Act
//         const callback = vi.fn();
//         await getExchangeRate(currencyCode, callback);

//         // Assert
//         expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
//         expect(callback).toHaveBeenCalledWith({
//             "originalCurrency": "GBP",
//             "newCurrency": currencyCode,
//             "exchangeRate": exchangeRate
//         });
//     });

//     it('should handle errors from exchangeRateProvider', async () => {
//         // Arrange
//         const currencyCode = 'USD';
//         const errorMessage = 'API Error';
//         exchangeRateProvider.callExchangeRateProvider.mockRejectedValue(new Error(errorMessage));

//         // Act
//         const callback = vi.fn();
//         try {
//             await getExchangeRate(currencyCode, callback);
//         } catch (e) {
//             // Assert
//             expect(e.message).toBe(errorMessage);
//         }

//         expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
//         expect(callback).not.toHaveBeenCalled();
//     });
// });
