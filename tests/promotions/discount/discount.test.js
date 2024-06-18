// discount.test.js
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { getDiscount } from '../../../js/promotions/discount/discount';

describe('getDiscount Function', () => {

  it('should return the response from the API', async () => {
    // Arrange
    const mockResponse = { data: { discount: 10 } };
    vi.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);

    // Act
    const response = await getDiscount('PROMO10');

    // Assert
    expect(axios.get).toHaveBeenCalledWith('/discount', { params: { code: 'PROMO10' } });
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error if the API call fails', async () => {
    // Arrange
    const mockError = new Error('API request failed');
    vi.spyOn(axios, 'get').mockRejectedValueOnce(mockError);

    // Act & Assert
    await expect(getDiscount('INVALIDCODE')).rejects.toThrow(mockError);
  });
});