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

        test('returns false when tickets remaining is negative', () => {
            const event = new Event(1, 'Concert', 50, 100, -10, new Date());
            expect(isSoldOut(event)).toBe(false);
        });
    });

    describe('getTagLine', () => {
        test('returns "Event Sold Out!" when event is sold out', () => {
            const event = new Event(1, 'Concert', 50, 100, 0, new Date());
            expect(getTagLine(event, 10, true)).toBe('Event Sold Out!');
        });

        test('returns "Hurry only X tickets remaining!" when event is almost sold out', () => {
            const event = new Event(1, 'Concert', 50, 100, 10, new Date());
            expect(getTagLine(event, 10, true)).toBe('Hurry only 10 tickets remaining!');
        });

        test('returns "Get your tickets now!" when event is not almost sold out', () => {
            const event = new Event(1, 'Concert', 50, 100, 20, new Date());
            expect(getTagLine(event, 10, true)).toBe('Get your tickets now!');
        });

        test('returns empty string when event is not open for booking', () => {
            const event = new Event(1, 'Concert', 50, 100, 20, new Date());
            expect(getTagLine(event, 10, false)).toBe('');
        });

        test('returns "Get your tickets now!" when almost sold out but with no remaining threshold', () => {
            const event = new Event(1, 'Concert', 50, 100, 5, new Date());
            expect(getTagLine(event, 0, true)).toBe('Get your tickets now!');
        });
    });

    describe('createEvent', () => {
        test('throws InvalidEventNameError when name is empty', () => {
            expect(() => createEvent('', 50, 100, 0, new Date())).toThrow(InvalidEventNameError);
        });

        test('throws InvalidEventPriceError when price is not a positive number', () => {
            expect(() => createEvent('Concert', -50, 100, 0, new Date())).toThrow(InvalidEventPriceError);
        });

        test('throws InvalidEventPriceError when price is zero', () => {
            expect(() => createEvent('Concert', 0, 100, 0, new Date())).toThrow(InvalidEventPriceError);
        });

        test('creates event when inputs are valid', () => {
            const event = createEvent('Concert', 50, 100, 0, new Date());
            expect(event).toEqual(expect.objectContaining({
                name: 'Concert',
                price: 50,
                totalTickets: 100,
                ticketsRemaining: 0
            }));
        });
    });
});
