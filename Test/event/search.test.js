import {expect,describe,test} from 'vitest'
import getEvents from './js/events/search'


describe('getEvents', () => {
    const events = [
      { id: 1, name: 'Event 1', date: '2023-06-01' },
      { id: 2, name: 'Event 2', date: '2023-07-15' },
      { id: 3, name: 'Event 3', date: '2023-08-30' },
      { id: 4, name: 'Event 4', date: '2023-09-20' },
    ];
  
    test('doit me retourner tous les elements lorsque le predicat n\'est pas defini', () => {
      const result = getEvents(events, () => true);
      expect(result).toEqual(events);
    });
  
    test('doit me retouner l\'evenement qui correspond au predicat', () => {
      const searchPredicate = (event) => event.name.includes('Event 2');
      const result = getEvents(events, searchPredicate);
      expect(result).toEqual([events[1]]);
    });
  
    test('doit me retouner u tableau vide si aucun element ne correspond au predicat', () => {
      const searchPredicate = (event) => event.name.includes('Non-existent Event');
      const result = getEvents(events, searchPredicate);
      expect(result).toEqual([]);
    });
  }); 
