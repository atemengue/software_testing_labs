import { calculateTotal, showAdverts, searchBasket, getBasketItem, serializeBasketItemsToJson, createBasketItem } from '../../js/basket/basket.js';
import { vi, it, test, expect, describe } from 'vitest'; // Import Vitest's mocking library
import { BasketItem } from '../../js/basket/basketitem.js';
//1.CalculateTotal

describe('CalculateTotal:', () => {
  test('calculateTotal: empty basket', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('calculateTotal: single item', () => {
    const basketItem = { getPrice: vi.fn(() => 10000) }; // Create mock with vi.fn
    expect(calculateTotal([basketItem])).toBe(10000);
  });

  test('calculateTotal: multiple items', () => {
    const item1 = { getPrice: vi.fn(() => 500) };
    const item2 = { getPrice: vi.fn(() => 9000) };
    expect(calculateTotal([item1, item2])).toBe(9500);
  });

  test('calculateTotal: discount applied', () => {
    const basketItem = { getPrice: vi.fn(() => 25000) };
    expect(calculateTotal([basketItem], 5000)).toBe(20000);
  });
});
// 2.Showadvert
describe('ShowAdvert:', () => {
  test('should return False if the user isPremium', () => {
    const user = { isPremium: true }; // Create a simple object with the property
    expect(showAdverts(user)).toBeFalsy();
  });

  test('schould return True if the user is notPremium', () => {
    const user = { isPremium: false }; // Create a simple object with the property
    expect(showAdverts(user)).toBeTruthy();
  });
});
// 3.SearchBasket
describe('searchBasket', () => {
  test('should return an empty array for an empty basket', () => {
    const basketItems = [];
    const searchQuery = 'concert';
    expect(searchBasket(basketItems, searchQuery)).toEqual([]);
  });

  test('should return an empty array for a query not found in the basket', () => {
    const basketItems = [{ event: { name: 'Jazz Festival' } }, { event: { name: 'Rock Concert' } }];
    const searchQuery = 'classical';
    expect(searchBasket(basketItems, searchQuery)).toEqual([]);
  });

  test('should return a single matching item', () => {
    const basketItems = [{ event: { name: 'Jazz Festival' } }, { event: { name: 'Rock Concert' } }];
    const searchQuery = 'jazz';
    expect(searchBasket(basketItems, searchQuery)).toEqual([{ event: { name: 'Jazz Festival' } }]);
  });

  test('should be case-insensitive', () => {
    const basketItems = [{ event: { name: 'Jazz Festival' } }];
    const searchQuery = 'JAZZ';
    expect(searchBasket(basketItems, searchQuery)).toEqual([{ event: { name: 'Jazz Festival' } }]);
  });
});
//4.getBasketitem
describe('getBasketItem', () => {
  it('should return null for an empty basket', () => {
    const basketItems = [];
    const event = { id: 123 };
    expect(getBasketItem(basketItems, event)).toBe(null);
  });

  it('should return null if the event is not found in the basket', () => {
    const basketItems = [{ event: { id: 1 } }, { event: { id: 2 } }];
    const event = { id: 3 };
    expect(getBasketItem(basketItems, event)).toBe(null);
  });

  it('should return the matching basket item', () => {
    const basketItems = [{ event: { id: 1 } }, { event: { id: 2 } }, { event: { id: 3 } }];
    const event = { id: 2 };
    expect(getBasketItem(basketItems, event)).toEqual({ event: { id: 2 } });
  });
});

class MockBasketItem {
  constructor(event, requiredTickets) {
    this.event = event;
    this.requiredTickets = requiredTickets;
  }
}

// 5.createBasketItem

describe('createBasketItem', () => {
  test('createBasketItem: new item to empty basket', () => {
    const basketItems = [];
    const event = { id: 123, name: 'Rock Concert' };
    const ticketCount = 2;

    const newItem = createBasketItem(basketItems, event, ticketCount);

    expect(newItem).toBeInstanceOf(BasketItem); // Ensure it's a MockBasketItem instance
    expect(newItem.event).toEqual(event);
    expect(newItem.ticketCount).toBe(ticketCount);
  });

  test('createBasketItem: existing event in basket', () => {
    const basketItems = [new MockBasketItem({ id: 123 }, 1)]; // Use MockBasketItem
    const event = { id: 123, name: 'Rock Concert' }; // Same event ID
    const requiredTickets = 3; // Different number of tickets

    const newItem = createBasketItem(basketItems, event, requiredTickets);

    expect(newItem).toBeNull();
  });

  test('createBasketItem: empty basket items', () => {
    expect(() => createBasketItem(null, {}, 1)).toThrow(); // Or handle errors as needed
  });
});
//6.serializeBasketItemsToJson
describe('serializeBasketItemsToJson', () => {
  it('should return an empty array for an empty basket', () => {
    const basketItems = [];
    const serializedItems = serializeBasketItemsToJson(basketItems);
    expect(serializedItems).toEqual([]);
  });

  it('should serialize a single basket item', () => {
    const basketItem = { event: { id: 123 }, requiredTickets: 2 };
    const serializedItems = serializeBasketItemsToJson([basketItem]);
    expect(serializedItems).toEqual([basketItem]);
  });

  it('should serialize multiple basket items', () => {
    const basketItems = [
      { event: { id: 123 }, requiredTickets: 2 },
      { event: { id: 456 }, requiredTickets: 1 },
    ];
    const serializedItems = serializeBasketItemsToJson(basketItems);
    expect(serializedItems).toEqual(basketItems);
  });
});
