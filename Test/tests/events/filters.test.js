//const { today, next7Days, next30Days } = require("./filters");
import { it, vi, expect, describe } from 'vitest';
import { today, next7Days, next30Days } from '../js/events/filters';

describe('Filter Functions', () => {
  const eventToday = { date: new Date() };
  const eventNext7Days = { date: new Date() };
  eventNext7Days.date.setDate(eventNext7Days.date.getDate() + 5);
  const eventNext30Days = { date: new Date() };
  eventNext30Days.date.setDate(eventNext30Days.date.getDate() + 20);

  describe('today', () => {
    it('should return true if the event is today', () => {
      expect(today(eventToday)).toBe(true);
    });

    it('should return false if the event is not today', () => {
      expect(today(eventNext7Days)).toBe(false);
      expect(today(eventNext30Days)).toBe(false);
    });
  });

  describe('next7Days', () => {
    it('should return true if the event is within the next 7 days', () => {
      expect(next7Days(eventToday)).toBe(true);
      expect(next7Days(eventNext7Days)).toBe(true);
    });

    it('should return false if the event is not within the next 7 days', () => {
      expect(next7Days(eventNext30Days)).toBe(false);
    });
  });

  describe('next30Days', () => {
    it('should return true if the event is within the next 30 days', () => {
      expect(next30Days(eventToday)).toBe(true);
      expect(next30Days(eventNext7Days)).toBe(true);
      expect(next30Days(eventNext30Days)).toBe(true);
    });
  });
});