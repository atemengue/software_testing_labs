// getEvents.test.js

import getEvents from './getEvents';

describe('getEvents Function Tests', () => {
    const events = [
        { id: 1, name: 'Event 1', date: new Date('2024-07-01') },
        { id: 2, name: 'Event 2', date: new Date('2024-07-15') },
        { id: 3, name: 'Event 3', date: new Date('2024-08-01') }
    ];

    test('Filter Events by Name', () => {
        const searchPredicate = event => event.name === 'Event 2';
        const result = getEvents(events, searchPredicate);
        expect(result).toEqual([{ id: 2, name: 'Event 2', date: new Date('2024-07-15') }]);
    });

    test('Filter Events by Date Range', () => {
        const startDate = new Date('2024-07-01');
        const endDate = new Date('2024-07-31');
        const searchPredicate = event => event.date >= startDate && event.date <= endDate;
        const result = getEvents(events, searchPredicate);
        expect(result).toEqual([
            { id: 1, name: 'Event 1', date: new Date('2024-07-01') },
            { id: 2, name: 'Event 2', date: new Date('2024-07-15') }
        ]);
    });

    test('Empty Events Array', () => {
        const result = getEvents([], event => event.name === 'Event 1');
        expect(result).toEqual([]);
    });

    // Add more test cases for other scenarios as outlined in the test plan
});
