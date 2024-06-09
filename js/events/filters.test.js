import { today, next7Days, next30Days } from './filters';

describe('Date Management Functions', () => {
    const eventToday = { date: new Date() };
    const eventNext7Days = { date: new Date() };
    eventNext7Days.date.setDate(eventNext7Days.date.getDate() + 5); // Événement dans 5 jours
    const eventNext30Days = { date: new Date() };
    eventNext30Days.date.setDate(eventNext30Days.date.getDate() + 15); // Événement dans 15 jours

    test('today function correctly identifies today\'s event', () => {
        const expectedResult = true; // You can adjust this based on your current date
        expect(today(eventToday)).toBe(expectedResult);
        expect(today(eventNext7Days)).toBe(false);
        expect(today(eventNext30Days)).toBe(false);
    });

    test('next7Days function correctly identifies events in the next 7 days', () => {
        const expectedResult = true; // You can adjust this based on your current date
        expect(next7Days(eventToday)).toBe(expectedResult);
        expect(next7Days(eventNext7Days)).toBe(true);
        expect(next7Days(eventNext30Days)).toBe(false);
    });

    test('next30Days function correctly identifies events in the next 30 days', () => {
        const expectedResult = true; // You can adjust this based on your current date
        expect(next30Days(eventToday)).toBe(expectedResult);
        expect(next30Days(eventNext7Days)).toBe(true);
        expect(next30Days(eventNext30Days)).toBe(true);
    });
});
