import { describe, it, expect } from 'vitest';
import { BasketItem } from '../../../js/basket/basketitem';
import { 
  calculateTotal,
  showAdverts,
  searchBasket,
  getBasketItem,
  createBasketItem,
  serializeBasketItemsToJson 
} from '../../../js/basket/basket';

describe('Basket Functions', () => {
  describe('calculateTotal', () => {
    it('should return 0 for an empty basket', () => {
      const basketItems = [];
      expect(calculateTotal(basketItems)).toBe(0);
    });

    it('should return the correct total for one item', () => {
      const event = { ticketPrice: 50 };
      const basketItem = new BasketItem(event, 2);
      const basketItems = [basketItem];
      expect(calculateTotal(basketItems)).toBe(100);
    });

    it('should return the correct total for multiple items', () => {
      const event1 = { ticketPrice: 50 };
      const event2 = { ticketPrice: 30 };
      const basketItem1 = new BasketItem(event1, 2);
      const basketItem2 = new BasketItem(event2, 3);
      const basketItems = [basketItem1, basketItem2];
      expect(calculateTotal(basketItems)).toBe(190);
    });

    it('should apply discount correctly', () => {
      const event = { ticketPrice: 50 };
      const basketItem = new BasketItem(event, 2);
      const basketItems = [basketItem];
      expect(calculateTotal(basketItems, 20)).toBe(80);
    });
  });

  describe('showAdverts', () => {
    it('should return false for premium users', () => {
      const user = { isPremium: true };
      expect(showAdverts(user)).toBe(false);
    });

    it('should return true for non-premium users', () => {
      const user = { isPremium: false };
      expect(showAdverts(user)).toBe(true);
    });
  });

  describe('searchBasket', () => {
    it('should return matching items based on search query', () => {
      const event1 = { name: 'Spectacle' };
      const event2 = { name: 'Start' };
      const basketItem1 = new BasketItem(event1, 1);
      const basketItem2 = new BasketItem(event2, 2);
      const basketItems = [basketItem1, basketItem2];
      const result = searchBasket(basketItems, 'Spectacle');
      expect(result).toEqual([basketItem1]);
    });

    it('should return an empty array if no items match', () => {
      const event = { name: 'Spectacle' };
      const basketItem = new BasketItem(event, 1);
      const basketItems = [basketItem];
      const result = searchBasket(basketItems, 'Sprint');
      expect(result).toEqual([]);
    });
  });

  describe('getBasketItem', () => {
    it('should return the matching basket item based on event', () => {
      const event = { id: 1, name: 'Spectacle' };
      const basketItem = new BasketItem(event, 1);
      const basketItems = [basketItem];
      expect(getBasketItem(basketItems, event)).toBe(basketItem);
    });

    it('should return null if no matching event is found', () => {
      const event = { id: 1, name: 'Spectacle' };
      const basketItems = [];
      expect(getBasketItem(basketItems, event)).toBe(null);
    });
  });

  describe('createBasketItem', () => {
    it('should create a new basket item if it does not already exist', () => {
      const event = { id: 1, name: 'Spectacle', ticketPrice: 50 };
      const basketItems = [];
      const newItem = createBasketItem(basketItems, event, 2);
      expect(newItem).toBeInstanceOf(BasketItem);
      expect(newItem.event).toBe(event);
      expect(newItem.ticketCount).toBe(2);
    });

    it('should return null if the basket item already exists', () => {
      const event = { id: 1, name: 'Spectacle', ticketPrice: 50 };
      const basketItem = new BasketItem(event, 2);
      const basketItems = [basketItem];
      expect(createBasketItem(basketItems, event, 2)).toBe(null);
    });
  });

  describe('serializeBasketItemsToJson', () => {
    it('should serialize basket items to JSON', () => {
      const event = { id: 1, name: 'Spectacle', ticketPrice: 50 };
      const basketItem = new BasketItem(event, 2);
      const basketItems = [basketItem];
      const json = serializeBasketItemsToJson(basketItems);
      expect(json).toEqual([{ event: event, ticketCount: 2 }]);
    });
  });
});
