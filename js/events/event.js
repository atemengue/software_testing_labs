import { InvalidEventNameError, InvalidEventPriceError } from "../error-handling/exceptions";

export class Event {
    constructor(id, name, ticketPrice, totalTickets, ticketsRemaining, date) {
        this.id = id;
        this.name = name;
        this.ticketPrice = ticketPrice;
        this.totalTickets = totalTickets;
        this.ticketsRemaining = ticketsRemaining;
        this.date = date;
    }
}

export function isSoldOut(event) {
    return event.ticketsRemaining == 0;
}

export function getTagLine(event, minimumTicketCount, isPopular) {
    if (isSoldOut(event)) {
        return "Event Sold Out!";
    } else if (event.ticketsRemaining < minimumTicketCount) {
        let ticket = event.ticketsRemaining === 1 ? "ticket" : "tickets";
        return `Hurry only ${event.ticketsRemaining} ${ticket} left!`;
    } else {
        if (isPopular) {
            return `This Event is getting a lot of interest. Don't miss out, purchase your ticket now!`
        }
        return "Don't miss out, purchase your ticket now!";
    }
}

export function createEvent(name, price, availableTickets) {
    if (typeof name !== "string" || name.length === 0 || name.length > 200) {
        throw new InvalidEventNameError("Event name must be a non-empty string and cannot exceed 200 characters");
    }

    if (typeof price !== "number" || price < 0) {
        throw new InvalidEventPriceError("Event price must be a non-negative number");
    }

    if (typeof availableTickets !== "number" || availableTickets <= 0) {
        throw new InvalidEventPriceError("Number of available tickets must be a positive number");
    }

    return new Event(null, name, price, availableTickets, availableTickets, new Date());
}
