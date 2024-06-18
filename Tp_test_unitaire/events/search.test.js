import{getEvents} from './search.js';
import{describe,test,expect} from 'vitest';

describe('tester la fonction getEvents', () => {
    // Test pour des événements dans les 7 prochains jours
    test('renvoie un tableau d\'événements pour les dates dans les 7 prochains jours', () => {
            // Arrange
        const events = [
                { date: new Date(new Date().setDate(new Date().getDate() + 1)) }, // Un jour dans le futur
                { date: new Date(new Date().setDate(new Date().getDate() + 8)) }, // Huit jours dans le futur
                { date: new Date(new Date().setDate(new Date().getDate() - 1)) }  // Un jour dans le passé
            ];
            const predicate = event => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const future = new Date(today);
                future.setDate(future.getDate() + 7);
                return event.date >= today && event.date <= future;
            };
        
            // Act
            const filteredEvents = getEvents(events, predicate);
        
            // Assert
            expect(filteredEvents).toEqual([events[0]]);
            });
        
            // Test pour des événements avec des dates spécifiques
            test('renvoie un tableau d\'événements pour une date spécifique', () => {
            // Arrange
            const specificDate = new Date(2024, 5, 16); // 16 juin 2024
            const events = [
            { date: new Date(2024, 5, 16) },
            { date: new Date(2024, 5, 17) },
            { date: new Date(2024, 5, 15) }
          ];
          const predicate = event => event.date.toDateString() === specificDate.toDateString();
      
          // Act
          const filteredEvents = getEvents(events, predicate);
      
          // Assert
          expect(filteredEvents).toEqual([events[0]]);
        });
      
        // Test pour exclure des événements avec des dates spécifiques
        test('exclut les événements pour une date spécifique', () => {
          // Arrange
          const specificDate = new Date(2024, 5, 16); // 16 juin 2024
          const events = [
            { date: new Date(2024, 5, 16) },
            { date: new Date(2024, 5, 17) },
            { date: new Date(2024, 5, 15) }
          ];
          const predicate = event => event.date.toDateString() !== specificDate.toDateString();
      
          // Act
          const filteredEvents = getEvents(events, predicate);
      
          // Assert
          expect(filteredEvents).toEqual([events[1], events[2]]);
        });
      
        // Test pour des événements pendant le week-end
        test('renvoie un tableau d\'événements pendant le week-end', () => {
          // Arrange
          const events = [
            { date: new Date(2024, 5, 14) }, // Vendredi
            { date: new Date(2024, 5, 15) }, // Samedi (week-end)
            { date: new Date(2024, 5, 16) }  // Dimanche (week-end)
          ];
          const predicate = event => {
            const dayOfWeek = event.date.getDay();
            return dayOfWeek === 6 || dayOfWeek === 0; // Samedi ou Dimanche
          };
      
          // Act
          const filteredEvents = getEvents(events, predicate);
      
          // Assert
          expect(filteredEvents).toEqual([events[1], events[2]]);
        });

})