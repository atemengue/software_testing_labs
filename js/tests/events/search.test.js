import { describe, it, expect } from 'vitest';
import getEvents from '../../events/search';

// Mock data for testing
const events = [
    { id: 1, name: 'Event 1', ticketsRemaining: 10 },
    { id: 2, name: 'Event 2', ticketsRemaining: 5 },
    { id: 3, name: 'Event 3', ticketsRemaining: 0 },
];

// Define search predicates for testing
const searchPredicate1 = event => event.ticketsRemaining > 0;
const searchPredicate2 = event => event.name.includes('Event');

// Tests for getEvents function
describe('getEvents', () => {
  it('filters events correctly based on search predicate 1', () => {
    const result = getEvents(events, searchPredicate1);
    expect(result.length).toBe(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });

  it('filters events correctly based on search predicate 2', () => {
    const result = getEvents(events, searchPredicate2);
    expect(result.length).toBe(3);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
  });
});
