import { vi, it, describe, expect } from 'vitest';
import getEvents from '../../js/events/search';
import { Event } from '../../js/events/event';

describe('getEvents', () => {
  let event1 = new Event(1, 'concert Fally Ipupa', 20000, 5000, 4500, '18/06/2024');
  let event2 = new Event(2, 'Miss & Masters competition', 2000, 500, 500, '21/08/2024');
  let event3 = new Event(3, 'concert Tenor', 5000, 3000, 2785, '03/09/2024');
  let event4 = new Event(4, 'AI conference', 2000, 1500, 1500, '09/011/2024');
  let event5 = new Event(5, 'Dance Battle', 0, 500, 5000, '31/06/2024');
  const events = [event1, event2, event3, event4, event5];

  const searchByName = (event) => {
    return event.name.toLowerCase().includes('concert');
  };
  const searchByDate = (event) => {
    return event.date.toLowerCase().includes('01/01/2035');
  };
  const result1 = getEvents(events, searchByName);

  it('should return only events matching search predicate', () => {
    expect(result1.length).toBe(2);
  });
  const result2 = getEvents(events, searchByDate);

  it('should return empty array if no event matching search predicate', () => {
    expect(result2.length).toBe(0);
  });
});
