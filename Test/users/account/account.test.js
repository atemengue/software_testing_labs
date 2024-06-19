import {test,expect,describe,vi} from 'vitest'
import { Purchase,isValidUserName,createAccount,getPastPurchases } from './js/users/account/account'


describe('Purchase', () => {
    test('doit me creer un ticket avec des proprietes correctes', () => {
      const tickets = 1;
      const eventName = 'gallerie';
      const cost = 200;
      const purchase = new Purchase(eventName, tickets, cost);
  
      expect(purchase.tickets).toEqual(tickets);
      expect(purchase.eventName).toEqual(eventName);
      expect(purchase.cost).toBe(200);
    });
  });

  describe('isValidUserName', () => {
      test('doit me retourner True si username est une chaine de caractere', async () => {
        const existingUsername = 'john@example.com';
        const result = await isValidUserName(existingUsername);
        expect(result).toBe(true);
      });
      test('doit me retourner False si username est vide', async () => {
        const existingUsername = '';
        const result = await isValidUserName(existingUsername);
       
        expect(result).toBe(false);
      });
      test('doit me retourner False pour un usurname null', async () => {
        const existingUsername = null;
        const result = await isValidUserName(existingUsername);
       
        expect(result).toBe(false);
      });
      test('doit me retourner False si username est undefined', async () => {
        const existingUsername = undefined;
        const result = await isValidUserName(existingUsername);
       
        expect(result).toBe(false);
      });
  });
  

  

