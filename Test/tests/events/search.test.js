import { it, vi, expect, describe } from 'vitest';
import getEvents from '../js/events/search';

describe('getEvents', () => {
  const events = [
    { id: 1, name: 'Event 1' },
    { id: 2, name: 'Event 2' },
    { id: 3, name: 'Event 3' },
  ];

  it('should return an empty array if no events match the search predicate', () => {
    const searchPredicate = (event) => event.name.includes('Nonexistent');
    const result = getEvents(events, searchPredicate);
    expect(result).toEqual([]);
  });

  it('should return an array of events that match the search predicate', () => {
    const searchPredicate = (event) => event.name.includes('Event');
    const result = getEvents(events, searchPredicate);
    expect(result).toEqual(events);
  });

  it('should return a subset of events that match the search predicate', () => {
    const searchPredicate = (event) => event.id > 1;
    const result = getEvents(events, searchPredicate);
    expect(result).toEqual([events[1], events[2]]);
  });
});