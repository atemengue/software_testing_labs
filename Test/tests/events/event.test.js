
import { it, vi, expect, describe } from 'vitest';
import { Event } from '../js/events/event';

describe('Event', () => {
  it('should create an instance of Event with the provided properties', () => {
    const event = new Event(1, 'Concert', 50, 100, 100, '2022-12-31');
    expect(event.id).toBe(1);
    expect(event.name).toBe('Concert');
    expect(event.ticketPrice).toBe(50);
    expect(event.totalTickets).toBe(100);
    expect(event.ticketsRemaining).toBe(100);
    expect(event.date).toBe('2022-12-31');
  });
});



//const { isSoldOut } = require('./event');
import { isSoldOut } from '../js/events/event';

describe('isSoldOut', () => {
  it('should return true if event has no tickets remaining', () => {
    const event = { ticketsRemaining: 0 };
    expect(isSoldOut(event)).toBe(true);
  });

  it('should return false if event has tickets remaining', () => {
    const event = { ticketsRemaining: 10 };
    expect(isSoldOut(event)).toBe(false);
  });
});



//const { getTagLine } = require('./event');
import { getTagLine } from '../js/events/event';

describe('getTagLine', () => {
  it('should return "Event Sold Out!" if event is sold out', () => {
    const event = { ticketsRemaining: 0 };
    expect(getTagLine(event, 5, false)).toBe('Event Sold Out!');
  });

  it('should return the correct tagline if event has less than minimum ticket count remaining', () => {
    const event = { ticketsRemaining: 3 };
    expect(getTagLine(event, 5, false)).toBe('Hurry only 3 tickets left!');
  });

  it('should return the correct tagline if event has more than minimum ticket count remaining', () => {
    const event = { ticketsRemaining: 10 };
    expect(getTagLine(event, 5, false)).toBe("Don't miss out, purchase your ticket now!");
  });

  it('should return the correct tagline if event is popular and has more than minimum ticket count remaining', () => {
    const event = { ticketsRemaining: 10 };
    expect(getTagLine(event, 5, true)).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
  });
});


//const { createEvent, InvalidEventNameError, InvalidEventPriceError } = require('./event');
import { createEvent, InvalidEventNameError, InvalidEventPriceError } from '../js/';
describe('createEvent', () => {
  it('should create a new Event instance with the provided name, price, and available tickets', () => {
    const event = createEvent('Concert', 50, 100);
    expect(event.name).toBe('Concert');
    expect(event.ticketPrice).toBe(50);
    expect(event.totalTickets).toBe(100);
    expect(event.ticketsRemaining).toBe(100);
  });

  it('should throw an InvalidEventNameError if the name exceeds 200 characters', () => {
    expect(() => createEvent('A'.repeat(201), 50, 100)).toThrow(InvalidEventNameError);
  });

  it('should throw an InvalidEventPriceError if the price is less than 0', () => {
    expect(() => createEvent('Concert', -10, 100)).toThrow(InvalidEventPriceError);
  });

  it('should throw an InvalidEventPriceError if the available tickets are less than 1', () => {
    expect(() => createEvent('Concert', 50, 0)).toThrow(InvalidEventPriceError);
  });
});