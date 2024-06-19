import { describe, it, expect, vi } from 'vitest';
import { getDiscount } from '../../../js/promotions/discount/discount';
import axios from "axios";

vi.mock("axios");

describe('getDiscount', () => {
    it('should fetch discount data successfully', async () => {
        const code = 'VALID_CODE';
        const mockResponse = {
            data: {
                isValid: true,
                type: 'MONEYOFF',
                value: 20,
                minSpend: 50,
            },
            status: 200,
        };

        vi.mocked(axios.get).mockResolvedValue(mockResponse);

        const response = await getDiscount(code);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(mockResponse.data);
    });

    it('should handle invalid discount code', async () => {
        const code = 'INVALID_CODE';
        const mockErrorResponse = {
            response: {
                status: 404,
            },
        };

        vi.mocked(axios.get).mockRejectedValue(mockErrorResponse);

        try {
            await getDiscount(code);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });

    it('should handle network errors', async () => {
        const code = 'NETWORK_ERROR';
        const mockNetworkError = new Error('Network Error');

        vi.mocked(axios.get).mockRejectedValue(mockNetworkError);

        try {
            await getDiscount(code);
        } catch (error) {
            expect(error.message).toContain('Network Error');
        }
    });
});