import { describe, it, expect } from 'vitest';
import { BasketItem } from '../../js/basket/basketitem';

// Début des tests pour la classe BasketItem
describe('BasketItem', () => {

    // Test du constructeur
    it('devrait initialiser correctement les propriétés event et ticketCount', () => {
        const event = { ticketPrice: 50 };
        const ticketCount = 2;
        const basketItem = new BasketItem(event, ticketCount);

        expect(basketItem.event.ticketPrice).toBe(event.ticketPrice); // Vérifie que la propriété ticketPrice est correctement initialisée
        expect(basketItem.ticketCount).toBe(ticketCount); // Vérifie que la propriété ticketCount est correctement initialisée
    });

    // Test de la méthode getPrice
    it('devrait retourner le prix correct basé sur le prix des tickets et le nombre de tickets', () => {
        const event = { ticketPrice: 50 };
        const ticketCount = 2;
        const basketItem = new BasketItem(event, ticketCount);

        const expectedPrice = event.ticketPrice * ticketCount;
        expect(basketItem.getPrice()).toBe(expectedPrice); // Vérifie que la méthode getPrice retourne le bon prix
    });

    // Test avec un ticketCount de zéro
    it('devrait retourner 0 si le nombre de tickets est 0', () => {
        const event = { ticketPrice: 50 };
        const ticketCount = 0;
        const basketItem = new BasketItem(event, ticketCount);

        expect(basketItem.getPrice()).toBe(0); // Vérifie que le prix est 0 si le nombre de tickets est 0
    });

    // Test avec un ticketCount négatif
    it('devrait initialiser ticketCount à 0 si le nombre de tickets est négatif', () => {
        const event = { ticketPrice: 50 };
        const ticketCount = -2;
        const basketItem = new BasketItem(event, ticketCount);

        expect(basketItem.ticketCount).toBe(0); // Vérifie que ticketCount est 0 si le nombre de tickets est négatif
        expect(basketItem.getPrice()).toBe(0); // Vérifie que le prix est 0 si le nombre de tickets est négatif
    });

    // Test avec un ticketPrice négatif
    it('devrait initialiser ticketPrice à 0 si le prix du ticket est négatif', () => {
        const event = { ticketPrice: -50 };
        const ticketCount = 2;
        const basketItem = new BasketItem(event, ticketCount);

        expect(basketItem.event.ticketPrice).toBe(0); // Vérifie que ticketPrice est 0 si le prix du ticket est négatif
        expect(basketItem.getPrice()).toBe(0); // Vérifie que le prix est 0 si le prix du ticket est négatif
    });
});