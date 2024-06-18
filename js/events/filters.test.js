import { describe, expect, it , test, afterEach} from 'vitest';
import { today, next7Days, next30Days } from './filters';

// Mock Date class to control the current date for testing
const RealDate = Date;

function mockDate(isoDate) {
    global.Date = class extends RealDate {
        constructor(...args) {
            if (args.length) {
                return new RealDate(...args);
            }
            return new RealDate(isoDate);
        }
    };
}

afterEach(() => {
    // Restore the original Date class after each test
    global.Date = RealDate;
});

describe('filters.js tests', () => {
    test('today should return true for an event today', () => {
        const mockToday = '2024-06-17T00:00:00Z';
        mockDate(mockToday);

        const event = { date: new Date(mockToday) };
        expect(today(event)).toBe(true);
    });

    test('today should return false for an event not today', () => {
        const mockToday = '2024-06-17T00:00:00Z';
        const eventDate = '2024-06-16T00:00:00Z';
        mockDate(mockToday);

        const event = { date: new Date(eventDate) };
        expect(today(event)).toBe(false);
    });

    test('next7Days should return true for an event within the next 7 days', () => {
        const mockToday = '2024-06-17T00:00:00Z';
        const eventDate = '2024-06-20T00:00:00Z';
        mockDate(mockToday);

        const event = { date: new Date(eventDate) };
        expect(next7Days(event)).toBe(true);
    });

    test('next7Days should return false for an event outside the next 7 days', () => {
        const mockToday = '2024-06-17T00:00:00Z';
        const eventDate = '2024-06-25T00:00:00Z';
        mockDate(mockToday);

        const event = { date: new Date(eventDate) };
        expect(next7Days(event)).toBe(false);
    });

    test('next30Days should return true for an event within the next 30 days', () => {
        const mockToday = '2024-06-17T00:00:00Z';
        const eventDate = '2024-07-10T00:00:00Z';
        mockDate(mockToday);

        const event = { date: new Date(eventDate) };
        expect(next30Days(event)).toBe(true);
    });

    test('next30Days should return false for an event outside the next 30 days', () => {
        const mockToday = '2024-06-17T00:00:00Z';
        const eventDate = '2024-07-20T00:00:00Z';
        mockDate(mockToday);

        const event = { date: new Date(eventDate) };
        expect(next30Days(event)).toBe(false);
    });
});
