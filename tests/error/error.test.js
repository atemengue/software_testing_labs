import { describe, it, expect } from 'vitest';
import {
    InvalidEventNameError,
    InvalidEventPriceError,
    InvalidReferralCodeError,
    InvalidUsernameError,
    UserHasAccountError
} from '../../js/error-handling/exceptions';     

describe('Custom Error Classes', () => {
    it('should create an instance of InvalidEventNameError', () => {
        const errorMessage = 'Event name is invalid';
        const error = new InvalidEventNameError(errorMessage);
        expect(error).toBeInstanceOf(InvalidEventNameError);
        expect(error.message).toBe(errorMessage);
    });

    it('should create an instance of InvalidEventPriceError', () => {
        const errorMessage = 'Event price is invalid';
        const error = new InvalidEventPriceError(errorMessage);
        expect(error).toBeInstanceOf(InvalidEventPriceError);
        expect(error.message).toBe(errorMessage);
    });

    it('should create an instance of InvalidReferralCodeError', () => {
        const errorMessage = 'Referral code is invalid';
        const error = new InvalidReferralCodeError(errorMessage);
        expect(error).toBeInstanceOf(InvalidReferralCodeError);
        expect(error.message).toBe(errorMessage);
    });

    it('should create an instance of InvalidUsernameError', () => {
        const errorMessage = 'Username is invalid';
        const error = new InvalidUsernameError(errorMessage);
        expect(error).toBeInstanceOf(InvalidUsernameError);
        expect(error.message).toBe(errorMessage);
    });

    it('should create an instance of UserHasAccountError', () => {
        const errorMessage = 'User already has an account';
        const error = new UserHasAccountError(errorMessage);
        expect(error).toBeInstanceOf(UserHasAccountError);
        expect(error.message).toBe(errorMessage);
    });
});
