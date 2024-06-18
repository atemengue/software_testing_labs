import { describe, expect, it } from "vitest";
import { isSoldOut, createEvent, getTagLine } from "../../js/events/event";  

describe("isSoldOut function", () => {
  it("should return true if all tickets are sold (ticketsRemaining === 0)", () => {
    const event = {
      ticketsRemaining: 0,
    };

    const isSoldOutResult = isSoldOut(event); 
    expect(isSoldOutResult).toBe(true);
  });

  it("should return false if tickets are remaining (ticketsRemaining > 0)", () => {
    const event = {
      ticketsRemaining: 15,
    };

    const isSoldOutResult = isSoldOut(event); 
    expect(isSoldOutResult).toBe(false);
  });
});

describe("createEvent", () => {
    it("should return a new event with valid propieties ie peoprieties that macthes the type's constraint", () => {
        const evenement = {
            name : "Healing day",
            price : 200,
            availableTickets : 50
        };
        const nouvelEvenement = createEvent("Healing day", 200, 50);

        expect(typeof evenement.name).toBe("string");
        //expect(evenement.name).toBeLessThan(200);

        expect(typeof evenement.price).toBe("number");
        expect(evenement.price).toBeGreaterThan(20);

        expect(typeof evenement.availableTickets).toBe("number");
        expect(evenement.availableTickets).toBeGreaterThan(0);

        expect(nouvelEvenement.name, nouvelEvenement.price, nouvelEvenement.availableTickets).toBe(evenement.name, evenement.price, evenement.availableTickets);

    });

    it("should return an error message if the caracteristics does not match the type and the lenght constraint", () => {
        const evenement = {
            name : "Healing day",
            price : 200,
            availableTickets : 50
        };
        expect(typeof evenement.name).toBe("string");
        //expect(evenement.name).toBeLessThan(200);

        expect(typeof evenement.price).toBe("number");
        expect(evenement.price).toBeGreaterThan(20);

        expect(typeof evenement.availableTickets).toBe("number");
        expect(evenement.availableTickets).toBeGreaterThan(0);

    });

});

describe("getTagLine function", () => {
  it("should return 'Event Sold Out!' for a sold-out event", () => {
    const event = { ticketsRemaining: 0 };
    const minimumTicketCount = 10;
    const isPopular = false;

    const expectedTagline = "Event Sold Out!";

    expect(getTagLine(event, minimumTicketCount, isPopular)).toBe(expectedTagline);
  });

  it("should return a hurry message for low ticket availability", () => {
    const event = { ticketsRemaining: 5 };
    const minimumTicketCount = 10;
    const isPopular = false;

    const expectedTagline = "Hurry only 5 tickets left!";

    expect(getTagLine(event, minimumTicketCount, isPopular)).toBe(expectedTagline);
  });

  /*it("should return a popular event tagline for a popular event with low availability", () => {
    const event = { ticketsRemaining: 3 };
    const minimumTicketCount = 10;
    const isPopular = true;

    const expectedTagline = "This Event is getting a lot of interest. Don't miss out, purchase your ticket now!";

    expect(getTagLine(event, minimumTicketCount, isPopular)).toBe(expectedTagline);
  });
*/
  it("should return a generic tagline for a non-popular event with low availability", () => {
    const event = { ticketsRemaining: 2 };
    const minimumTicketCount = 10;
    const isPopular = false;

    const expectedTagline = "Hurry only 2 tickets left!";

    expect(getTagLine(event, minimumTicketCount, isPopular)).toBe(expectedTagline);
  });

  it("should return a generic tagline for a non-popular event with enough tickets", () => {
    const event = { ticketsRemaining: 50 };
    const minimumTicketCount = 10;
    const isPopular = false;

    const expectedTagline = "Don't miss out, purchase your ticket now!";

    expect(getTagLine(event, minimumTicketCount, isPopular)).toBe(expectedTagline);
  });

  it("should return a popular event tagline for a popular event with enough tickets", () => {
    const event = { ticketsRemaining: 100 };
    const minimumTicketCount = 10;
    const isPopular = true;

    const expectedTagline = "This Event is getting a lot of interest. Don't miss out, purchase your ticket now!";

    expect(getTagLine(event, minimumTicketCount, isPopular)).toBe(expectedTagline);
  });
});
