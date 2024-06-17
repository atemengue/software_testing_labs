// Importation des modules nécessaires pour les tests
import { describe, it, expect } from 'vitest';
import { today, next7Days, next30Days } from '../../../js/events/filters';

describe('Tests pour la fonction today', () => {
    it('devrait retourner vrai si l\'événement est aujourd\'hui', () => {
        // Création d'un événement dont la date est aujourd'hui
        const event = { date: new Date() };
        // Vérifie que la fonction today retourne vrai
        expect(today(event)).toBe(true);
    });

    it('devrait retourner faux si l\'événement n\'est pas aujourd\'hui', () => {
        // Création d'un événement dont la date est différente d'aujourd'hui
        const event = { date: new Date('2025-01-01') };
        // Vérifie que la fonction today retourne faux
        expect(today(event)).toBe(false);
    });
});

describe('Tests pour la fonction next7Days', () => {
    it('devrait retourner vrai si l\'événement est dans les 7 prochains jours', () => {
        // Création d'un événement dont la date est dans 5 jours
        const event = { date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) };
        // Vérifie que la fonction next7Days retourne vrai
        expect(next7Days(event)).toBe(true);
    });

    it('devrait retourner faux si l\'événement n\'est pas dans les 7 prochains jours', () => {
        // Création d'un événement dont la date est dans 10 jours
        const event = { date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) };
        // Vérifie que la fonction next7Days retourne faux
        expect(next7Days(event)).toBe(false);
    });

    it('devrait retourner vrai si l\'événement est aujourd\'hui', () => {
        // Création d'un événement dont la date est aujourd'hui
        const event = { date: new Date() };
        // Vérifie que la fonction next7Days retourne vrai
        expect(next7Days(event)).toBe(true);
    });
});

describe('Tests pour la fonction next30Days', () => {
    it('devrait retourner vrai si l\'événement est dans les 30 prochains jours', () => {
        // Création d'un événement dont la date est dans 15 jours
        const event = { date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) };
        // Vérifie que la fonction next30Days retourne vrai
        expect(next30Days(event)).toBe(true);
    });

    it('devrait retourner faux si l\'événement n\'est pas dans les 30 prochains jours', () => {
        // Création d'un événement dont la date est dans 40 jours
        const event = { date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000) };
        // Vérifie que la fonction next30Days retourne faux
        expect(next30Days(event)).toBe(false);
    });

    it('devrait retourner vrai si l\'événement est aujourd\'hui', () => {
        // Création d'un événement dont la date est aujourd'hui
        const event = { date: new Date() };
        // Vérifie que la fonction next30Days retourne vrai
        expect(next30Days(event)).toBe(true);
    });
});
