import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import { getDiscount } from './discount.js';

describe('getDiscount', () => { let mock;
  beforeEach(() => { mock = new MockAdapter(axios); }); 
  it('should return discount information for a valid code', async () => { 
    const code = 'DISCOUNT2023'; const mockResponse = { discount: 20 };  
    mock.onGet('/discount', { params: { code } }).reply(200, mockResponse); 
    const response = await getDiscount(code);
    expect(response.data).toEqual(mockResponse); 
  });
    it('should handle errors correctly', async () => { 
      const code = 'INVALID_CODE';
      mock.onGet('/discount', { params: { code } }).reply(404, { error: 'Code not found' });
      try { 
        await getDiscount(code);
       } catch (error) { 
        expect(error.response.status).toBe(404);
         expect(error.response.data).toEqual({ error: 'Code not found' }); 
        } 
      }); 
    });
