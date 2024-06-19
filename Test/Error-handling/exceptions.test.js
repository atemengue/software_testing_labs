import { describe, it, expect } from 'vitest';
import { InvalidEventNameError, InvalidEventPriceError, InvalidReferralCodeError, InvalidUsernameError, UserHasAccountError } from '../../js/error-handling/exceptions';

describe('Exceptions', () => {
    describe('InvalidEventNameError', () => {
        it('should create an instance with the provided error message', () => {
            const error = new InvalidEventNameError('Invalid event name');
            expect(error).toBeInstanceOf(InvalidEventNameError);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Invalid event name');
        });
    });

    describe('InvalidEventPriceError', () => {
        it('should create an instance with the provided error message', () => {
            const error = new InvalidEventPriceError('Invalid event price');
            expect(error).toBeInstanceOf(InvalidEventPriceError);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Invalid event price');
        });
    });

    describe('InvalidReferralCodeError', () => {
        it('should create an instance with the provided error message', () => {
            const error = new InvalidReferralCodeError('Invalid referral code');
            expect(error).toBeInstanceOf(InvalidReferralCodeError);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Invalid referral code');
        });
    });

    describe('InvalidUsernameError', () => {
        it('should create an instance with the provided error message', () => {
            const error = new InvalidUsernameError('Invalid username');
            expect(error).toBeInstanceOf(InvalidUsernameError);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Invalid username');
        });
    });

    describe('UserHasAccountError', () => {
        it('should create an instance with the provided error message', () => {
            const error = new UserHasAccountError('User already has an account');
            expect(error).toBeInstanceOf(UserHasAccountError);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('User already has an account');
        });
    });
});