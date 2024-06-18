import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { Event, isSoldOut, getTagLine, createEvent } from '../../js/events/event.js';

vi.mock('../../js/events/event', async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    isSoldOut: vi.fn(),
  };
});

vi.mock('../../js/errors-handling/exceptions', async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    isSoldOut: vi.fn(),
  };
});

// describe('Event', () => {
//   const event = new Event(1, 'john', 1000, 500, 500, new Date());
//   it()
// });
//const spy = vi.spyOn(isSoldOut);
describe('isSoldOut', () => {
  let event1 = new Event(1, 'concert', 2000, 500, 0, '18/06/2024');
  it('should return true if event remaining tickets is  sold out', () => {
    vi.mocked(isSoldOut).mockReturnValue(true);
    expect(isSoldOut(event1)).toBe(true);
  });
  let event2 = new Event(2, 'concert', 2000, 500, 1, '18/06/2024');
  it('should return false if event remaining tickets is greather than 0', () => {
    vi.mocked(isSoldOut).mockReturnValue(false);
    expect(isSoldOut(event2)).toBe(false);
  });
});

describe('getTAgLine', () => {
  let event4 = new Event(1, 'concert', 2000, 500, 0, '18/06/2024');
  let event5 = new Event(2, 'concert', 2000, 500, 11, '18/06/2024');
  let event6 = new Event(3, 'concert', 2000, 500, 60, '18/06/2024');
  let event7 = new Event(4, 'concert', 2000, 500, 60, '18/06/2024');
  it('should return event sold out if number of tickets for remaining is 0', () => {
    vi.mocked(isSoldOut).mockReturnValue(true);
    expect(getTagLine(event4, 50, true)).toMatch(/sold/i);
  });

  it('should return tag line matching `Hurry` if only few places left', () => {
    vi.mocked(isSoldOut).mockReturnValue(false);
    expect(getTagLine(event5, 50, true)).toMatch(/hurry/i);
  });

  it('should return tag line matching  ` a lot of interest` if event is popular and many tickets are left', () => {
    vi.mocked(isSoldOut).mockReturnValue(false);
    expect(getTagLine(event6, 50, true)).toMatch(/a lot of interest/i);
  });

  it('should return tag line matching `purchase your ticket now` if event is not popular and many tickets are left', () => {
    vi.mocked(isSoldOut).mockReturnValue(false);
    expect(getTagLine(event7, 50, false)).toMatch(/purchase your ticket now/i);
  });
});

describe('create Event', () => {
  it.each([
    { scenario: 'event name is not string', name: null, price: 1000, availableTickets: 100, result: 'cannot exceed 200 characters' },
    { scenario: 'event name length is greater than 200', name: 'a'.repeat(201), price: 1000, availableTickets: 100, result: 'cannot exceed 200 characters' },
    { scenario: 'event price is not a number', price: '1000', name: 'concert', availableTickets: 100, result: 'more or equal to 0' },
    { scenario: 'event price is less than zero', name: 'concert', price: -1000, availableTickets: 100, result: 'more or equal to 0' },
    { scenario: 'available tickets is not a number', name: 'concert', price: 1000, availableTickets: '100', result: 'more than 0' },
    { scenario: 'available tickets is less than zero', name: 'concert', price: 1000, availableTickets: -1000, result: 'more than 0' },
  ])('should return error matching $result if $scenario', ({ name, price, availableTickets, result }) => {
    try {
      createEvent(name, price, availableTickets);
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toMatch(new RegExp(result, 'i'));
    }
  });

  it('should return an event if valid parameters', () => {
    const event = createEvent('concert', 10000, 2500);
    expect(event).toBeInstanceOf(Event);
  });
});

vi.resetAllMocks();
