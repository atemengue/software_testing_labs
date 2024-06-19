import { describe, it, expect } from 'vitest';
import getEvents from '../../js/events/search'; 

describe('getEvents', () => {
    it('devrait retourner les événements qui satisfont le prédicat', () => {
        const now = new Date();
        const events = [
            { id: 1, name: 'Concert', date: now },
            { id: 2, name: 'Théâtre', date: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
            { id: 3, name: 'Conférence', date: new Date(now.getTime() + 48 * 60 * 60 * 1000) },
        ];

        const searchPredicate = event => event.name.includes('Concert');
        const result = getEvents(events, searchPredicate);

        expect(result).toEqual([{ id: 1, name: 'Concert', date: now }]);
    });

    it('devrait retourner un tableau vide si aucun événement ne satisfait le prédicat', () => {
        const now = new Date();
        const events = [
            { id: 1, name: 'Concert', date: now },
            { id: 2, name: 'Théâtre', date: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
            { id: 3, name: 'Conférence', date: new Date(now.getTime() + 48 * 60 * 60 * 1000) },
        ];

        const searchPredicate = event => event.name.includes('Opéra');
        const result = getEvents(events, searchPredicate);

        expect(result).toEqual([]);
    });

    it('devrait retourner tous les événements si le prédicat retourne toujours true', () => {
        const now = new Date();
        const events = [
            { id: 1, name: 'Concert', date: now },
            { id: 2, name: 'Théâtre', date: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
            { id: 3, name: 'Conférence', date: new Date(now.getTime() + 48 * 60 * 60 * 1000) },
        ];

        const searchPredicate = () => true;
        const result = getEvents(events, searchPredicate);

        expect(result).toEqual(events);
    });

    it('devrait retourner un tableau vide si le tableau des événements est vide', () => {
        const events = [];

        const searchPredicate = event => event.name.includes('Concert');
        const result = getEvents(events, searchPredicate);

        expect(result).toEqual([]);
    });
});