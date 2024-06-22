
// getEvents.test.js
import { describe, it, expect } from 'vitest';
import getEvents from '../../js/events/search';

// Tests pour getEvents
describe('getEvents', () => {
    it('should return events that match the search predicate', () => {
        // Arrange
        const events = [
            { id: 1, name: 'Event A', type: 'concert' },
            { id: 2, name: 'Event B', type: 'conference' },
            { id: 3, name: 'Event C', type: 'concert' }
        ];
        const searchPredicate = event => event.type === 'concert';

        // Act
        const result = getEvents(events, searchPredicate);

        // Assert
        expect(result).toEqual([
            { id: 1, name: 'Event A', type: 'concert' },
            { id: 3, name: 'Event C', type: 'concert' }
        ]);
    });

    it('should return an empty array if no events match the search predicate', () => {
        // Arrange
        const events = [
            { id: 1, name: 'Event A', type: 'concert' },
            { id: 2, name: 'Event B', type: 'conference' },
            { id: 3, name: 'Event C', type: 'concert' }
        ];
        const searchPredicate = event => event.type === 'workshop';

        // Act
        const result = getEvents(events, searchPredicate);

        // Assert
        expect(result).toEqual([]);
    });

    it('should return all events if the search predicate matches all', () => {
        // Arrange
        const events = [
            { id: 1, name: 'Event A', type: 'concert' },
            { id: 2, name: 'Event B', type: 'conference' },
            { id: 3, name: 'Event C', type: 'concert' }
        ];
        const searchPredicate = () => true;

        // Act
        const result = getEvents(events, searchPredicate);

        // Assert
        expect(result).toEqual(events);
    });

    it('should return an empty array if events array is empty', () => {
        // Arrange
        const events = [];
        const searchPredicate = event => event.type === 'concert';

        // Act
        const result = getEvents(events, searchPredicate);

        // Assert
        expect(result).toEqual([]);
    });
});


/* Définition des tests :

Test 1 : Vérifie que getEvents retourne les événements correspondant au prédicat de recherche (type égal à concert).
Test 2 : Vérifie que getEvents retourne un tableau vide si aucun événement ne correspond au prédicat de recherche (type égal à workshop).
Test 3 : Vérifie que getEvents retourne tous les événements si le prédicat de recherche correspond à tous les événements (prédicat toujours vrai).
Test 4 : Vérifie que getEvents retourne un tableau vide si le tableau des événements est vide. */