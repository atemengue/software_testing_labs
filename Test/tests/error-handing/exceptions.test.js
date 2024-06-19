import { it, vi, expect, describe } from 'vitest';
import {
    InvalidEventNameError,
    InvalidEventPriceError,
    InvalidReferralCodeError,
    InvalidUsernameError,
    UserHasAccountError,
  } from '../js/error-handling/exceptions';
  
  describe('InvalidEventNameError', () => {
    it('should create an instance of InvalidEventNameError with the correct error message', () => {
      const error = new InvalidEventNameError('Invalid event name');
      expect(error instanceof InvalidEventNameError).toBe(true);
      expect(error.message).toBe('Invalid event name');
    });
  });
  
  describe('InvalidEventPriceError', () => {
    it('should create an instance of InvalidEventPriceError with the correct error message', () => {
      const error = new InvalidEventPriceError('Invalid event price');
      expect(error instanceof InvalidEventPriceError).toBe(true);
      expect(error.message).toBe('Invalid event price');
    });
  });
  
  describe('InvalidReferralCodeError', () => {
    it('should create an instance of InvalidReferralCodeError with the correct error message', () => {
      const error = new InvalidReferralCodeError('Invalid referral code');
      expect(error instanceof InvalidReferralCodeError).toBe(true);
      expect(error.message).toBe('Invalid referral code');
    });
  });
  
  describe('InvalidUsernameError', () => {
    it('should create an instance of InvalidUsernameError with the correct error message', () => {
      const error = new InvalidUsernameError('Invalid username');
      expect(error instanceof InvalidUsernameError).toBe(true);
      expect(error.message).toBe('Invalid username');
    });
  });
  
  describe('UserHasAccountError', () => {
    it('should create an instance of UserHasAccountError with the correct error message', () => {
      const error = new UserHasAccountError('User already has an account');
      expect(error instanceof UserHasAccountError).toBe(true);
      expect(error.message).toBe('User already has an account');
    });
  });