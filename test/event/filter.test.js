import { describe, it, expect } from "vitest";
import { today, next7Days, next30Days } from "../../js/events/filters";
import { Event } from "../../js/events/event";

describe("Testing today function", () => {
    it('Should return true if event is today', () => {
        const event = new Event(1, 'Concert', 50, 100, 50, new Date());
        expect(today(event)).toBe(true);
    });

    it('should return false if event is not today', () => {
        const event = new Event(1, 'Concert', 50, 100, 50, new Date('2023-01-01'));
        expect(today(event)).toBe(false);
    });
});

describe('Testing next7Days function', () => {
    it('Should return true if event is within next 7 days', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3);
        const event = new Event(1, 'Concert', 50, 100, 50, futureDate);
        expect(next7Days(event)).toBe(true);
    });

    it('Should return false if event is within next 7 days', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 8);
        const event = new Event(1, 'Concert', 50, 100, 50, futureDate);
        expect(next7Days(event)).toBe(false);
    });
});

describe('Testing next30Days functions', () => {
    it('Should return true if event is within next 30 days', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 29);
        const event = new Event(1, 'Concert', 50, 100, 50, futureDate);
        expect(next30Days(event)).toBe(true);
    });

    it('Should return false if event is not within next 30 days', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 40);
        const event = new Event(1, 'Concert', 50, 100, 50, futureDate);
        expect(next30Days(event)).toBe(false);
    });
});