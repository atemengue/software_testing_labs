import { describe, it, expect } from 'vitest';
import { Event, isSoldOut, getTagLine, createEvent } from '../../events/event.js';
import { InvalidEventNameError, InvalidEventPriceError } from '../../error-handling/exceptions.js';

// Mock data for testing
const mockEvent = new Event(1, 'Test Event', 10, 100, 50, new Date());

// Tests for isSoldOut function
describe('isSoldOut', () => {
  it('returns true when ticketsRemaining is 0', () => {
    mockEvent.ticketsRemaining = 0;
    expect(isSoldOut(mockEvent)).toBe(true);
  });

  it('returns false when ticketsRemaining is greater than 0', () => {
    mockEvent.ticketsRemaining = 10;
    expect(isSoldOut(mockEvent)).toBe(false);
  });
});

// Tests for getTagLine function
describe('getTagLine', () => {
  it('returns "Event Sold Out!" when event is sold out', () => {
    mockEvent.ticketsRemaining = 0;
    const tagLine = getTagLine(mockEvent, 10, false);
    expect(tagLine).toBe('Event Sold Out!');
  });

  it('returns correct message when ticketsRemaining < minimumTicketCount', () => {
    mockEvent.ticketsRemaining = 5;
    const tagLine = getTagLine(mockEvent, 10, false);
    expect(tagLine).toBe('Hurry only 5 tickets left!');
  });

  it('returns correct message when isPopular is true', () => {
    mockEvent.ticketsRemaining = 20;
    const tagLine = getTagLine(mockEvent, 10, true);
    expect(tagLine).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
  });

  it('returns default message when ticketsRemaining >= minimumTicketCount and isPopular is false', () => {
    mockEvent.ticketsRemaining = 15;
    const tagLine = getTagLine(mockEvent, 10, false);
    expect(tagLine).toBe("Don't miss out, purchase your ticket now!");
  });
});

// Tests for createEvent function
describe('createEvent', () => {
  it('throws InvalidEventNameError if name exceeds 200 characters', () => {
    expect(() => createEvent('a'.repeat(201), 10, 100)).toThrow(InvalidEventNameError, 'Event name cannot exceed 200 characters');
  });

  it('throws InvalidEventPriceError if price is negative', () => {
    expect(() => createEvent('Test Event', -10, 100)).toThrow(InvalidEventPriceError, 'Event price must be more or equal to 0');
  });

  it('throws InvalidEventPriceError if availableTickets is less than 1', () => {
    expect(() => createEvent('Test Event', 10, 0)).toThrow(InvalidEventPriceError, 'Event tickets must be more than 0');
  });

  it('creates new Event instance with valid parameters', () => {
    const event = createEvent('Test Event', 10, 100);
    expect(event instanceof Event).toBe(true);
    expect(event.name).toBe('Test Event');
    expect(event.ticketPrice).toBe(10);
    expect(event.totalTickets).toBe(100);
  });
});
