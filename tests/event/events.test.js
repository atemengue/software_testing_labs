import { expect, describe, it, vi } from "vitest";
import { Event, isSoldOut, getTagLine, createEvent } from "../../js/events/event";

/*describe("classe Event", () => {

});*/

/* Test de la fonction soldOut */
describe("fonction isSoldOut", () => {
    it("Doit retourner vrai s'il n'y a plus de tickets disponibles", () => {
        const event = new Event(1, "name", 1000, 20, 0/* TicketsRemaining */, new Date());
        expect(isSoldOut(event)).toBe(true);
    });

    it("Doit retourner faux si ticketsRemaining est différent de 0", () => {
        const event = new Event(1, "name", 1000, 20, 11/* TicketsRemaining */, new Date());
        expect(isSoldOut(event)).toBe(false);
    });

    it("Doit retourner faux si ticketsRemaining est egale à null", () => {
        const event = new Event(1, "name", 1000, 20, null/* TicketsRemaining */, new Date());
        expect(isSoldOut(event)).toBe(false);
    });

    it("Doit retourner faux si ticketsRemaining n'est pas défini", () => {
        const event = new Event(1, "name", 1000, 20, undefined/* TicketsRemaining */, new Date());
        expect(isSoldOut(event)).toBe(false);
    });
});

/* Test de la fonction getTagLine */
describe("fonction getTagLine", () => {
    let event = null;

    
    it("Doit retourner 'Event Sold Out!' s'il n'y a plus de tickets disponibles", () => {
        event = new Event(1, "name", 1000, 20, 0/* TicketsRemaining */, new Date());

        expect(getTagLine(event, 5, true).toLowerCase().trim()).toMatch("event sold out!");
    });

    it.each([
        [2, 'tickets', '<'],
        [1, 'ticket', '=']
    ])("Doit retourner 'Hurry only %i %s left' si 1 %s ticketsRemaining < minimumTicketCount", (a, b) => {
        const ticketsRemaining = a, minimumTicketCount = 5;

        event = new Event(1, "name", 1000, 20, ticketsRemaining, new Date());

        const result = getTagLine(event, minimumTicketCount, true);

        expect(result.toLowerCase().trim()).toMatch(`hurry only ${a} ${b} left!`);
    });

    it.each([
        ["This Event is getting a lot of interest. Don't miss out, purchase your ticket now!", "si l'évènement est populaire", true],
        ["Don't miss out, purchase your ticket now!", "si l'évènement n'est pas populaire", false]
    ])
    ("Doit retourner '%s' %s", (a, b, c) => {
        const ticketsRemaining = 10, minimumTicketCount = 5;
        const isPopular = c;

        event = new Event(1, "name", 1000, 20, ticketsRemaining, new Date());

        const result = getTagLine(event, minimumTicketCount, isPopular);

        expect(result.toLowerCase().trim()).toMatch(a.toLowerCase().trim());
    });
});

/* Test de la fonction createEvent */
describe("fonction createEvent", () => {
    it("Doit me retourner 'Event name cannot exceed 200 characters' si le nom est une chaîne de plus de 200 caractères", () => {
        const name = 45, price = 1000, availableTickets = 15;

        expect(() => createEvent(name, price, availableTickets)).toThrowError("Event name cannot exceed 200 characters");
    });

    it("Doit me retourner 'Event name cannot exceed 200 characters' si le nom n'est pas une chaîne de caractère", () => {
        const price = 1000, availableTickets = 15;
        let name = "a";
        for(let i = 0; i < 200; i++) name += "a";

        expect(() => createEvent(name, price, availableTickets)).toThrowError("Event name cannot exceed 200 characters");
    });

    it("Doit me retourner 'Event price must be more or equal to 0' si le prix n'est pas un nombre", () => {
        const name = "alex", price = "1000", availableTickets = 15;

        expect(() => createEvent(name, price, availableTickets)).toThrowError("Event price must be more or equal to 0");
    });

    it("Doit me retourner 'Event price must be more or equal to 0' si le prix est inférieur à 0", () => {
        const name = "alex", price = -15, availableTickets = 15;

        expect(() => createEvent(name, price, availableTickets)).toThrowError("Event price must be more or equal to 0");
    });

    it("Doit me retourner 'Event tickets must be more than 0' si le nombre de tickets disponible n'est pas un nombre", () => {
        const name = "alex", price = 1000, availableTickets = "15";

        expect(() => createEvent(name, price, availableTickets)).toThrowError("Event tickets must be more than 0");
    });

    it("Doit me retourner 'Event tickets must be more than 0' si le nombre de tickets disponible est inférieur à 1", () => {
        const name = "alex", price = 1000, availableTickets = 0;

        expect(() => createEvent(name, price, availableTickets)).toThrowError("Event tickets must be more than 0");
    });

    it("Doit me retourner un objet de type Event si tout s'est bien passé", () => {
        const name = "alex", price = 1000, availableTickets = 10;
        const event = new Event(null, name, price, availableTickets);

        const result = createEvent(name, price, availableTickets)
        
        expect(typeof result).toBe("object");
        expect(result).toMatchObject(event);
    });
});