import { describe, it, expect } from 'vitest';
import { InvalidEventNameError, InvalidEventPriceError } from '../../js/events/event';
import { Event, isSoldOut, getTagLine, createEvent } from '../../js/events/event';

// Tests pour la classe Event
describe('Event class', () => {
    it('should create an event instance correctly', () => {
        // Arrange
        const id = 1;
        const name = 'Test Event';
        const ticketPrice = 100;
        const totalTickets = 50;
        const ticketsRemaining = 50;
        const date = new Date();

        // Act
        const event = new Event(id, name, ticketPrice, totalTickets, ticketsRemaining, date);

        // Assert
        expect(event.id).toBe(id);
        expect(event.name).toBe(name);
        expect(event.ticketPrice).toBe(ticketPrice);
        expect(event.totalTickets).toBe(totalTickets);
        expect(event.ticketsRemaining).toBe(ticketsRemaining);
        expect(event.date).toBe(date);
    });
});

// Tests pour isSoldOut
describe('isSoldOut', () => {
    it('should return true if ticketsRemaining is 0', () => {
        // Arrange
        const event = new Event(1, 'Sold Out Event', 50, 100, 0, new Date());

        // Act
        const result = isSoldOut(event);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false if ticketsRemaining is more than 0', () => {
        // Arrange
        const event = new Event(1, 'Available Event', 50, 100, 10, new Date());

        // Act
        const result = isSoldOut(event);

        // Assert
        expect(result).toBe(false);
    });
});

// Tests pour getTagLine
describe('getTagLine', () => {
    it('should return "Event Sold Out!" if the event is sold out', () => {
        // Arrange
        const event = new Event(1, 'Sold Out Event', 50, 100, 0, new Date());

        // Act
        const result = getTagLine(event, 5, false);

        // Assert
        expect(result).toBe("Event Sold Out!");
    });

    it('should return "Hurry only X tickets left!" if tickets remaining are less than minimumTicketCount', () => {
        // Arrange
        const event = new Event(1, 'Limited Tickets Event', 50, 100, 3, new Date());

        // Act
        const result = getTagLine(event, 5, false);

        // Assert
        expect(result).toBe("Hurry only 3 tickets left!");
    });

    it('should return a popular event tagline if isPopular is true', () => {
        // Arrange
        const event = new Event(1, 'Popular Event', 50, 100, 10, new Date());

        // Act
        const result = getTagLine(event, 5, true);

        // Assert
        expect(result).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
    });

    it('should return a standard tagline if the event is not sold out, has enough tickets, and is not popular', () => {
        // Arrange
        const event = new Event(1, 'Standard Event', 50, 100, 10, new Date());

        // Act
        const result = getTagLine(event, 5, false);

        // Assert
        expect(result).toBe("Don't miss out, purchase your ticket now!");
    });
});

// Tests pour createEvent
describe('createEvent', () => {
    it('should create an event if the inputs are valid', () => {
        // Arrange
        const name = 'New Event';
        const price = 50;
        const availableTickets = 100;

        // Act
        const event = createEvent(name, price, availableTickets);

        // Assert
        expect(event).toBeInstanceOf(Event);
        expect(event.name).toBe(name);
        expect(event.ticketPrice).toBe(price);
        expect(event.totalTickets).toBe(availableTickets);
    });

    it('should throw InvalidEventNameError if the name is not a string or exceeds 200 characters', () => {
        // Arrange
        const name = 123;  // Invalid name
        const price = 50;
        const availableTickets = 100;

        // Act & Assert
        expect(() => createEvent(name, price, availableTickets)).toThrow(InvalidEventNameError);
    });

    it('should throw InvalidEventPriceError if the price is not a number or is less than 0', () => {
        // Arrange
        const name = 'Valid Name';
        const price = -10;  // Invalid price
        const availableTickets = 100;

        // Act & Assert
        expect(() => createEvent(name, price, availableTickets)).toThrow(InvalidEventPriceError);
    });

    it('should throw InvalidEventPriceError if the availableTickets is not a number or is less than 1', () => {
        // Arrange
        const name = 'Valid Name';
        const price = 50;
        const availableTickets = 0;  // Invalid tickets

        // Act & Assert
        expect(() => createEvent(name, price, availableTickets)).toThrow(InvalidEventPriceError);
    });
});

/* Explication :

Importation des modules: Nous importons les fonctions et les classes nécessaires ainsi que les exceptions.

Tests pour la classe Event :
Vérifie si une instance de Event est correctement créée avec les valeurs fournies.

Tests pour isSoldOut :
Vérifie si la fonction retourne true lorsque les tickets restants sont 0.
Vérifie si la fonction retourne false lorsque les tickets restants sont plus de 0.

Tests pour getTagLine :
Vérifie les différents cas pour les taglines en fonction des tickets restants et si l'événement est populaire ou non.

Tests pour createEvent :
Vérifie si un événement est créé correctement avec des entrées valides.
Vérifie si des exceptions sont levées pour des entrées invalides (nom incorrect, prix incorrect, tickets disponibles incorrects).

Remarque : Assurez-vous d'ajuster les chemins d'importation (../error-handling/exceptions et ./your-module) selon votre structure de projet réelle. */