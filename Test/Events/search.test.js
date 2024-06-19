import { describe, it, expect } from 'vitest';
import getEvents from '../../js/events/search';
import { Event } from '../../js/events/event';

describe('getEvents', () => {
  const events = [
    new Event(1, 'Test Event 1', 50, 100, 50, '2023-06-17'),
    new Event(2, 'Test Event 2', 60, 80, 20, '2023-06-24'),
    new Event(3, 'Test Event 3', 40, 120, 80, '2023-07-01'),
    new Event(4, 'Test Event 4', 55, 90, 10, '2023-07-08'),
  ];

  it('should return all events when the search predicate is not provided', () => {
    const result = getEvents(events);
    expect(result).toEqual(events);
  });

  it('should return events that match the search predicate', () => {
    const searchPredicate = (event) => event.name.includes('Test Event 2');
    const result = getEvents(events, searchPredicate);
    expect(result).toEqual([events[1]]);
  });

  it('should return an empty array when no events match the search predicate', () => {
    const searchPredicate = (event) => event.name.includes('Non-Existent Event');
    const result = getEvents(events, searchPredicate);
    expect(result).toEqual([]);
  });
});