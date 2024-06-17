import {expect,it,describe,vi,afterEach,rejects,undefined} from 'vitest'
import { getDiscount} from '../../../js/promotions/discount/discount'
import axios from 'axios';

vi.mock('axios');
describe('getDiscount', () => {;
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call axios.get with the correct URL and params', async () => {
    const code = 'MY_DISCOUNT_CODE';
    const params = { code };
    const response = { data: 'discount data' };
    axios.get.mockResolvedValue(response);

    await getDiscount(code);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/discount', { params });
  });

  it('should return the response from axios.get', async () => {
    const code = 'MY_DISCOUNT_CODE';
    const response = { data: 'discount data' };
    axios.get.mockResolvedValue(response);

    const result = await getDiscount(code);

    expect(result).toBe(response);
  });

  it('should throw an error if axios.get rejects', async () => {
    const code = 'MY_DISCOUNT_CODE';
    const error = new Error('axios error');
    axios.get.mockRejectedValue(error);

    await expect(getDiscount(code)).rejects.toEqual(error);
  });

  it('should handle empty code', async () => {
    const code = '';
    await expect(getDiscount(code)).resolves.toBeUndefined();
  });
  it('should handle null code', async () => {
    const code = null;
    await expect(getDiscount(code)).resolves.toBeUndefined();
  });

  it('should handle undefined code', async () => {
  const code = undefined;

  await expect(getDiscount(code)).resolves.toBeUndefined();
});
});
