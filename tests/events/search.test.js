import { describe, it, expect } from "vitest";
import getEvents from "../../js/events/search";

describe("getEvents", () => {
  const events = [
    { name: "Concert", date: new Date() },
    { name: "Festival", date: new Date(Date.now() + 86400000) },
    { name: "Conference", date: new Date(Date.now() + 7 * 86400000) },
  ];

  it("should filter events based on the search predicate", () => {
    const searchPredicate = (event) => event.name.includes("Concert");
    const filteredEvents = getEvents(events, searchPredicate);
    expect(filteredEvents.length).toBe(1);
    expect(filteredEvents[0].name).toBe("Concert");
  });

  it("should return all events if predicate always returns true", () => {
    const searchPredicate = () => true;
    const filteredEvents = getEvents(events, searchPredicate);
    expect(filteredEvents.length).toBe(events.length);
  });

  it("should return no events if predicate always returns false", () => {
    const searchPredicate = () => false;
    const filteredEvents = getEvents(events, searchPredicate);
    expect(filteredEvents.length).toBe(0);
  });
});
