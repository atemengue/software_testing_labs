import { describe, it, vi, expect } from 'vitest';
import { today, next30Days, next7Days } from '../../js/events/filters';
import { Event } from '../../js/events/event';
vi.setSystemTime('2024-06-18 23:59');

describe('today', () => {
  let event1 = new Event(1, 'concert', 2000, 500, 0, new Date('2024-06-18 14:00'));
  let event2 = new Event(2, 'concert', 2000, 500, 0, new Date('2024-06-19 00:00'));
  it('should return true if event is today', () => {
    expect(today(event1)).toBe(true);
  });
  it('should return false if event is not today', () => {
    expect(today(event2)).toBe(false);
  });
});

const now = new Date();

describe('next7Days', () => {
  let event3 = new Event(1, 'concert', 2000, 500, 0, new Date().setDate(now.getDate() + 5));
  let event4 = new Event(2, 'concert', 2000, 500, 0, new Date().setDate(now.getDate() + 8));
  let event5 = new Event(3, 'concert', 2000, 500, 0, new Date().setDate(now.getDate() + 7));
  let event6 = new Event(4, 'concert', 2000, 500, 0, new Date().setDate(now.getDate() - 1));
  it('should return true if event is in the next seven days', () => {
    expect(next7Days(event3)).toBe(true);
  });
  it('should return false if event is after the next seven days', () => {
    expect(next7Days(event4)).toBe(false);
  });

  it('should return true if event is the 7th day after today', () => {
    expect(next7Days(event5)).toBe(true);
  });

  it('should return false if event is past', () => {
    expect(next7Days(event6)).toBe(false);
  });
});

describe('next30Days', () => {
  it.each([
    { scenario: 'event is in the next 30 days', date: new Date().setDate(now.getDate() + 25), result: true },
    { scenario: 'event after the next 30 days', date: new Date().setDate(now.getDate() + 31), result: false },
    { scenario: 'event is before the next 30 days', date: new Date().setDate(now.getDate() - 2), result: false },
    { scenario: 'event is 30 days after today', date: new Date().setDate(now.getDate() + 30), result: true },
  ])('should return  $result if $scenario', ({ date, result }) => {
    let event = new Event(1, 'concert', 2000, 500, 0, date);

    expect(next30Days(event)).toBe(result);
  });
});
