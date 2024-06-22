import { describe, expect, test, vi } from 'vitest'
import axios from 'axios';
import { getDiscount } from '../../../js/promotions/discount/discount'; // Replace with the path to your discount.js file

// Mock axios to avoid making actual network requests during tests
vi.mock('axios');


describe('GET DISCOUNT FUNCTION', () => {

    test('fetches discount data for a valid code', async () => {
        const mockData = {
            data: { isValid: true, type: 'MONEYOFF', value: 10 },
        };
        const mockResponse = {
            data: mockData,
            status: 200,
        };

        vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

        const discountCode = 'VALIDCODE';
        const response = await getDiscount(discountCode);

        expect(axios.get).toHaveBeenCalledWith('/discount', { params: { code: discountCode } });
        expect(response.data.data).toBe(mockData.data);
    });

    test('handles errors from the server', async () => {
        const mockError = new Error('Network error');
        const discountCode = 'ERRORCODE';

        vi.spyOn(axios, 'get').mockRejectedValue(mockError);

        try {
            await getDiscount(discountCode);
            fail('getDiscount should throw an error');
        } catch (error) {
            expect(axios.get).toHaveBeenCalledWith('/discount', { params: { code: discountCode } });
            expect(error).toEqual(mockError);
        }
    });
});