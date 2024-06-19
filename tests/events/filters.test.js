import { today, next7Days, next30Days } from './date';

describe('Date Module Tests', () => {
    describe('today function', () => {
        test('should return true when event date is today', () => {
            const event = { date: new Date() };
            expect(today(event)).toBe(true);
        });

        test('should return false when event date is not today', () => {
            const event = { date: new Date('2024-07-01') };
            expect(today(event)).toBe(false);
        });
    });

    describe('next7Days function', () => {
        test('should return true when event date is within the next 7 days', () => {
            const today = new Date();
            const futureDate = new Date();
            futureDate.setDate(today.getDate() + 5); // Event within 5 days from today
            const event = { date: futureDate };
            expect(next7Days(event)).toBe(true);
        });

        test('should return false when event date is more than 7 days from today', () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 10); // Event 10 days from today
            const event = { date: futureDate };
            expect(next7Days(event)).toBe(false);
        });

        test('should return false when event date is in the past', () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 1); // Event was yesterday
            const event = { date: pastDate };
            expect(next7Days(event)).toBe(false);
        });
    });

    describe('next30Days function', () => {
        test('should return true when event date is within the next 30 days', () => {
            const today = new Date();
            const futureDate = new Date();
            futureDate.setDate(today.getDate() + 25); // Event within 25 days from today
            const event = { date: futureDate };
            expect(next30Days(event)).toBe(true);
        });

        test('should return false when event date is more than 30 days from today', () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 35); // Event 35 days from today
            const event = { date: futureDate };
            expect(next30Days(event)).toBe(false);
        });

        test('should return false when event date is in the past', () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 1); // Event was yesterday
            const event = { date: pastDate };
            expect(next30Days(event)).toBe(false);
        });
    });
});
