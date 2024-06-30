import { describe, it, expect } from 'vitest';
import { today , next30Days, next7Days} from '../software_testing_labs/js/events/filters';

describe('today', () => {
    it('should return true for events happening today', () => {
        // Arrange
        const event = { date: new Date() };

        // Act
        const result = today(event);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false for events not happening today', () => {
        // Arrange
        const event = { date: new Date(Date.now() + 24 * 60 * 60 * 1000) };

        // Act
        const result = today(event);

        // Assert
        expect(result).toBe(false);
    });
});

describe('next7Days', () => {
    it('should return true for events happening in the next 7 days', () => {
        // Arrange
        const event = { date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) };

        // Act
        const result = next7Days(event);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false for events happening after the next 7 days', () => {
        // Arrange
        const event = { date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) };

        // Act
        const result = next7Days(event);

        // Assert
        expect(result).toBe(false);
    });
});


describe('next30Days', () => {
    it('should return true for events happening in the next 30 days', () => {
        // Arrange
        const event = { date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000) };

        // Act
        const result = next30Days(event);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false for events happening after the next 30 days', () => {
        // Arrange
        const event = { date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000) };

        // Act
        const result = next30Days(event);

        // Assert
        expect(result).toBe(false);
    });
});
