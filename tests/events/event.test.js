import { Event, isSoldOut, getTagLine, createEvent } from './event';
import { InvalidEventNameError, InvalidEventPriceError } from '../error-handling/exceptions';

describe('Event Module Tests', () => {
    test('isSoldOut should return true when ticketsRemaining is 0', () => {
        const event = new Event(1, 'Concert', 50, 100, 0, '2024-07-01');
        expect(isSoldOut(event)).toBe(true);
    });

    test('isSoldOut should return false when ticketsRemaining is more than 0', () => {
        const event = new Event(1, 'Concert', 50, 100, 10, '2024-07-01');
        expect(isSoldOut(event)).toBe(false);
    });

    test('getTagLine should return "Event Sold Out!" when event is sold out', () => {
        const event = new Event(1, 'Concert', 50, 100, 0, '2024-07-01');
        expect(getTagLine(event, 5, false)).toBe('Event Sold Out!');
    });

    test('getTagLine should return "Hurry only X tickets left!" when tickets remaining are less than minimumTicketCount', () => {
        const event = new Event(1, 'Concert', 50, 100, 3, '2024-07-01');
        expect(getTagLine(event, 5, false)).toBe('Hurry only 3 tickets left!');
    });

    test('getTagLine should return "Hurry only 1 ticket left!" when only one ticket is remaining', () => {
        const event = new Event(1, 'Concert', 50, 100, 1, '2024-07-01');
        expect(getTagLine(event, 5, false)).toBe('Hurry only 1 ticket left!');
    });

    test('getTagLine should return correct popular event tagline', () => {
        const event = new Event(1, 'Concert', 50, 100, 20, '2024-07-01');
        expect(getTagLine(event, 5, true)).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
    });

    test('getTagLine should return correct general tagline for non-popular event', () => {
        const event = new Event(1, 'Concert', 50, 100, 20, '2024-07-01');
        expect(getTagLine(event, 5, false)).toBe("Don't miss out, purchase your ticket now!");
    });

    test('createEvent should create event with valid inputs', () => {
        const event = createEvent('Valid Event', 100, 50);
        expect(event).toBeInstanceOf(Event);
        expect(event.name).toBe('Valid Event');
        expect(event.ticketPrice).toBe(100);
        expect(event.totalTickets).toBe(50);
    });

    test('createEvent should throw InvalidEventNameError for invalid name', () => {
        expect(() => createEvent(123, 100, 50)).toThrow(InvalidEventNameError);
        expect(() => createEvent('a'.repeat(201), 100, 50)).toThrow(InvalidEventNameError);
    });

    test('createEvent should throw InvalidEventPriceError for invalid price', () => {
        expect(() => createEvent('Valid Event', -1, 50)).toThrow(InvalidEventPriceError);
        expect(() => createEvent('Valid Event', 'free', 50)).toThrow(InvalidEventPriceError);
    });

    test('createEvent should throw InvalidEventPriceError for invalid available tickets', () => {
        expect(() => createEvent('Valid Event', 100, 0)).toThrow(InvalidEventPriceError);
        expect(() => createEvent('Valid Event', 100, 'none')).toThrow(InvalidEventPriceError);
    });
});
