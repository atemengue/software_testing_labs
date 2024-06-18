// Importation des modules nécessaires pour les tests
import { describe, it, expect } from 'vitest';
import { Event, isSoldOut, getTagLine, createEvent } from '../../../js/events/event';
import { InvalidEventNameError, InvalidEventPriceError } from '../../../js/error-handling/exceptions';

describe('Tests pour la fonction isSoldOut', () => {
    // Test lorsque les billets sont épuisés
    it('devrait retourner vrai si tous les billets sont vendus', () => {
        const event = new Event(1, 'Concert', 50, 100, 0, new Date());
        expect(isSoldOut(event)).toBe(true);
    });

    // Test lorsque des billets sont encore disponibles
    it('devrait retourner faux s\'il reste des billets', () => {
        const event = new Event(1, 'Concert', 50, 100, 10, new Date());
        expect(isSoldOut(event)).toBe(false);
    });
});

describe('Tests pour la fonction getTagLine', () => {
    // Test lorsque l'événement est complet
    it('devrait retourner "Event Sold Out!" si l\'événement est complet', () => {
        const event = new Event(1, 'Concert', 50, 100, 0, new Date());
        expect(getTagLine(event, 10, false)).toBe("Event Sold Out!");
    });

    // Test lorsque les billets restants sont inférieurs au minimum requis
    it('devrait retourner un message d\'urgence si les billets restants sont inférieurs au minimum requis', () => {
        const event = new Event(1, 'Concert', 50, 100, 5, new Date());
        expect(getTagLine(event, 10, false)).toBe("Hurry only 5 tickets left!");
    });

    // Test lorsque l'événement est populaire
    it('devrait retourner un message spécial si l\'événement est populaire', () => {
        const event = new Event(1, 'Concert', 50, 100, 50, new Date());
        expect(getTagLine(event, 10, true)).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
    });

    // Test du message par défaut
    it('devrait retourner un message par défaut si l\'événement n\'est pas complet et n\'est pas populaire', () => {
        const event = new Event(1, 'Concert', 50, 100, 50, new Date());
        expect(getTagLine(event, 10, false)).toBe("Don't miss out, purchase your ticket now!");
    });
});

describe('Tests pour la fonction createEvent', () => {
    // Test de la création réussie d'un événement
    it('devrait créer un événement avec des valeurs valides', () => {
        const event = createEvent('Concert', 50, 100);
        expect(event.name).toBe('Concert');
        expect(event.ticketPrice).toBe(50);
        expect(event.totalTickets).toBe(100);
    });

    // Test pour un nom d'événement invalide
    it('devrait lancer une erreur pour un nom d\'événement invalide', () => {
        expect(() => createEvent(123, 50, 100)).toThrow(InvalidEventNameError);
        expect(() => createEvent('a'.repeat(201), 50, 100)).toThrow(InvalidEventNameError);
    });

    // Test pour un prix de billet invalide
    it('devrait lancer une erreur pour un prix de billet invalide', () => {
        expect(() => createEvent('Concert', -10, 100)).toThrow(InvalidEventPriceError);
        expect(() => createEvent('Concert', 'gratuit', 100)).toThrow(InvalidEventPriceError);
    });

    // Test pour un nombre de billets disponibles invalide
    it('devrait lancer une erreur pour un nombre de billets disponibles invalide', () => {
        expect(() => createEvent('Concert', 50, 0)).toThrow(InvalidEventPriceError);
        expect(() => createEvent('Concert', 50, 'beaucoup')).toThrow(InvalidEventPriceError);
    });
});
