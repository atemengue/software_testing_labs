import { describe, it, expect } from 'vitest';
import getEvents from '../software_testing_labs/js/events/search';

describe('getEvents', () => {
    it('should filter events based on predicate', () => {
        // Arrange
        const events = [
            { id: 1, name: 'Event1', ticketsAvailable: 10 },
            { id: 2, name: 'Event2', ticketsAvailable: 0 },
            { id: 3, name: 'Event3', ticketsAvailable: 5 }
        ];

        // Act
        const result = getEvents(events, event => event.ticketsAvailable > 0);

        // Assert
        expect(result).toEqual([
            { id: 1, name: 'Event1', ticketsAvailable: 10 },
            { id: 3, name: 'Event3', ticketsAvailable: 5 }
        ]);
    });

    it('should return an empty array if no events match the predicate', () => {
        // Arrange
        const events = [
            { id: 1, name: 'Event1', ticketsAvailable: 10 },
            { id: 2, name: 'Event2', ticketsAvailable: 0 },
            { id: 3, name: 'Event3', ticketsAvailable: 5 }
        ];

        // Act
        const result = getEvents(events, event => event.ticketsAvailable === 0);

        // Assert
        expect(result).toEqual([{ id: 2, name: 'Event2', ticketsAvailable: 0 }]);
    });
});
