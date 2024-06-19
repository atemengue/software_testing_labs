import { describe, it, expect } from "vitest";
import { Event, isSoldOut, getTagLine, createEvent } from "../../js/events/event";
import { InvalidEventNameError, InvalidEventPriceError } from "../../js/error-handling/exceptions";

describe("Testing Event class", () => {
    it('Should create an Event object', () => {
        const event = new Event(1, 'Concert', 50, 100, 50, new Date());
        expect(event).toBeInstanceOf(Event);
        expect(event.name).toBe('Concert');
        expect(event.ticketPrice).toBe(50);
        expect(event.totalTickets).toBe(100);
        expect(event.ticketsRemaining).toBe(50);
        expect(event.date).toBeDefined();
    });
});

describe('Testing isSoldOut function', () => {
    it('Should return true if event is sold out', () => {
        const event = new Event(1, 'Concert', 50, 100, 0, new Date(''));
        expect(isSoldOut(event)).toBe(true);
    });

    it('Should return false if event is sold out', () => {
        const event = new Event(1, 'Concert', 50, 100, 10, new Date());
        expect(isSoldOut(event)).toBe(false);
    });
});

describe('Testing getTagline function', () => {
    it('Should return "Event Sold Out!" if the event is sold out', () => {
        const event = new Event(1, 'Concert', 50, 100, 0, new Date());
        expect(getTagLine(event, 10, true)).toBe('Event Sold Out!');
    });

    it('Should return "Hurry only X tickets left!" if the event has less than minimumTicketCount tickets remaining', () => {
        const event = new Event(1, 'Concert', 50, 100, 2, new Date('2024-03-15'));
        expect(getTagLine(event, 5, false)).toBe("Hurry only 2 tickets left!");
    });

    it('Should return the correct tag line for popular event', () => {
        const event = new Event(1, 'Concert', 50, 100, 20, new Date());
        expect(getTagLine(event, 10, true)).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
    });

    it('Should return the correct tag line for regular event', () => {
        const event = new Event(1, 'Concert', 50, 100, 20, new Date());
        expect(getTagLine(event, 10, false)).toBe("Don't miss out, purchase your ticket now!");
    });
});

describe('Testing createEvent function', () => {
    it('Should create event successfully with valid inputs', () => {
        const event = createEvent('Concert', 50, 100)
        expect(event).toBeInstanceOf(Event);
        expect(event.name).toBe('Concert');
        expect(event.ticketPrice).toBe(50);
        expect(event.totalTickets).toBe(100);
        expect(event.ticketsRemaining).toBe();
    });

    it('Should throw error for invalid event name', () => {
        expect(() => createEvent(123, 50, 100)).toThrow(InvalidEventNameError);
        expect(() => createEvent('A'.repeat(201), 50, 100)).toThrow(InvalidEventNameError);
    });

    it('Should throw error for invalid event price', () => {
        expect(() => createEvent('Concert', -10, 100)).toThrow(InvalidEventPriceError);
        expect(() => createEvent('Concert', 'fifty', 100)).toThrow(InvalidEventPriceError);
    });

    it('Should throw error for invalid available tickets', () => {
        expect(() => createEvent('Concert', 50, 0)).toThrow(InvalidEventPriceError);
        expect(() => createEvent('Concert', 50, 'hundred')).toThrow(InvalidEventPriceError);
    });
});