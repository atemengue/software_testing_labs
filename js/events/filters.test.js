import { today, next7Days, next30Days } from './filters';

describe('Filter Functions', () => {
    const todayDate = new Date();
    const pastEvent = { date: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 1) };
    const todayEvent = { date: new Date() };
    const futureEventWithin7Days = { date: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 5) };
    const futureEventWithin30Days = { date: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 25) };
    const futureEventOutside30Days = { date: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 31) };

    describe('today', () => {
        test('returns true if the event is today', () => {
            expect(today(todayEvent)).toBe(true);
        });

        test('returns false if the event is not today', () => {
            expect(today(pastEvent)).toBe(false);
        });
    });

    describe('next7Days', () => {
        test('returns true if the event is within the next 7 days', () => {
            expect(next7Days(futureEventWithin7Days)).toBe(true);
        });

        test('returns false if the event is not within the next 7 days', () => {
            expect(next7Days(futureEventOutside30Days)).toBe(false);
        });
    });

    describe('next30Days', () => {
        test('returns true if the event is within the next 30 days', () => {
            expect(next30Days(futureEventWithin30Days)).toBe(true);
        });

        test('returns false if the event is not within the next 30 days', () => {
            expect(next30Days(futureEventOutside30Days)).toBe(false);
        });
    });
});
