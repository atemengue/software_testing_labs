import { describe, it, expect, vi } from 'vitest';
import { Event, isSoldOut, getTagLine, createEvent } from '../../js/events/event';
import { InvalidEventNameError, InvalidEventPriceError } from '../../js/error-handling/exceptions'; 

describe('isSoldOut', () => {
    it('devrait retourner true si le nombre de tickets restants est 0', () => {
        const event = new Event(1, 'Concert', 50, 100, 0, new Date());
        expect(isSoldOut(event)).toBe(true);
    });

    it('devrait retourner false si le nombre de tickets restants est supérieur à 0', () => {
        const event = new Event(1, 'Concert', 50, 100, 10, new Date());
        expect(isSoldOut(event)).toBe(false);
    });
});

describe('getTagLine', () => {
    it('devrait retourner "Event Sold Out!" si l\'événement est complet', () => {
        const event = new Event(1, 'Concert', 50, 100, 0, new Date());
        expect(getTagLine(event, 10, false)).toBe("Event Sold Out!");
    });

    it('devrait retourner un message d\'urgence si les tickets restants sont inférieurs au minimum', () => {
        const event = new Event(1, 'Concert', 50, 100, 5, new Date());
        expect(getTagLine(event, 10, false)).toBe("Hurry only 5 tickets left!");
    });

    it('devrait retourner un message d\'urgence au singulier si un seul ticket reste', () => {
        const event = new Event(1, 'Concert', 50, 100, 1, new Date());
        expect(getTagLine(event, 10, false)).toBe("Hurry only 1 ticket left!");
    });

    it('devrait retourner un message pour les événements populaires', () => {
        const event = new Event(1, 'Concert', 50, 100, 20, new Date());
        expect(getTagLine(event, 10, true)).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
    });

    it('devrait retourner un message standard si l\'événement n\'est pas complet et n\'est pas populaire', () => {
        const event = new Event(1, 'Concert', 50, 100, 20, new Date());
        expect(getTagLine(event, 10, false)).toBe("Don't miss out, purchase your ticket now!");
    });
});

describe('createEvent', () => {
    it('devrait créer un événement valide avec les paramètres corrects', () => {
        const event = createEvent('Concert', 50, 100);
        expect(event).toBeInstanceOf(Event);
        expect(event.name).toBe('Concert');
        expect(event.ticketPrice).toBe(50);
        expect(event.totalTickets).toBe(100);
        expect(event.ticketsRemaining).toBe(undefined);
    });

    it('devrait lancer une erreur si le nom de l\'événement dépasse 200 caractères', () => {
        const longName = 'a'.repeat(201);
        expect(() => createEvent(longName, 50, 100)).toThrow(InvalidEventNameError);
    });

    it('devrait lancer une erreur si le prix de l\'événement est négatif', () => {
        expect(() => createEvent('Concert', -1, 100)).toThrow(InvalidEventPriceError);
    });

    it('devrait lancer une erreur si le nombre de tickets disponibles est inférieur à 1', () => {
        expect(() => createEvent('Concert', 50, 0)).toThrow(InvalidEventPriceError);
    });
});