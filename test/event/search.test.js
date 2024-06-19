import { describe, it, expect } from "vitest";
import getEvents from "../../js/events/search";
import { Event } from "../../js/events/event";

describe("Testing getEvents function", () => {
    const events = [
        new Event(1, 'Concert', 50, 100, 50, new Date('2024-03-15')),
        new Event(2, 'Festival', 100, 200, 100, new Date('2024-03-22')),
        new Event(3, 'Party', 20, 50, 25, new Date('2024-03-29')),
    ];

    it('Should return events that match the search predicate', () => {
        const predicate = event => event.name.includes('Concert');
        const result = getEvents(events, predicate);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Concert');
    });

    it('Should return an empty array if no events match the search predicate', () => {
        const predicate = event => event.name.includes('Match');
        const result = getEvents(events, predicate);
        expect(result).toHaveLength(0);
    });

});