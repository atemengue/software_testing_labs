import { describe, it, expect } from 'vitest';
import getEvents from '../../js/events/search'; 

// Sample events data
const events = [
    { id: 1, name: 'Concert', date: new Date('2024-06-20') },
    { id: 2, name: 'Theater Show', date: new Date('2024-06-25') },
    { id: 3, name: 'Conference', date: new Date('2024-07-05') }
];

describe('getEvents Function', () => {
    it('should filter events based on a search predicate', () => {
        const searchPredicate = event => event.name.toLowerCase().includes('concert');
        const filteredEvents = getEvents(events, searchPredicate);
        
        expect(filteredEvents).toHaveLength(1);
        expect(filteredEvents[0].name).toBe('Concert');
    });

    it('should return empty array if no events match the search predicate', () => {
        const searchPredicate = event => event.name.toLowerCase().includes('sport');
        const filteredEvents = getEvents(events, searchPredicate);
        
        expect(filteredEvents).toHaveLength(0);
    });

    it('should return all events if search predicate allows all', () => {
        const searchPredicate = () => true; // Matches all events
        const filteredEvents = getEvents(events, searchPredicate);
        
        expect(filteredEvents).toHaveLength(3);
    });

    it('should handle case-insensitive search', () => {
        const searchPredicate = event => event.name.toLowerCase().includes('theater');
        const filteredEvents = getEvents(events, searchPredicate);
        
        expect(filteredEvents).toHaveLength(1);
        expect(filteredEvents[0].name).toBe('Theater Show');
    });
});
