import { Event, isSoldOut, getTagLine, createEvent } from './event';
import { InvalidEventNameError, InvalidEventPriceError } from '../error-handling/exceptions';

describe('Event Functions', () => {
    describe('isSoldOut', () => {
        test('returns true when tickets remaining is 0', () => {
            const event = new Event(1, 'Concert', 50, 100, 0, new Date());
            expect(isSoldOut(event)).toBe(true);
        });

        test('returns false when tickets remaining is greater than 0', () => {
            const event = new Event(1, 'Concert', 50, 100, 10, new Date());
            expect(isSoldOut(event)).toBe(false);
        });
    });

    describe('getTagLine', () => {
        test('returns "Event Sold Out!" when event is sold out', () => {
            const event = new Event(1, 'Concert', 50, 100, 0, new Date());
            expect(getTagLine(event, 10, true)).toBe('Event Sold Out!');
        });

        test('returns "Hurry only X tickets left!" when tickets remaining is less than minimumTicketCount', () => {
            const event = new Event(1, 'Concert', 50, 100, 5, new Date());
            expect(getTagLine(event, 10, true)).toBe('Hurry only 5 tickets left!');
        });

        test('returns "This Event is getting a lot of interest..." when event is popular', () => {
            const event = new Event(1, 'Concert', 50, 100, 20, new Date());
            expect(getTagLine(event, 10, true)).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
        });

        test('returns "Don\'t miss out, purchase your ticket now!" when event is not popular', () => {
        const event = new Event(1, 'Concert', 50, 100, 20, new Date());
        expect(getTagLine(event, 10, false)).toBe("Don't miss out, purchase your ticket now!");
    });
});

describe('createEvent', () => {
    test('creates an event with valid parameters', () => {
        const event = createEvent('Concert', 50, 100);
        expect(event).toBeInstanceOf(Event);
        expect(event.name).toBe('Concert');
        expect(event.ticketPrice).toBe(50);
        expect(event.totalTickets).toBe(100);
    });

    test('throws InvalidEventNameError for invalid event name', () => {
        expect(() => createEvent(123, 50, 100)).toThrow(InvalidEventNameError);
        expect(() => createEvent('a'.repeat(201), 50, 100)).toThrow(InvalidEventNameError);
    });

    test('throws InvalidEventPriceError for invalid event price', () => {
        expect(() => createEvent('Concert', -10, 100)).toThrow(InvalidEventPriceError);
        expect(() => createEvent('Concert', 'fifty', 100)).toThrow(InvalidEventPriceError);
    });

    test('throws InvalidEventPriceError for invalid event tickets', () => {
        expect(() => createEvent('Concert', 50, 0)).toThrow(InvalidEventPriceError);
        expect(() => createEvent('Concert', 50, 'one hundred')).toThrow(InvalidEventPriceError);
    });
});
});
