import { Event } from '../../js/events/event';
import getEvents from '../../js/events/search';

describe('getEvents', () => {
  // Cas de test 1 : Filtrer des événements avec une fonction de recherche valide
  test('should filter events with a valid search predicate', () => {
    // Arrange
    const events = [
      new Event(1, 'Event 1', 100, 1000, 500, new Date('2023-06-01')),
      new Event(2, 'Event 2', 50, 500, 100, new Date('2023-06-15')),
      new Event(3, 'Event 3', 75, 750, 400, new Date('2023-06-01')),
    ];
    const searchPredicate = (event) => event.date.getDate() === 1;

    // Act
    const filteredEvents = getEvents(events, searchPredicate);

    // Assert
    expect(filteredEvents.length).toBeLessThanOrEqual(events.length);
    expect(filteredEvents).toEqual([
      new Event(1, 'Event 1', 100, 1000, 500, new Date('2023-06-01')),
      new Event(3, 'Event 3', 75, 750, 400, new Date('2023-06-01')),
    ]);
  });

  // Cas de test 2 : Filtrer un tableau d'événements vide
  test('should return an empty array when filtering an empty events array', () => {
    // Arrange
    const events = [];
    const searchPredicate = (event) => event.date.getDate() === 1;

    // Act
    const filteredEvents = getEvents(events, searchPredicate);

    // Assert
    expect(filteredEvents).toEqual([]);
  });

  // Cas de test 3 : Utiliser une fonction de recherche invalide
  test('should throw an error when using an invalid search predicate', () => {
    // Arrange
    const events = [
      new Event(1, 'Event 1', 100, 1000, 500, new Date('2023-06-01')),
      new Event(2, 'Event 2', 50, 500, 100, new Date('2023-06-15')),
      new Event(3, 'Event 3', 75, 750, 400, new Date('2023-06-01')),
    ];
    const invalidSearchPredicate = null;

    // Act
    expect(() => getEvents(events, invalidSearchPredicate)).toThrow();
  });

  // Cas de test 4 : Filtrer des événements avec une fonction de recherche qui retourne toujours true
  test('should return all events when the search predicate always returns true', () => {
    // Arrange
    const events = [
      new Event(1, 'Event 1', 100, 1000, 500, new Date('2023-06-01')),
      new Event(2, 'Event 2', 50, 500, 100, new Date('2023-06-15')),
      new Event(3, 'Event 3', 75, 750, 400, new Date('2023-06-01')),
    ];
    const searchPredicate = () => true;

    // Act
    const filteredEvents = getEvents(events, searchPredicate);

    // Assert
    expect(filteredEvents).toEqual(events);
  });
});