import { describe, it, expect } from 'vitest';
import {
    InvalidEventNameError,
    InvalidEventPriceError,
    InvalidReferralCodeError,
    InvalidUsernameError,
    UserHasAccountError
} from '../../js/error-handling/exceptions';

// Début des tests pour InvalidEventNameError
describe('InvalidEventNameError', () => {
    it('devrait être une instance de Error', () => {
        const error = new InvalidEventNameError('Nom d\'événement invalide');
        expect(error).toBeInstanceOf(Error); // Vérifie que c'est une instance de Error
    });

    it('devrait contenir le message d\'erreur correct', () => {
        const errorMessage = 'Nom d\'événement invalide';
        const error = new InvalidEventNameError(errorMessage);
        expect(error.message).toBe(errorMessage); // Vérifie que le message est bien celui passé au constructeur
    });
});

// Début des tests pour InvalidEventPriceError
describe('InvalidEventPriceError', () => {
    it('devrait être une instance de Error', () => {
        const error = new InvalidEventPriceError('Prix d\'événement invalide');
        expect(error).toBeInstanceOf(Error); // Vérifie que c'est une instance de Error
    });

    it('devrait contenir le message d\'erreur correct', () => {
        const errorMessage = 'Prix d\'événement invalide';
        const error = new InvalidEventPriceError(errorMessage);
        expect(error.message).toBe(errorMessage); // Vérifie que le message est bien celui passé au constructeur
    });
});

// Début des tests pour InvalidUsernameError
describe('InvalidUsernameError', () => {
    it('devrait être une instance de Error', () => {
        const error = new InvalidUsernameError('Nom d\'utilisateur invalide');
        expect(error).toBeInstanceOf(Error); // Vérifie que c'est une instance de Error
    });

    it('devrait contenir le message d\'erreur correct', () => {
        const errorMessage = 'Nom d\'utilisateur invalide';
        const error = new InvalidUsernameError(errorMessage);
        expect(error.message).toBe(errorMessage); // Vérifie que le message est bien celui passé au constructeur
    });
});

// Début des tests pour InvalidReferralCodeError
describe('InvalidReferralCodeError', () => {
    it('devrait être une instance de Error', () => {
        const error = new InvalidReferralCodeError('Code de parrainage invalide');
        expect(error).toBeInstanceOf(Error); // Vérifie que c'est une instance de Error
    });

    it('devrait contenir le message d\'erreur correct', () => {
        const errorMessage = 'Code de parrainage invalide';
        const error = new InvalidReferralCodeError(errorMessage);
        expect(error.message).toBe(errorMessage); // Vérifie que le message est bien celui passé au constructeur
    });
});

// Début des tests pour UserHasAccountError
describe('UserHasAccountError', () => {
    it('devrait être une instance de Error', () => {
        const error = new UserHasAccountError('L\'utilisateur a déjà un compte');
        expect(error).toBeInstanceOf(Error); // Vérifie que c'est une instance de Error
    });

    it('devrait contenir le message d\'erreur correct', () => {
        const errorMessage = 'L\'utilisateur a déjà un compte';
        const error = new UserHasAccountError(errorMessage);
        expect(error.message).toBe(errorMessage); // Vérifie que le message est bien celui passé au constructeur
    });
});