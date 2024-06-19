import { describe, it, expect, vi } from 'vitest';
import { today, next7Days, next30Days } from '../../js/events/filters';

describe('today', () => {
    it('devrait retourner true si l\'événement est aujourd\'hui', () => {
        const event = { date: new Date() };
        expect(today(event)).toBe(true);
    });

    it('devrait retourner false si l\'événement n\'est pas aujourd\'hui', () => {
        const event = { date: new Date(Date.now() + 24 * 60 * 60 * 1000) }; // Demain
        expect(today(event)).toBe(false);
    });
});

describe('next7Days', () => {
    it('devrait retourner true si l\'événement est dans les 7 prochains jours', () => {
        const event = { date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) }; // Dans 3 jours
        expect(next7Days(event)).toBe(true);
    });

    it('devrait retourner false si l\'événement est aujourd\'hui', () => {
        const event = { date: new Date() };
        expect(next7Days(event)).toBe(false);
    });

    it('devrait retourner false si l\'événement est après les 7 prochains jours', () => {
        const event = { date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) }; // Dans 8 jours
        expect(next7Days(event)).toBe(false);
    });

    it('devrait retourner false si l\'événement est dans le passé', () => {
        const event = { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }; // Hier
        expect(next7Days(event)).toBe(false);
    });
});

describe('next30Days', () => {
    it('devrait retourner true si l\'événement est dans les 30 prochains jours', () => {
        const event = { date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000) }; // Dans 20 jours
        expect(next30Days(event)).toBe(true);
    });

    it('devrait retourner false si l\'événement est aujourd\'hui', () => {
        const event = { date: new Date() };
        expect(next30Days(event)).toBe(false);
    });

    it('devrait retourner false si l\'événement est après les 30 prochains jours', () => {
        const event = { date: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000) }; // Dans 31 jours
        expect(next30Days(event)).toBe(false);
    });

    it('devrait retourner false si l\'événement est dans le passé', () => {
        const event = { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }; // Hier
        expect(next30Days(event)).toBe(false);
    });
});