import { describe, expect, it } from "vitest";
import { getEvents } from "../../js/events/search"; // Assuming getEvents resides in filters.js

const events = [
    { title: "Event 1", date: new Date(2024, 5, 15) },
    { title: "Event 1", date: new Date(2024, 5, 20) },
    { title: "Event 3", date: new Date(2024, 6, 1) },
    { title: "Event 4", date: new Date(2024, 6, 5) },
];

describe("getEvents", () => {
    it("doit retourner la list des objet ayant la propriete passe en parametre", () => {
        const searchPredicate = (event) => event.title === "Event 1";
        const result = getEvents(events, searchPredicate);
        expect(result).toBeTypeOf("object");
        result.forEach(element => {
            expect(element).toHaveProperty("title");
            expect(element).toHaveProperty("date");
            expect(element.date).toBeInstanceOf(Date);
            expect(element.title).toBeTypeOf("string")
        });
    });

    // it("should filter events based on the searchPredicate", () => {
    //     const searchPredicate = (event) => event.title === "Event 2";
    //     const filteredEvents = getEvents(mockEvents, searchPredicate);
    //     expect(filteredEvents).toEqual([mockEvents[1]]); // Only Event 2 should be returned
    // });

    // it("should return an empty array if no events match the searchPredicate", () => {
    //     const searchPredicate = (event) => event.title === "Non-existent Event";
    //     const filteredEvents = getEvents(mockEvents, searchPredicate);
    //     expect(filteredEvents).toEqual([]); // No events match the predicate
    // });
});
