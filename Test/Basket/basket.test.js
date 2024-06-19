import { describe, it, expect } from 'vitest';
import { calculateTotal, showAdverts, searchBasket, getBasketItem, createBasketItem, serializeBasketItemsToJson } from '../../js/basket/basket';
import { BasketItem } from '../../js/basket/basketitem';

// Mock data
const event1 = { id: 1, name: 'Concert', ticketPrice: 50 };
const event2 = { id: 2, name: 'Theater', ticketPrice: 75 };
const event3 = { id: 3, name: 'Sports', ticketPrice: 100 };

const basketItem1 = new BasketItem(event1, 2); // 2 tickets for Concert, total price = 100
const basketItem2 = new BasketItem(event2, 1); // 1 ticket for Theater, total price = 75
const basketItem3 = new BasketItem(event3, 3); // 3 tickets for Sports, total price = 300

const basketItems = [basketItem1, basketItem2, basketItem3];

describe('Basket Functions', () => {
  describe('calculateTotal', () => {

    it('should calculate total price for multiple items without discount', () => {
      const total = calculateTotal(basketItems);
      expect(total).toBe(475);
    });

    it('should calculate total price for multiple items with discount', () => {
      const total = calculateTotal(basketItems, 50);
      expect(total).toBe(425);
    });

    it('should calculate total price for a single item', () => {
      const total = calculateTotal([basketItem1]);
      expect(total).toBe(100);
    });

    it('should return 0 for an empty basket', () => {
      const total = calculateTotal([]);
      expect(total).toBe(0);
    });
  });

  describe('showAdverts', () => {
    it('should show adverts for non-premium users', () => {
      const user = { isPremium: false };
      const result = showAdverts(user);
      expect(result).toBe(true);
    });

    it('should not show adverts for premium users', () => {
      const user = { isPremium: true };
      const result = showAdverts(user);
      expect(result).toBe(false);
    });
  });

  describe('searchBasket', () => {
    it('should find items in the basket matching the search query', () => {
      const result = searchBasket(basketItems, 'Concert');
      expect(result).toEqual([basketItem1]);
    });

    it('should return an empty array if no items match the search query', () => {
      const result = searchBasket(basketItems, 'NonExistentEvent');
      expect(result).toEqual([]);
    });
  });

  describe('getBasketItem', () => {
    it('should return the basket item matching the event', () => {
      const result = getBasketItem(basketItems, event1);
      expect(result).toEqual(basketItem1);
    });

    it('should return null if no matching basket item is found', () => {
      const nonExistentEvent = { id: 999, name: 'NonExistentEvent', ticketPrice: 0 };
      const result = getBasketItem(basketItems, nonExistentEvent);
      expect(result).toBeNull();
    });
  });

  describe('createBasketItem', () => {
    it('should create a new basket item if it does not exist in the basket', () => {
      const newEvent = { id: 4, name: 'NewEvent', ticketPrice: 20 };
      const result = createBasketItem(basketItems, newEvent, 2);
      expect(result).toBeInstanceOf(BasketItem);
      expect(result.event).toEqual(newEvent);
      expect(result.ticketCount).toBe(2);
    });

    it('should return null if the basket item already exists', () => {
      const result = createBasketItem(basketItems, event1, 2);
      expect(result).toBeNull();
    });
  });

  describe('serializeBasketItemsToJson', () => {
    it('should serialize basket items to JSON format', () => {
      const result = serializeBasketItemsToJson(basketItems);
      const expected = [
        { event: event1, ticketCount: 2 },
        { event: event2, ticketCount: 1 },
        { event: event3, ticketCount: 3 }
      ];
      expect(result).toEqual(expected);
    });
  });
});
