import { vi, describe, it, expect } from 'vitest';
import { Event } from '../../js/events/event';
import { next30Days, next7Days, today } from '../../js/events/filters';

/* Test de la fonction today */
describe('fonction today', () => {

    it("Doit retourner vrai si la date de l'évènement correspond à la date d'aujourd'hui", () => {
        const evt = new Event(null, "john", 1000, 10, 8, new Date());

        const tdy = today(evt);

        expect(tdy).toBe(true);
    })

    it("Doit retourner faux si la date de l'évènement ne correspond à la date d'aujourd'hui", () => {
        const evt = new Event(null, "john", 1000, 10, 8, new Date(2024, 1, 1));

        const tdy = today(evt);

        expect(tdy).toBe(false);
    })
})

/* Test de la fonction next7Days */
describe("fonction next7Days", () => {
    it("Doit retourner vrai si l'évènement se tiendra dans 1 à 7 prochains jours", () => {
        let next3days = new Date();
        next3days.setDate(next3days.getDate() + 3);

        const evt = new Event(null, "john", 1000, 10, 8, next3days);


        expect(next7Days(evt)).toBe(true);
    });

    it("Doit retourner faux si l'évènement est déjà passé", () => {
        let OneDayBefore = new Date();
        OneDayBefore.setDate(OneDayBefore.getDate() - 1);

        const evt = new Event(null, "john", 1000, 10, 8, OneDayBefore);

        expect(next7Days(evt)).toBe(false);
    });

    it("Doit retourner faux si l'évènement se tiendra après les 7 prochains jours", () => {
        let next8days = new Date();
        next8days.setDate(next8days.getDate() + 8);

        const evt = new Event(null, "john", 1000, 10, 8, next8days);

        expect(next7Days(evt)).toBe(false);
    });
});

/* Test de la fonction next30Days */
describe("fonction next30Days", () => {
    it("Doit retourner vrai si l'évènement se tiendra dans 1 à 30 prochains jours", () => {
        let next15days = new Date();
        next15days.setDate(next15days.getDate() + 15);

        const evt = new Event(null, "john", 1000, 10, 8, next15days);

        expect(next30Days(evt)).toBe(true);
    });

    it("Doit retourner faux si l'évènement est déjà passé", () => {
        let OneDayBefore = new Date();
        OneDayBefore.setDate(OneDayBefore.getDate() - 1);

        const evt = new Event(null, "john", 1000, 10, 8, OneDayBefore);

        expect(next30Days(evt)).toBe(false);
    });

    it("Doit retourner faux si l'évènement se tiendra après les 30 prochains jours", () => {
        let next31days = new Date();
        next31days.setDate(next31days.getDate() + 31);

        const evt = new Event(null, "john", 1000, 10, 8, next31days);

        expect(next7Days(evt)).toBe(false);
    });
});
