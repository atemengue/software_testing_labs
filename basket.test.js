// C:\Users\AWATI\Desktop\Projet inf352\Tests\basket\basket.test.js

import { describe, it, expect } from 'vitest';
import { BasketItem } from '../../js/basket/basketitem';
import { 
  calculateTotal, 
  showAdverts, 
  searchBasket, 
  getBasketItem, 
  createBasketItem, 
  serializeBasketItemsToJson 
} from '../../js/basket/basket';

// Mock de l'objet Event pour les tests
class MockEvent {
  constructor(id, name, ticketPrice) {
    this.id = id;
    this.name = name;
    this.ticketPrice = ticketPrice;
  }
}

describe('Basket', () => {
  describe('calculateTotal', () => {
    it('should return 0 if basketItems is empty', () => {
      const basketItems = [];
      expect(calculateTotal(basketItems)).toBe(0);
    });

    it('should return the price of the first item if basketItems has only one item', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
      ];
      expect(calculateTotal(basketItems)).toBe(100);
    });

    it('should return the total price of all items in basketItems', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
        new BasketItem(new MockEvent(2, 'Play', 30), 3),
      ];
      expect(calculateTotal(basketItems)).toBe(190);
    });

    it('should return the total price minus the discount if discount is provided', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
        new BasketItem(new MockEvent(2, 'Play', 30), 3),
      ];
      expect(calculateTotal(basketItems, 10)).toBe(180);
    });
  });

  describe('showAdverts', () => {
    it('should return false if user is premium', () => {
      const user = { isPremium: true };
      expect(showAdverts(user)).toBe(false);
    });

    it('should return true if user is not premium', () => {
      const user = { isPremium: false };
      expect(showAdverts(user)).toBe(true);
    });
  });

  describe('searchBasket', () => {
    it('should return an empty array if basketItems is empty', () => {
      const basketItems = [];
      expect(searchBasket(basketItems, 'Concert')).toEqual([]);
    });

    it('should return an array containing the matching basketItem if searchQuery matches event name', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
        new BasketItem(new MockEvent(2, 'Play', 30), 3),
      ];
      expect(searchBasket(basketItems, 'Concert')).toEqual([
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
      ]);
    });

    it('should return an array containing all matching basketItems if multiple events match searchQuery', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
        new BasketItem(new MockEvent(2, 'Play', 30), 3),
        new BasketItem(new MockEvent(3, 'Concert Hall', 40), 1),
      ];
      expect(searchBasket(basketItems, 'Concert')).toEqual([
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
        new BasketItem(new MockEvent(3, 'Concert Hall', 40), 1),
      ]);
    });

    it('should return an empty array if no event name matches searchQuery', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
        new BasketItem(new MockEvent(2, 'Play', 30), 3),
      ];
      expect(searchBasket(basketItems, 'Opera')).toEqual([]);
    });
  });

  describe('getBasketItem', () => {
    it('should return null if basketItems is empty', () => {
      const basketItems = [];
      const event = new MockEvent(1, 'Concert', 50);
      expect(getBasketItem(basketItems, event)).toBe(null);
    });

    it('should return the BasketItem if event.id matches', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
        new BasketItem(new MockEvent(2, 'Play', 30), 3),
      ];
      const event = new MockEvent(1, 'Concert', 50);
      expect(getBasketItem(basketItems, event)).toEqual(
        new BasketItem(new MockEvent(1, 'Concert', 50), 2)
      );
    });

    it('should return null if no event.id matches', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
        new BasketItem(new MockEvent(2, 'Play', 30), 3),
      ];
      const event = new MockEvent(3, 'Opera', 60);
      expect(getBasketItem(basketItems, event)).toBe(null);
    });
  });

  describe('createBasketItem', () => {
    it('should return a new BasketItem if event is not already in basketItems', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
      ];
      const event = new MockEvent(2, 'Play', 30);
      expect(createBasketItem(basketItems, event, 3)).toEqual(
        new BasketItem(new MockEvent(2, 'Play', 30), 3)
      );
    });

    it('should return null if event is already in basketItems', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
      ];
      const event = new MockEvent(1, 'Concert', 50);
      expect(createBasketItem(basketItems, event, 3)).toBe(null);
    });
  });

  describe('serializeBasketItemsToJson', () => {
    it('should return an empty array if basketItems is empty', () => {
      const basketItems = [];
      expect(serializeBasketItemsToJson(basketItems)).toEqual([]);
    });

    it('should return an array of JSON objects representing basketItems', () => {
      const basketItems = [
        new BasketItem(new MockEvent(1, 'Concert', 50), 2),
        new BasketItem(new MockEvent(2, 'Play', 30), 3),
      ];
      expect(serializeBasketItemsToJson(basketItems)).toEqual([
        { event: { id: 1, name: 'Concert', ticketPrice: 50 }, ticketCount: 2 },
        { event: { id: 2, name: 'Play', ticketPrice: 30 }, ticketCount: 3 },
      ]);
    });
  });
});