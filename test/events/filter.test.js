import { describe, it, expect } from 'vitest';
import { today, next7Days, next30Days } from '../../js/events/filters';

// Arrange
const createEvent = (date) => ({ date: new Date(date) });

describe('Date Functions', () => {
    // Tests pour today
    it('today should return true if event is today', () => {
        const event = createEvent(new Date());
        // Act
        const result = today(event);
        // Assert
        expect(result).toBe(true);
    });

    it('today should return false if event is not today', () => {
        const event = createEvent(new Date(new Date().setDate(new Date().getDate() + 1)));
        const result = today(event);
        expect(result).toBe(false);
    });

    // Tests pour next7Days
    it('next7Days should return true if event is within the next 7 days', () => {
        const event = createEvent(new Date(new Date().setDate(new Date().getDate() + 5)));
        const result = next7Days(event);
        expect(result).toBe(true);
    });

    it('next7Days should return false if event is not within the next 7 days', () => {
        const event = createEvent(new Date(new Date().setDate(new Date().getDate() + 8)));
        const result = next7Days(event);
        expect(result).toBe(false);
    });

    // Tests pour next30Days
    it('next30Days should return true if event is within the next 30 days', () => {
        const event = createEvent(new Date(new Date().setDate(new Date().getDate() + 20)));
        const result = next30Days(event);
        expect(result).toBe(true);
    });

    it('next30Days should return false if event is not within the next 30 days', () => {
        const event = createEvent(new Date(new Date().setDate(new Date().getDate() + 31)));
        const result = next30Days(event);
        expect(result).toBe(false);
    });
});
/* Explication
1.	Importations : Importez les fonctions describe, it, et expect de Vitest, ainsi que les fonctions à tester depuis votre module.
2.	Arrange : Définissez une fonction utilitaire createEvent pour créer des objets événementiels avec des dates spécifiques.
3.	Définition des tests :
	today :
	Vérifiez que la fonction retourne true pour un événement ayant lieu aujourd'hui.
	Vérifiez que la fonction retourne false pour un événement ayant lieu un autre jour.
	next7Days :
	Vérifiez que la fonction retourne true pour un événement dans les 7 jours.
	Vérifiez que la fonction retourne false pour un événement au-delà des 7 jours.
	next30Days :
	Vérifiez que la fonction retourne true pour un événement dans les 30 jours.
	Vérifiez que la fonction retourne false pour un événement au-delà des 30 jours.
*/