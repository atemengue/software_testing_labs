// Importation des modules nécessaires pour les tests
import { describe, it, expect } from 'vitest';
import getEvents from '../../../js/events/search';

describe('Tests pour la fonction getEvents', () => {
    it('devrait retourner tous les événements correspondant au prédicat de recherche', () => {
        const events = [
            { name: 'Concert', date: new Date('2024-06-20') },
            { name: 'Conference', date: new Date('2024-07-15') },
            { name: 'Meetup', date: new Date('2024-06-25') },
        ];

        // Prédicat de recherche pour les événements en juin 2024
        const searchPredicate = event => event.date.getMonth() === 5; // Mois de juin (indexé à 5)

        // Vérifie que la fonction retourne les événements en juin 2024
        const filteredEvents = getEvents(events, searchPredicate);
        expect(filteredEvents.length).toBe(2);
        expect(filteredEvents).toContain(events[0]);
        expect(filteredEvents).toContain(events[2]);
    });

    it('devrait retourner un tableau vide si aucun événement ne correspond au prédicat de recherche', () => {
        const events = [
            { name: 'Concert', date: new Date('2024-06-20') },
            { name: 'Conference', date: new Date('2024-07-15') },
            { name: 'Meetup', date: new Date('2024-06-25') },
        ];

        // Prédicat de recherche pour les événements en décembre 2024
        const searchPredicate = event => event.date.getMonth() === 11; // Mois de décembre (indexé à 11)

        // Vérifie que la fonction retourne un tableau vide
        const filteredEvents = getEvents(events, searchPredicate);
        expect(filteredEvents.length).toBe(0);
    });

    it('devrait retourner tous les événements si le prédicat de recherche est toujours vrai', () => {
        const events = [
            { name: 'Concert', date: new Date('2024-06-20') },
            { name: 'Conference', date: new Date('2024-07-15') },
            { name: 'Meetup', date: new Date('2024-06-25') },
        ];

        // Prédicat de recherche qui retourne toujours vrai
        const searchPredicate = () => true;

        // Vérifie que la fonction retourne tous les événements
        const filteredEvents = getEvents(events, searchPredicate);
        expect(filteredEvents.length).toBe(events.length);
        expect(filteredEvents).toEqual(events);
    });

    it('devrait retourner un tableau vide si le prédicat de recherche est toujours faux', () => {
        const events = [
            { name: 'Concert', date: new Date('2024-06-20') },
            { name: 'Conference', date: new Date('2024-07-15') },
            { name: 'Meetup', date: new Date('2024-06-25') },
        ];

        // Prédicat de recherche qui retourne toujours faux
        const searchPredicate = () => false;

        // Vérifie que la fonction retourne un tableau vide
        const filteredEvents = getEvents(events, searchPredicate);
        expect(filteredEvents.length).toBe(0);
    });
});
