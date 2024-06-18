import {describe , it   , vi, expect , test ,beforeEach } from 'vitest';
// import{BasketItem } from '../../js/basket/basketitem';
import { User } from '../../js/users/users'; 
import{ calculateTotal , showAdverts,searchBasket , getBasketItem , createBasketItem , serializeBasketItemsToJson } from '../../js/basket/basket';
import { BasketItem } from '../../js/basket/basketitem';

//#FONCTION calculateTotal()
describe('calculateTotal', () => {
  it('should calculate the correct total for a single item', () => {
    const mockGetPrice = vi.fn().mockReturnValue(10);
    const mockBasketItem = { getPrice: mockGetPrice };

    const total = calculateTotal([mockBasketItem]);

    expect(mockGetPrice).toHaveBeenCalled();
    expect(total).toBe(10);
  });

  it('should calculate the correct total for multiple items', () => {
    const mockGetPrice1 = vi.fn().mockReturnValue(10);
    const mockGetPrice2 = vi.fn().mockReturnValue(20);
    const mockBasketItem1 = { getPrice: mockGetPrice1 };
    const mockBasketItem2 = { getPrice: mockGetPrice2 };

    const total = calculateTotal([mockBasketItem1, mockBasketItem2]);

    expect(mockGetPrice1).toHaveBeenCalled();
    expect(mockGetPrice2).toHaveBeenCalled();
    expect(total).toBe(30);
  });

  it('should handle an empty basket', () => {
    const total = calculateTotal([]);

    expect(total).toBe(0);
  });

  it('should apply the discount correctly', () => {
    const mockGetPrice1 = vi.fn().mockReturnValue(10);
    const mockGetPrice2 = vi.fn().mockReturnValue(20);
    const mockBasketItem1 = { getPrice: mockGetPrice1 };
    const mockBasketItem2 = { getPrice: mockGetPrice2 };

    const total = calculateTotal([mockBasketItem1, mockBasketItem2], 10);

    expect(mockGetPrice1).toHaveBeenCalled();
    expect(mockGetPrice2).toHaveBeenCalled();
    expect(total).toBe(20);
  });

  it('should handle negative discounts', () => {
    const mockGetPrice1 = vi.fn().mockReturnValue(10);
    const mockGetPrice2 = vi.fn().mockReturnValue(20);
    const mockBasketItem1 = { getPrice: mockGetPrice1 };
    const mockBasketItem2 = { getPrice: mockGetPrice2 };

    const total = calculateTotal([mockBasketItem1, mockBasketItem2], -10);

    expect(mockGetPrice1).toHaveBeenCalled();
    expect(mockGetPrice2).toHaveBeenCalled();
    expect(total).toBe(40);
  });
});

//FONCTION showAdverts()
describe('showAdverts', () => {
  it('should return true for non-premium users', () => {
    const user = new User(1, 'John Doe');
    expect(showAdverts(user)).toBe(true);
  });

  it('should return false for premium users', () => {
    const user = new User(1, 'John Doe');
    user.isPremium = true;
    expect(showAdverts(user)).toBe(false);
  });
});

//FONCTION searchBasket()
//parameParameterized Testing 
describe('searchBasket', () => {
  const basketItems = [
    { event: { name: 'Event 1' } },
    { event: { name: 'Event 2' } },
    { event: { name: 'Event 3' } },
    { event: { name: 'Special Event' } },
  ];

  it.each([
    ['', basketItems],
    ['non-existent', []],
    ['event', basketItems],
    ['special', [{ event: { name: 'Special Event' } }]],
  ])('should return the correct items for the search query "%s"', (searchQuery, expectedResult) => {
    const result = searchBasket(basketItems, searchQuery);
    expect(result).toEqual(expectedResult);
  });
});

//FONCTION getBasketItem()
describe('getBasketItem', () => {
  let basketItems;
  let mockBasketItem;

  beforeEach(() => {
    mockBasketItem = {
      event: { id: 1, ticketPrice: 50 },
      ticketCount: 2
    };

    basketItems = [
      mockBasketItem
    ];
  });

  it('should return null when the basket is empty', () => {
    const result = getBasketItem([], { id: 1, ticketPrice: 50 });
    expect(result).toBeNull();
  });

  it('should return the basket item for the given event', () => {
    const result = getBasketItem(basketItems, { id: 1, ticketPrice: 50 });
    expect(result).not.toBeNull();
    expect(result).toEqual(mockBasketItem);
  });

  it('should return null if the event is not found in the basket', () => {
    const result = getBasketItem(basketItems, { id: 2, ticketPrice: 75 });
    expect(result).toBeNull();
  });


  it('should return null if the event does not have an id property', () => {
    const result = getBasketItem(basketItems, { ticketPrice: 50 });
    expect(result).toBeNull();
  });
});

//  Test cases for the CreateBasketItem function
describe('createBasketItem', () => {
  let basketItems;
  let mockEvent;

  beforeEach(() => {
    mockEvent = { id: 1, ticketPrice: 50 };
    basketItems = [];
  });

  it('should return null when the event is already in the basket', () => {
    const mockBasketItem = createBasketItem(basketItems, mockEvent, 2);
    basketItems.push(mockBasketItem);
    const result = createBasketItem(basketItems, mockEvent, 2);
    expect(result).toBeNull();
  });
});

// Test cases for the serializeBasketItemsToJson function

describe('serializeBasketItemsToJson', () => {
  test('with empty basket', () => {
    const basketItems = [];
    const result = serializeBasketItemsToJson(basketItems);
    expect(result).toEqual([]);
  });

  test('with single item', () => {
    const basketItems = [
      { id: 1, name: 'Product 1', quantity: 2, price: 9.99 },
    ];
    const result = serializeBasketItemsToJson(basketItems);
    expect(result).toEqual([
      { id: 1, name: 'Product 1', quantity: 2, price: 9.99 },
    ]);
  });

  test('with multiple items', () => {
    const basketItems = [
      { id: 1, name: 'Product 1', quantity: 2, price: 9.99 },
      { id: 2, name: 'Product 2', quantity: 1, price: 19.99 },
      { id: 3, name: 'Product 3', quantity: 3, price: 4.99 },
    ];
    const result = serializeBasketItemsToJson(basketItems);
    expect(result).toEqual([
      { id: 1, name: 'Product 1', quantity: 2, price: 9.99 },
      { id: 2, name: 'Product 2', quantity: 1, price: 19.99 },
      { id: 3, name: 'Product 3', quantity: 3, price: 4.99 },
    ]);
  });

  test('does not modify the original basket items', () => {
    const basketItems = [
      { id: 1, name: 'Product 1', quantity: 2, price: 9.99 },
      { id: 2, name: 'Product 2', quantity: 1, price: 19.99 },
    ];
    const originalBasketItems = [...basketItems];
    const result = serializeBasketItemsToJson(basketItems);
    expect(basketItems).toEqual(originalBasketItems);
  });
});

describe("class BasketItem", () => {
  it("doit creer une instance de BasketItem", () => {
    const basketItem = new BasketItem({ticketPrice: 2549}, 13);
    expect(basketItem).toBeInstanceOf(BasketItem);
    expect(basketItem).toHaveProperty("event");
    expect(basketItem).toHaveProperty("ticketCount");
    expect(basketItem.event).toHaveProperty("ticketPrice");
    expect(basketItem.event.ticketPrice).toBe(2549);
    expect(basketItem.ticketCount).toBe(13);
  })
  it("doit prix total des tickets", () => {
    const basketItems = new BasketItem({ticketPrice: 1999}, 10);
    expect(basketItems.getPrice()).toBe(basketItems.event.ticketPrice*basketItems.ticketCount);
  })
})