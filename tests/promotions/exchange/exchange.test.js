import { describe, test, expect, vi } from "vitest";
import getExchangeRate from '../../../js/promotions/exchange/exchange';
import exchangeRateProvider from '../../../js/promotions/exchange/exchangeRateProvider';




describe("GET EXCHANGE RATE", () => {

    vi.mock('../../../js/promotions/exchange/exchangeRateProvider');

    test('returns correct data for supported currencies', async () => {
        const mockCallback = vi.fn(); // Mock callback function

        vi.mocked(exchangeRateProvider.callExchangeRateProvider)
        .mockReturnValueOnce(1.25)
        .mockReturnValueOnce(1.18)
        .mockReturnValueOnce(1.93);

        await getExchangeRate('USD', mockCallback);
        await getExchangeRate('EUR', mockCallback);
        await getExchangeRate('NZD', mockCallback);

        const expectedResponses = [
            { originalCurrency: 'GBP', newCurrency: 'USD', exchangeRate: 1.25 },
            { originalCurrency: 'GBP', newCurrency: 'EUR', exchangeRate: 1.18 },
            { originalCurrency: 'GBP', newCurrency: 'NZD', exchangeRate: 1.93 },
        ];

        expect(mockCallback).toHaveBeenCalledTimes(3);

        expectedResponses.forEach((expected, index) => {
            expect(mockCallback.mock.calls[index][0]).toEqual(expected);
        });
    });

    test('throws error for unsupported currencies', async () => {
        const mockCallback = vi.fn();

        // Mock exchangeRateProvider to throw error
        vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockRejectedValue(new Error('Currency not supported'));

        try {
            await getExchangeRate('UNKNOWN', mockCallback);
            fail('getExchangeRate should throw an error'); // This line should not be reached
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });


})