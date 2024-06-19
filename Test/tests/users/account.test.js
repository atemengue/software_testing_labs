// createAccount.test.js
import {
  describe,
  expect,
  it,
} from 'vitest';

import { isValidUserName } from './account.js';

describe('isValidUserName function', () => {
  it('should return false when username is empty', async () => {
    const result = await isValidUserName('');
    expect(result).toBe(false);
  });

  it('should return false when username does not contain "@"', async () => {
    const result = await isValidUserName('username');
    expect(result).toBe(false);
  });

  it('should return true when username contains "@"', async () => {
    const result = await isValidUserName('user@domain.com');
    expect(result).toBe(true);
  });

  it('should return false when username is null', async () => {
    const result = await isValidUserName(null);
    expect(result).toBe(false);
  });

  it('should return false when username is undefined', async () => {
    const result = await isValidUserName(undefined);
    expect(result).toBe(false);
  });
});


