import { describe, test, expect, vi, afterEach } from 'vitest';
import axios from 'axios';
import { getDiscount } from '../../../js/promotions/discount/discount';

vi.mock('axios');

describe('getDiscount', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('doit recuper le discount du code offert', async () => {
    const mockCode = 'DISCOUNT10';
    const mockResponse = {
      data: {
        discount: 0.1,
      },
    };

    vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    const response = await getDiscount(mockCode);

    expect(axios.get).toHaveBeenCalledWith('/discount', {
      params: {
        code: mockCode,
      },
    });
    expect(response).toEqual(mockResponse);
  });

  test('doitme renvoyerune erreur si la tequete echoue', async () => {
    const mockCode = 'INVALID_CODE';
    const mockError = new Error('Network Error');

    vi.spyOn(axios, 'get').mockRejectedValue(mockError);

    await expect(getDiscount(mockCode)).rejects.toThrow(mockError);
    expect(axios.get).toHaveBeenCalledWith('/discount', {
      params: {
        code: mockCode,
      },
    });
  });
});