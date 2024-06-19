import { describe, it, expect } from 'vitest';
import { Event, isSoldOut, getTagLine, createEvent } from '../../js/events/event';
import { InvalidEventNameError, InvalidEventPriceError } from '../../js/error-handling/exceptions';

describe('Event', () => {
  it('should create a new event', () => {
    const event = new Event(1, 'Test Event', 50, 100, 50, '2023-06-17');
    expect(event.id).toBe(1);
    expect(event.name).toBe('Test Event');
    expect(event.ticketPrice).toBe(50);
    expect(event.totalTickets).toBe(100);
    expect(event.ticketsRemaining).toBe(50);
    expect(event.date).toBe('2023-06-17');
  });
});

describe('isSoldOut', () => {
  it('should return true if the event is sold out', () => {
    const event = new Event(1, 'Test Event', 50, 100, 0, '2023-06-17');
    expect(isSoldOut(event)).toBe(true);
  });

  it('should return false if the event is not sold out', () => {
    const event = new Event(1, 'Test Event', 50, 100, 50, '2023-06-17');
    expect(isSoldOut(event)).toBe(false);
  });
});

describe('getTagLine', () => {
  it('should return "Event Sold Out!" if the event is sold out', () => {
    const event = new Event(1, 'Test Event', 50, 100, 0, '2023-06-17');
    expect(getTagLine(event, 10, false)).toBe('Event Sold Out!');
  });

  it('should return "Hurry only X tickets left!" if the event has few tickets remaining', () => {
    const event = new Event(1, 'Test Event', 50, 100, 5, '2023-06-17');
    expect(getTagLine(event, 10, false)).toBe('Hurry only 5 tickets left!');
  });

  it('should return "This Event is getting a lot of interest. Don\'t miss out, purchase your ticket now!" if the event is popular', () => {
    const event = new Event(1, 'Test Event', 50, 100, 50, '2023-06-17');
    expect(getTagLine(event, 10, true)).toBe('This Event is getting a lot of interest. Don\'t miss out, purchase your ticket now!');
  });

  it('should return "Don\'t miss out, purchase your ticket now!" if the event is not sold out and not popular', () => {
    const event = new Event(1, 'Test Event', 50, 100, 50, '2023-06-17');
    expect(getTagLine(event, 10, false)).toBe('Don\'t miss out, purchase your ticket now!');
  });
});

describe('createEvent', () => {
  it('should create a new event', () => {
    const event = createEvent('Test Event', 50, 100);
    expect(event).toBeInstanceOf(Event);
    expect(event.name).toBe('Test Event');
    expect(event.ticketPrice).toBe(50);
    expect(event.totalTickets).toBe(100);
    expect(event.ticketsRemaining).toBe(50);
  });

  it('should throw an InvalidEventNameError if the event name is invalid', () => {
    expect(() => createEvent(123, 50, 100)).toThrowError(InvalidEventNameError);
    expect(() => createEvent('a'.repeat(201), 50, 100)).toThrowError(InvalidEventNameError);
  });

  it('should throw an InvalidEventPriceError if the event price is invalid', () => {
    expect(() => createEvent('Test Event', -1, 100)).toThrowError(InvalidEventPriceError);
    expect(() => createEvent('Test Event', 'abc', 100)).toThrowError(InvalidEventPriceError);
  });

  it('should throw an InvalidEventPriceError if the available tickets is invalid', () => {
    expect(() => createEvent('Test Event', 50, 0)).toThrowError(InvalidEventPriceError);
    expect(() => createEvent('Test Event', 50, -1)).toThrowError(InvalidEventPriceError);
    expect(() => createEvent('Test Event', 50, 'abc')).toThrowError(InvalidEventPriceError);
  });
});