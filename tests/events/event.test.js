import { describe, it, expect } from 'vitest';
import { Event, isSoldOut, getTagLine, createEvent } from '../software_testing_labs/js/events/event';
import { InvalidEventNameError, InvalidEventPriceError } from '../software_testing_labs/js/error-handling/exceptions';

describe('isSoldOut', () => {
    it('should return true if tickets are sold out', () => {
        // Arrange
        const event = new Event(1, 'Event1', 100, 100, 0, new Date());

        // Act
        const result = isSoldOut(event);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false if tickets are available', () => {
        // Arrange
        const event = new Event(1, 'Event1', 100, 100, 10, new Date());

        // Act
        const result = isSoldOut(event);

        // Assert
        expect(result).toBe(false);
    });
});

describe('getTagLine', () => {
    it('should return "Event Sold Out!" if event is sold out', () => {
        // Arrange
        const event = new Event(1, 'Event1', 100, 100, 0, new Date());

        // Act
        const result = getTagLine(event, 10, false);

        // Assert
        expect(result).toBe('Event Sold Out!');
    });

    it('should return correct message if tickets are low', () => {
        // Arrange
        const event = new Event(1, 'Event1', 100, 100, 5, new Date());

        // Act
        const result = getTagLine(event, 10, false);

        // Assert
        expect(result).toBe('Hurry only 5 tickets left!');
    });

    it('should return correct message for popular events', () => {
        // Arrange
        const event = new Event(1, 'Event1', 100, 100, 50, new Date());

        // Act
        const result = getTagLine(event, 10, true);

        // Assert
        expect(result).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
    });

    it('should return default message if tickets are sufficient and event is not popular', () => {
        // Arrange
        const event = new Event(1, 'Event1', 100, 100, 50, new Date());

        // Act
        const result = getTagLine(event, 10, false);

        // Assert
        expect(result).toBe("Don't miss out, purchase your ticket now!");
    });
});


describe('createEvent', () => {
    it('should create an event successfully', () => {
        // Arrange
        const eventName = 'Event1';
        const eventPrice = 100;
        const availableTickets = 50;

        // Act
        const event = createEvent(eventName, eventPrice, availableTickets);

        // Assert
        expect(event).toBeInstanceOf(Event);
        expect(event.name).toBe(eventName);
        expect(event.ticketPrice).toBe(eventPrice);
        expect(event.totalTickets).toBe(availableTickets);
    });

    // it('should throw an error if event name is invalid', () => {
    //     // Act & Assert
    //     expect(() => createEvent(123, 100, 50)).toThrow(InvalidEventNameError);
    //     expect(() => createEvent('a'.repeat(201), 100, 50)).toThrow(InvalidEventNameError);
    // });

    // it('should throw an error if event price is invalid', () => {
    //     // Act & Assert
    //     expect(() => createEvent('Event1', -1, 50)).toThrow(InvalidEventPriceError);
    //     expect(() => createEvent('Event1', 'free', 50)).toThrow(InvalidEventPriceError);
    // });

    // it('should throw an error if available tickets are invalid', () => {
    //     // Act & Assert
    //     expect(() => createEvent('Event1', 100, 0)).toThrow(InvalidEventPriceError);
    //     expect(() => createEvent('Event1', 100, 'many')).toThrow(InvalidEventPriceError);
    // });
});
