import { describe, it, expect } from "vitest";
import {
  Event,
  isSoldOut,
  getTagLine,
  createEvent,
} from "../../js/events/event";
import {
  InvalidEventNameError,
  InvalidEventPriceError,
} from "../../js/error-handling/exceptions";

describe("Event Class", () => {
  it("should create an Event instance with correct properties", () => {
    const event = new Event(1, "Concert", 50, 100, 50, new Date());
    expect(event.id).toBe(1);
    expect(event.name).toBe("Concert");
    expect(event.ticketPrice).toBe(50);
    expect(event.totalTickets).toBe(100);
    expect(event.ticketsRemaining).toBe(50);
    expect(event.date).toBeInstanceOf(Date);
  });
});

describe("isSoldOut", () => {
  it("should return true if ticketsRemaining is 0", () => {
    const event = new Event(1, "Concert", 50, 100, 0, new Date());
    expect(isSoldOut(event)).toBe(true);
  });

  it("should return false if ticketsRemaining is not 0", () => {
    const event = new Event(1, "Concert", 50, 100, 50, new Date());
    expect(isSoldOut(event)).toBe(false);
  });
});

describe("getTagLine", () => {
  it('should return "Event Sold Out!" if event is sold out', () => {
    const event = new Event(1, "Concert", 50, 100, 0, new Date());
    expect(getTagLine(event, 10, true)).toBe("Event Sold Out!");
  });

  it("should return correct message if tickets remaining are less than minimumTicketCount", () => {
    const event = new Event(1, "Concert", 50, 100, 5, new Date());
    expect(getTagLine(event, 10, false)).toBe("Hurry only 5 tickets left!");
  });

  it("should return popular event message if event is popular", () => {
    const event = new Event(1, "Concert", 50, 100, 50, new Date());
    expect(getTagLine(event, 10, true)).toBe(
      "This Event is getting a lot of interest. Don't miss out, purchase your ticket now!"
    );
  });

  it("should return general message if event is not popular", () => {
    const event = new Event(1, "Concert", 50, 100, 50, new Date());
    expect(getTagLine(event, 10, false)).toBe(
      "Don't miss out, purchase your ticket now!"
    );
  });
});

describe("createEvent", () => {
  it("should throw InvalidEventNameError if name is not a string or exceeds 200 characters", () => {
    expect(() => createEvent(123, 50, 100)).toThrow(InvalidEventNameError);
    expect(() => createEvent("a".repeat(201), 50, 100)).toThrow(
      InvalidEventNameError
    );
  });

  it("should throw InvalidEventPriceError if price is not a number or is negative", () => {
    expect(() => createEvent("Concert", "price", 100)).toThrow(
      InvalidEventPriceError
    );
    expect(() => createEvent("Concert", -50, 100)).toThrow(
      InvalidEventPriceError
    );
  });

  it("should throw InvalidEventPriceError if availableTickets is not a number or less than 1", () => {
    expect(() => createEvent("Concert", 50, "tickets")).toThrow(
      InvalidEventPriceError
    );
    expect(() => createEvent("Concert", 50, 0)).toThrow(InvalidEventPriceError);
  });

  it("should create an Event instance if all parameters are valid", () => {
    const event = createEvent("Concert", 50, 100);
    expect(event).toBeInstanceOf(Event);
    expect(event.name).toBe("Concert");
    expect(event.ticketPrice).toBe(50);
    expect(event.totalTickets).toBe(100);
  });
});
