import { describe, it, expect } from "vitest";
import {
    InvalidEventNameError,
    InvalidEventPriceError,
    InvalidReferralCodeError,
    InvalidUsernameError,
    UserHasAccountError
} from '../../js/error-handling/exceptions';

describe("Testing InvalidEventNameError", () => {
    it('Should create InvalidEventNameError with correct message', () => {
        const errorMessage = "Event name cannot exceed 200 characters";
        const error = new InvalidEventNameError(errorMessage);
        expect(error).toBeInstanceOf(InvalidEventNameError);
        expect(error.message).toBe(errorMessage);
    });
});

describe("Testing InvalidEventPriceError", () => {
    it('Should create InvalidEventPriceError with correct message', () => {
        const errorMessage = "Event price must be more or equal to 0";
        const error = new InvalidEventPriceError(errorMessage);
        expect(error).toBeInstanceOf(InvalidEventPriceError);
        expect(error.message).toBe(errorMessage);
    });
});

describe("Testing InvalidUsernameError", () => {
    it('Should create InvalidUsernameError with correct message', () => {
        const errorMessage = "Username is invalid";
        const error = new InvalidUsernameError(errorMessage);
        expect(error).toBeInstanceOf(InvalidUsernameError);
        expect(error.message).toBe(errorMessage);
    });
});

describe("Testing InvalidReferralCodeError", () => {
    it('Should create InvalidReferralCodeError with correct message', () => {
        const errorMessage = "Referral code is invalid";
        const error = new InvalidReferralCodeError(errorMessage);
        expect(error).toBeInstanceOf(InvalidReferralCodeError);
        expect(error.message).toBe(errorMessage);
    });
});

describe("Testing UserHasAccountError", () => {
    it('Should create UserHasAccountError with correct message', () => {
        const errorMessage = "User already has an account";
        const error = new UserHasAccountError(errorMessage);
        expect(error).toBeInstanceOf(UserHasAccountError);
        expect(error.message).toBe(errorMessage);
    });
});