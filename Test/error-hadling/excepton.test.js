import { describe, it, expect } from 'vitest';
import {
  InvalidEventNameError,
  InvalidEventPriceError,
  InvalidReferralCodeError,
  InvalidUsernameError,
  UserHasAccountError
} from './js/error-handling/exceptions';

describe('Classes d\'erreurs personnalisées', () => {
  describe('InvalidEventNameError', () => {
    it('devrait lever une erreur avec le message fourni', () => {
      const messageErreur = 'Le nom de l\'événement doit faire au moins 3 caractères';
      expect(() => {
        throw new InvalidEventNameError(messageErreur);
      }).toThrowError(InvalidEventNameError);
      expect(() => {
        throw new InvalidEventNameError(messageErreur);
      }).toThrowError(messageErreur);
    });
  });

  describe('InvalidEventPriceError', () => {
    it('devrait lever une erreur avec le message fourni', () => {
      const messageErreur = 'Le prix de l\'événement doit être supérieur à 0';
      expect(() => {
        throw new InvalidEventPriceError(messageErreur);
      }).toThrowError(InvalidEventPriceError);
      expect(() => {
        throw new InvalidEventPriceError(messageErreur);
      }).toThrowError(messageErreur);
    });
  });

  describe('InvalidUsernameError', () => {
    it('devrait lever une erreur avec le message fourni', () => {
      const messageErreur = 'Nom d\'utilisateur non valide';
      expect(() => {
        throw new InvalidUsernameError(messageErreur);
      }).toThrowError(InvalidUsernameError);
      expect(() => {
        throw new InvalidUsernameError(messageErreur);
      }).toThrowError(messageErreur);
    });
  });

  describe('InvalidReferralCodeError', () => {
    it('devrait lever une erreur avec le message fourni', () => {
      const messageErreur = 'Code de parrainage non valide';
      expect(() => {
        throw new InvalidReferralCodeError(messageErreur);
      }).toThrowError(InvalidReferralCodeError);
      expect(() => {
        throw new InvalidReferralCodeError(messageErreur);
      }).toThrowError(messageErreur);
    });
  });

  describe('UserHasAccountError', () => {
    it('devrait lever une erreur avec le message fourni', () => {
      const messageErreur = 'L\'utilisateur a déjà un compte';
      expect(() => {
        throw new UserHasAccountError(messageErreur);
      }).toThrowError(UserHasAccountError);
      expect(() => {
        throw new UserHasAccountError(messageErreur);
      }).toThrowError(messageErreur);
    });
  });
});