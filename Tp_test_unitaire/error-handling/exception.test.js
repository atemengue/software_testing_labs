import { describe, it, expect } from 'vitest';
import {
    InvalidEventNameError,
    InvalidEventPriceError,
    InvalidReferralCodeError,
    InvalidUsernameError,
    UserHasAccountError
} from './exceptions.js'; // Adjust the path accordingly

describe('Custom Error Classes', () => {
    it('should create an instance of InvalidEventNameError', () => {
        const errorMessage = 'Invalid event name';
        const error = new InvalidEventNameError(errorMessage);
        expect(error).toBeInstanceOf(InvalidEventNameError);
        expect(error.message).toBe(errorMessage);
        expect(error).toBeInstanceOf(Error);
    });

    it('should create an instance of InvalidEventPriceError', () => {
        const errorMessage = 'Invalid event price';
        const error = new InvalidEventPriceError(errorMessage);
        expect(error).toBeInstanceOf(InvalidEventPriceError);
        expect(error.message).toBe(errorMessage);
        expect(error).toBeInstanceOf(Error);
    });

    it('should create an instance of InvalidUsernameError', () => {
        const errorMessage = 'Invalid username';
        const error = new InvalidUsernameError(errorMessage);
        expect(error).toBeInstanceOf(InvalidUsernameError);
        expect(error.message).toBe(errorMessage);
        expect(error).toBeInstanceOf(Error);
    });

    it('should create an instance of InvalidReferralCodeError', () => {
        const errorMessage = 'Invalid referral code';
        const error = new InvalidReferralCodeError(errorMessage);
        expect(error).toBeInstanceOf(InvalidReferralCodeError);
        expect(error.message).toBe(errorMessage);
        expect(error).toBeInstanceOf(Error);
    });

    it('should create an instance of UserHasAccountError', () => {
        const errorMessage = 'User already has an account';
        const error = new UserHasAccountError(errorMessage);
        expect(error).toBeInstanceOf(UserHasAccountError);
        expect(error.message).toBe(errorMessage);
        expect(error).toBeInstanceOf(Error);
    });
});