import getEvents from './search';

describe('getEvents', () => {
    const events = [
        { id: 1, name: 'Concert', date: new Date('2024-06-15') },
        { id: 2, name: 'Theater', date: new Date('2024-06-20') },
        { id: 3, name: 'Sports', date: new Date('2024-07-01') }
    ];

    const searchPredicate = event => event.name.includes('Concert');

    test('returns events that match the search predicate', () => {
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
});
