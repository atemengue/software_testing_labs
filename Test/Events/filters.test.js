import { describe, it, expect } from 'vitest';
import { today, next7Days, next30Days } from '../../js/events/filters';

describe('Event Date Functions', () => {
  const getDate = (daysFromToday) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return date;
  };

  describe('today', () => {
    it('should return true for an event happening today', () => {
      const event = { date: getDate(0) };
      expect(today(event)).toBe(true);
    });

    it('should return false for an event not happening today', () => {
      const event = { date: getDate(1) };
      expect(today(event)).toBe(false);
    });
  });

  describe('next7Days', () => {
    it('should return true for an event happening within the next 7 days', () => {
      const event = { date: getDate(5) };
      expect(next7Days(event)).toBe(true);
    });

    it('should return false for an event happening after the next 7 days', () => {
      const event = { date: getDate(8) };
      expect(next7Days(event)).toBe(false);
    });

    it('should return false for an event happening before today', () => {
      const event = { date: getDate(-1) };
      expect(next7Days(event)).toBe(false);
    });
  });

  describe('next30Days', () => {
    it('should return true for an event happening within the next 30 days', () => {
      const event = { date: getDate(20) };
      expect(next30Days(event)).toBe(true);
    });

    it('should return false for an event happening after the next 30 days', () => {
      const event = { date: getDate(31) };
      expect(next30Days(event)).toBe(false);
    });

    it('should return false for an event happening before today', () => {
      const event = { date: getDate(-1) };
      expect(next30Days(event)).toBe(false);
    });
  });
});