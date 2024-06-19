import { describe, it, expect, vi } from "vitest";
import axios from 'axios'
import { getDiscount } from "../../../js/promotions/discount/discount";

// We start by mocking the axios module.
vi.mock('axios');

describe('getDiscount', () => {
    it('should fetch discount data from the API', async () => {
        // We define a mock response that the API would return.
      const mockResponse = {
        data: {
          isValid: true,
          type: 'MONEYOFF',
          value: 20,
          minSpend: 100
        }
      };
  
      // simulating the API returning a successful response.
      axios.get.mockResolvedValue(mockResponse);
  
      const code = 'DISCOUNTCODE';
      const response = await getDiscount(code);
  
      // We call the getDiscount function and verify that it calls axios.get with the correct URL and parameters.
      expect(axios.get).toHaveBeenCalledWith('/discount', { params: { code } });
      // We also check that the response from getDiscount matches the mock response.
      expect(response).toEqual(mockResponse);
    });
  
    it('should return error if API request fails', async () => {
      // We define a mock error that the API would return if the request fails.
      const mockError = new Error('API request failed');
      // simulating the API returning an error.
      axios.get.mockRejectedValue(mockError);
  
      const code = 'INVALIDCODE';
  
      await expect(getDiscount(code)).rejects.toThrow('API request failed');
      expect(axios.get).toHaveBeenCalledWith('/discount', { params: { code } });
    });
  });