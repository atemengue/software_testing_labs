import { describe, it, expect } from 'vitest';
import { InvalidEventNameError,UserHasAccountError,InvalidEventPriceError,InvalidUsernameError,InvalidReferralCodeError} from '../../../js/error-handling/exceptions';

describe('InvalidEventNameError', () => {
  it('should be an instance of Error', () => {
    const error = new InvalidEventNameError('Invalid event name');
    expect(error).toBeInstanceOf(Error);
  });

  it('should have the correct error message', () => {
    const errorMessage = 'Invalid event name';
    const error = new InvalidEventNameError(errorMessage);
    expect(error.message).toBe(errorMessage);
  });

  it('should have the correct name', () => {
    const error = new InvalidEventNameError('Invalid event name');
    expect(error.name).toMatch(/Error/);
  });

  it('should have a stack trace', () => {
    const error = new InvalidEventNameError('Invalid event name');
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
  });
});


describe('InvalidEventPriceError', () => {
  it('should be an instance of Error', () => {
    const error = new InvalidEventPriceError('Invalid event price');
    expect(error).toBeInstanceOf(Error);
  });

  it('should have the correct error message', () => {
    const errorMessage = 'Invalid event price';
    const error = new InvalidEventPriceError(errorMessage);
    expect(error.message).toBe(errorMessage);
  });

  it('should have the correct name', () => {
    const error = new InvalidEventPriceError('Invalid event price');
    expect(error.name).toMatch(/Error/);
  });

  it('should have a stack trace', () => {
    const error = new InvalidEventPriceError('Invalid event price');
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
  });
});

describe('InvalidUsernameError', () => {
  it('should be an instance of Error', () => {
    const error = new InvalidUsernameError('Invalid username');
    expect(error).toBeInstanceOf(Error);
  });

  it('should have the correct error message', () => {
    const errorMessage = 'Invalid username';
    const error = new InvalidUsernameError(errorMessage);
    expect(error.message).toBe(errorMessage);
  });

  it('should have the correct name', () => {
    const error = new InvalidUsernameError('Invalid username');
    expect(error.name).toMatch(/Error/);
  });

  it('should have a stack trace', () => {
    const error = new InvalidUsernameError('Invalid username');
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
  });
});

describe('InvalidReferralCodeError', () => {
  it('should be an instance of Error', () => {
    const error = new InvalidReferralCodeError('Invalid referral code');
    expect(error).toBeInstanceOf(Error);
  });

  it('should have the correct error message', () => {
    const errorMessage = 'Invalid referral code';
    const error = new InvalidReferralCodeError(errorMessage);
    expect(error.message).toBe(errorMessage);
  });

  it('should have the correct name', () => {
    const error = new InvalidReferralCodeError('Invalid referral code');
    expect(error.name).toMatch(/Error/);
  });

  it('should have a stack trace', () => {
    const error = new InvalidReferralCodeError('Invalid referral code');
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
  });
});

describe('UserHasAccountError', () => {
  it('should be an instance of Error', () => {
    const error = new UserHasAccountError('User already has an account');
    expect(error).toBeInstanceOf(Error);
  });

  it('should have the correct error message', () => {
    const errorMessage = 'User already has an account';
    const error = new UserHasAccountError(errorMessage);
    expect(error.message).toBe(errorMessage);
  });

  it('should have the correct name', () => {
    const error = new UserHasAccountError('User already has an account');
    expect(error.name).toMatch(/Error/);
  });

  it('should have a stack trace', () => {
    const error = new UserHasAccountError('User already has an account');
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
  });
});