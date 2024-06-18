import { describe, it, expect } from 'vitest';
import { Event, isSoldOut, getTagLine, createEvent } from '../../js/events/event'; 

// Mock classes and data for testing
class InvalidEventNameError extends Error {}
class InvalidEventPriceError extends Error {}

describe('Event Management Functions', () => {
    it('should create a new Event object with valid parameters', () => {
        const event = createEvent('Concert', 50, 100);
        expect(event).toBeInstanceOf(Event);
        expect(event.name).toBe('Concert');
        expect(event.ticketPrice).toBe(50);
        expect(event.totalTickets).toBe(100);
    });

    it('should throw InvalidEventNameError if event name is too long', () => {
        const createInvalidEvent = () => createEvent('Very long event name exceeding 200 characters limit', 50, 100);
        expect(createInvalidEvent).toThrow(InvalidEventNameError);
    });

    it('should throw InvalidEventPriceError if event price is negative', () => {
        const createInvalidEvent = () => createEvent('Concert', -50, 100);
        expect(createInvalidEvent).toThrow(InvalidEventPriceError);
    });

    it('should throw InvalidEventPriceError if event tickets count is zero or negative', () => {
        const createInvalidEvent = () => createEvent('Concert', 50, 0);
        expect(createInvalidEvent).toThrow(InvalidEventPriceError);
    });

    it('should correctly determine if an event is sold out', () => {
        const event1 = new Event(1, 'Concert', 50, 100, 0);
        const event2 = new Event(2, 'Theater', 100, 200, 50);
        expect(isSoldOut(event1)).toBe(true);
        expect(isSoldOut(event2)).toBe(false);
    });

    it('should generate appropriate tag lines based on event status and popularity', () => {
        const event1 = new Event(1, 'Concert', 50, 100, 10);
        const event2 = new Event(2, 'Theater', 100, 200, 5);
        expect(getTagLine(event1, 20, true)).toContain('This Event is getting a lot of interest.');
        expect(getTagLine(event2, 10, false)).toContain('Hurry only');
        expect(getTagLine(event1, 20, false)).toContain('Don\'t miss out');
    });
});
