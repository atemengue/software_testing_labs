import { describe, it, expect } from 'vitest';
import { today, next7Days, next30Days } from '../../events/filters';

// Mock data for testing
const mockEventToday = { date: new Date() };
const mockEventNext7Days = { date: new Date() };
const mockEventNext30Days = { date: new Date() };

mockEventNext7Days.date.setDate(mockEventNext7Days.date.getDate() + 5);
mockEventNext30Days.date.setDate(mockEventNext30Days.date.getDate() + 15);

// Tests for today function
describe('today', () => {
  it('returns true for today\'s date', () => {
    const result = today(mockEventToday);
    expect(result).toBe(true);
  });

  it('returns false for future date', () => {
    const futureEvent = { date: new Date() };
    futureEvent.date.setDate(futureEvent.date.getDate() + 1);
    const result = today(futureEvent);
    expect(result).toBe(false);
  });
});

// Tests for next7Days function
describe('next7Days', () => {
  it('returns true for event within next 7 days', () => {
    const result = next7Days(mockEventNext7Days);
    expect(result).toBe(true);
  });

  it('returns false for event beyond next 7 days', () => {
    const futureEvent = { date: new Date() };
    futureEvent.date.setDate(futureEvent.date.getDate() + 10);
    const result = next7Days(futureEvent);
    expect(result).toBe(false);
  });
});

// Tests for next30Days function
describe('next30Days', () => {
  it('returns true for event within next 30 days', () => {
    const result = next30Days(mockEventNext30Days);
    expect(result).toBe(true);
  });

  it('returns false for event beyond next 30 days', () => {
    const futureEvent = { date: new Date() };
    futureEvent.date.setDate(futureEvent.date.getDate() + 35);
    const result = next30Days(futureEvent);
    expect(result).toBe(false);
  });
});
