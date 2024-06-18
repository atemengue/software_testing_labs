import { describe, it, expect } from 'vitest';
import { 
    InvalidEventNameError,
    InvalidEventPriceError,
    InvalidReferralCodeError,
    InvalidUsernameError,
    UserHasAccountError
} from '../../js/error-handling/exceptions';

describe('Error Classes', () => {
    it('should create an InvalidEventNameError', () => {
        const error = new InvalidEventNameError('Invalid event name');
        expect(error).toBeInstanceOf(InvalidEventNameError);
        expect(error.message).toBe('Invalid event name');
    });

    it('should create an InvalidEventPriceError', () => {
        const error = new InvalidEventPriceError('Invalid event price');
        expect(error).toBeInstanceOf(InvalidEventPriceError);
        expect(error.message).toBe('Invalid event price');
    });

    it('should create an InvalidReferralCodeError', () => {
        const error = new InvalidReferralCodeError('Invalid referral code');
        expect(error).toBeInstanceOf(InvalidReferralCodeError);
        expect(error.message).toBe('Invalid referral code');
    });

    it('should create an InvalidUsernameError', () => {
        const error = new InvalidUsernameError('Invalid username');
        expect(error).toBeInstanceOf(InvalidUsernameError);
        expect(error.message).toBe('Invalid username');
    });

    it('should create a UserHasAccountError', () => {
        const error = new UserHasAccountError('User has an account');
        expect(error).toBeInstanceOf(UserHasAccountError);
        expect(error.message).toBe('User has an account');
    });
});