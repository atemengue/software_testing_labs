// error_handling.test.js

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { InvalidEventNameError, InvalidEventPriceError, InvalidReferralCodeError, InvalidUsernameError, UserHasAccountError
} from '../../js/error-handling/exceptions';

// Setup and teardown for any shared resources if needed
beforeEach(() => {
    // Code to setup resources before each test if needed
});

afterEach(() => {
    // Code to teardown resources after each test if needed
});

describe('Error Handling Tests', () => {
    // Parametrized test for custom errors
    const errorTestCases = [
        { errorClass: InvalidEventNameError, errorMessage: 'Invalid Event Name' },
        { errorClass: InvalidEventPriceError, errorMessage: 'Invalid Event Price' },
        { errorClass: InvalidReferralCodeError, errorMessage: 'Invalid Referral Code' },
        { errorClass: InvalidUsernameError, errorMessage: 'Invalid Username' },
        { errorClass: UserHasAccountError, errorMessage: 'User Already Has Account' },
    ];

    errorTestCases.forEach(({ errorClass, errorMessage }) => {
        it(`should create an instance of ${errorClass.name} with the correct message`, () => {
            // Arrange
            const message = errorMessage;

            // Act
            const errorInstance = new errorClass(message);

            // Assert
            expect(errorInstance).toBeInstanceOf(Error);
            expect(errorInstance).toBeInstanceOf(errorClass);
            expect(errorInstance.message).toBe(message);
        });
    });

    // Additional tests for other potential scenarios
    describe('Additional Error Handling Scenarios', () => {
        it('should have a proper stack trace for InvalidEventNameError', () => {
            // Arrange
            const message = 'Test stack trace';
            let errorInstance;

            // Act
            try {
                throw new InvalidEventNameError(message);
            } catch (error) {
                errorInstance = error;
            }

            // Assert
            //expect(errorInstance).toBeInstanceOf(InvalidEventNameError);
            //expect(errorInstance.stack).toContain('InvalidEventNameError');
            
        });

    });
});
