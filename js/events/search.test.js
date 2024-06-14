import getEvents from './search';

describe('getEvents', () => {
    const events = [
        { id: 1, name: 'Concert', date: new Date('2024-06-15') },
        { id: 2, name: 'Theater', date: new Date('2024-06-20') },
        { id: 3, name: 'Sports', date: new Date('2024-07-01') }
    ];

    test('returns events that match the search predicate', () => {
        const searchPredicate = event => event.name.includes('Concert');
        const result = getEvents(events, searchPredicate);
        expect(result).toEqual([{ id: 1, name: 'Concert', date: new Date('2024-06-15') }]);
    });

    test('returns an empty array when no events match the search predicate', () => {
        const noMatchPredicate = event => event.name.includes('Dance');
        const result = getEvents(events, noMatchPredicate);
        expect(result).toEqual([]);
    });

    test('returns all events when the predicate matches all', () => {
        const matchAllPredicate = event => true;
        const result = getEvents(events, matchAllPredicate);
        expect(result).toEqual(events);
    });

    test('should filter events with a valid search predicate', () => {
        const events = [
            { id: 1, name: 'Event 1', date: new Date('2023-06-01') },
            { id: 2, name: 'Event 2', date: new Date('2023-06-15') },
            { id: 3, name: 'Event 3', date: new Date('2023-06-01') }
        ];
        const searchPredicate = event => event.date.getDate() === 1;
        const filteredEvents = getEvents(events, searchPredicate);
        expect(filteredEvents.length).toBeLessThanOrEqual(events.length);
        expect(filteredEvents).toEqual([
            { id: 1, name: 'Event 1', date: new Date('2023-06-01') },
            { id: 3, name: 'Event 3', date: new Date('2023-06-01') }
        ]);
    });

    test('should return an empty array when filtering an empty events array', () => {
        const events = [];
        const searchPredicate = event => event.date.getDate() === 1;
        const filteredEvents = getEvents(events, searchPredicate);
        expect(filteredEvents).toEqual([]);
    });

    test('should throw an error when using an invalid search predicate', () => {
        const events = [
            { id: 1, name: 'Event 1', date: new Date('2023-06-01') },
            { id: 2, name: 'Event 2', date: new Date('2023-06-15') },
            { id: 3, name: 'Event 3', date: new Date('2023-06-01') }
        ];
        const invalidSearchPredicate = null;
        expect(() => getEvents(events, invalidSearchPredicate)).toThrow();
    });

    test('should return all events when the search predicate always returns true', () => {
        const events = [
            { id: 1, name: 'Event 1', date: new Date('2023-06-01') },
            { id: 2, name: 'Event 2', date: new Date('2023-06-15') },
            { id: 3, name: 'Event 3', date: new Date('2023-06-01') }
        ];
        const searchPredicate = () => true;
        const filteredEvents = getEvents(events, searchPredicate);
        expect(filteredEvents).toEqual(events);
    });
});
