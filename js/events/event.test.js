import { describe, expect, it , test} from 'vitest';
// event.test.js
import { Event, isSoldOut, getTagLine, createEvent }  from './event';
import { InvalidEventNameError, InvalidEventPriceError } from '../../js/error-handling/exceptions';

describe('Event Class', () => {
    test('should create an event with valid parameters', () => {
        const event = new Event(1, 'Concert', 50, 100, 100, new Date());
        expect(event.id).toBe(1);
        expect(event.name).toBe('Concert');
        expect(event.ticketPrice).toBe(50);
        expect(event.totalTickets).toBe(100);
        expect(event.ticketsRemaining).toBe(100);
    });
});

describe('isSoldOut', () => {
    test('should return true if tickets are sold out', () => {
        const event = new Event(1, 'Concert', 50, 100, 0, new Date());
        expect(isSoldOut(event)).toBe(true);
    });

    test('should return false if tickets are not sold out', () => {
        const event = new Event(1, 'Concert', 50, 100, 10, new Date());
        expect(isSoldOut(event)).toBe(false);
    });
});

describe('getTagLine', () => {
    test('should return "Event Sold Out!" if event is sold out', () => {
        const event = new Event(1, 'Concert', 50, 100, 0, new Date());
        expect(getTagLine(event, 10, true)).toBe('Event Sold Out!');
    });

    test('should return correct message when tickets are below minimum count', () => {
        const event = new Event(1, 'Concert', 50, 100, 5, new Date());
        expect(getTagLine(event, 10, false)).toBe('Hurry only 5 tickets left!');
    });

    test('should return correct message for a popular event', () => {
        const event = new Event(1, 'Concert', 50, 100, 50, new Date());
        expect(getTagLine(event, 10, true)).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
    });

    test('should return correct message for a regular event', () => {
        const event = new Event(1, 'Concert', 50, 100, 50, new Date());
        expect(getTagLine(event, 10, false)).toBe("Don't miss out, purchase your ticket now!");
    });
});

describe('createEvent', () => {
    test('should create event with valid parameters', () => {
        const event = createEvent('Concert', 50, 100);
        expect(event.name).toBe('Concert');
        expect(event.ticketPrice).toBe(50);
        expect(event.totalTickets).toBe(100);
    });

    test('should throw InvalidEventNameError if name is invalid', () => {
        expect(() => createEvent(123, 50, 100)).toThrow(InvalidEventNameError);
        expect(() => createEvent('A'.repeat(201), 50, 100)).toThrow(InvalidEventNameError);
    });

    test('should throw InvalidEventPriceError if price is invalid', () => {
        expect(() => createEvent('Concert', -1, 100)).toThrow(InvalidEventPriceError);
        expect(() => createEvent('Concert', 'free', 100)).toThrow(InvalidEventPriceError);
    });

    test('should throw InvalidEventPriceError if availableTickets is invalid', () => {
        expect(() => createEvent('Concert', 50, 0)).toThrow(InvalidEventPriceError);
        expect(() => createEvent('Concert', 50, 'a lot')).toThrow(InvalidEventPriceError);
    });
});
