import { describe, it, expect } from 'vitest';
import { calculateTotal,showAdverts, searchBasket,getBasketItem, createBasketItem ,serializeBasketItemsToJson } from '../../js/basket/basket'; 
import { BasketItem } from '../../js/basket/basketitem'; 
// Mock event object for testing
const event1 = { id: 1, name: 'Concert', ticketPrice: 50 };
const event2 = { id: 2, name: 'Theater', ticketPrice: 100 };

describe('calculateTotal', () => {
    it('should return 0 for an empty basket', () => {
        const result = calculateTotal([]);
        expect(result).toBe(0);
    }); 

    it('should return the price of the single item in the basket', () => {
        const item = new BasketItem(event1, 2); // 2 tickets at $50 each
        const result = calculateTotal([item]);
        expect(result).toBe(100);
    });

    it('should return the total price of multiple items in the basket', () => {
        const item1 = new BasketItem(event1, 2); // 2 tickets at $50 each
        const item2 = new BasketItem(event2, 1); // 1 ticket at $100 each
        const result = calculateTotal([item1, item2]);
        expect(result).toBe(200);
    });

    it('should return the total price minus the discount', () => {
        const item1 = new BasketItem(event1, 2); // 2 tickets at $50 each
        const item2 = new BasketItem(event2, 1); // 1 ticket at $100 each
        const discount = 50;
        const result = calculateTotal([item1, item2], discount);
        expect(result).toBe(150);
    });

    it('should handle cases with no discount correctly', () => {
        const item1 = new BasketItem(event1, 2); // 2 tickets at $50 each
        const item2 = new BasketItem(event2, 1); // 1 ticket at $100 each
        const result = calculateTotal([item1, item2]);
        expect(result).toBe(200);
    });
});

describe('showAdverts', () => {
    it('should return false for a premium user', () => {
        const user = { isPremium: true };
        const result = showAdverts(user);
        expect(result).toBe(false);
    });

    it('should return true for a non-premium user', () => {
        const user = { isPremium: false };
        const result = showAdverts(user);
        expect(result).toBe(true);
    });
});


describe('searchBasket', () => {
    it('should return an empty array if no items match the search query', () => {
        const basketItems = [
            new BasketItem(event1, 2),
            new BasketItem(event2, 1)
        ];
        const result = searchBasket(basketItems, 'Movie');
        expect(result).toEqual([]);
    });

    it('should return matching items for a given search query', () => {
        const basketItems = [
            new BasketItem(event1, 2), // Event name is 'Concert'
            new BasketItem(event2, 1)  // Event name is 'Theater'
        ];
        const result = searchBasket(basketItems, 'Concert');
        expect(result).toEqual([basketItems[0]]);
    });

    it('should handle search queries with different cases', () => {
        const basketItems = [
            new BasketItem(event1, 2), // Event name is 'Concert'
            new BasketItem(event2, 1)  // Event name is 'Theater'
        ];
        const result = searchBasket(basketItems, 'concert');
        expect(result).toEqual([basketItems[0]]);
    });

    it('should return multiple matching items if applicable', () => {
        const event3 = { name: 'Concert Hall', ticketPrice: 75 };
        const basketItems = [
            new BasketItem(event1, 2), // Event name is 'Concert'
            new BasketItem(event2, 1), // Event name is 'Theater'
            new BasketItem(event3, 3)  // Event name is 'Concert Hall'
        ];
        const result = searchBasket(basketItems, 'Concert');
        expect(result).toEqual([basketItems[0], basketItems[2]]);
    });

    it('should return an empty array if search query is empty', () => {
        const basketItems = [
            new BasketItem(event1, 2),
            new BasketItem(event2, 1)
        ];
        const result = searchBasket(basketItems, '');
        expect(result).toEqual([]);
    });

    it('should return an empty array if search query is undefined', () => {
        const basketItems = [
            new BasketItem(event1, 2),
            new BasketItem(event2, 1)
        ];
        const result = searchBasket(basketItems, undefined);
        expect(result).toEqual([]);
    });

    it('should handle basket items with undefined event name', () => {
        const basketItems = [
            new BasketItem({ name: undefined, ticketPrice: 50 }, 2),
            new BasketItem(event2, 1)
        ];
        const result = searchBasket(basketItems, 'Concert');
        expect(result).toEqual([]);
    });
});

describe('getBasketItem', () => {
    it('should return the basket item for the given event', () => {
        const basketItems = [
            new BasketItem(event1, 2),
            new BasketItem(event2, 1)
        ];
        const result = getBasketItem(basketItems, event1);
        expect(result).toEqual(basketItems[0]);
    });

    it('should return null if the event is not in the basket', () => {
        const basketItems = [
            new BasketItem(event1, 2),
            new BasketItem(event2, 1)
        ];
        const event3 = { id: 3, name: 'Movie', ticketPrice: 20 };
        const result = getBasketItem(basketItems, event3);
        expect(result).toBeNull();
    });
});

describe('createBasketItem', () => {
    it('should create a new basket item if the event is not already in the basket', () => {
        const basketItems = [
            new BasketItem(event1, 2),
            new BasketItem(event2, 1)
        ];
        const event3 = { id: 3, name: 'Movie', ticketPrice: 20 };
        const result = createBasketItem(basketItems, event3, 5);
        expect(result).toEqual(new BasketItem(event3, 5));
    });

    it('should return null if the event is already in the basket', () => {
        const basketItems = [
            new BasketItem(event1, 2),
            new BasketItem(event2, 1)
        ];
        const result = createBasketItem(basketItems, event1, 5);
        expect(result).toBeNull();
    });
});

describe('serializeBasketItemsToJson', () => {
    it('should serialize a single basket item correctly', () => {
        const basketItems = [
            new BasketItem(event1, 2)
        ];
        const result = serializeBasketItemsToJson(basketItems);
        expect(result).toEqual([{ event: event1, ticketCount: 2 }]);
    });

    it('should serialize multiple basket items correctly', () => {
        const basketItems = [
            new BasketItem(event1, 2),
            new BasketItem(event2, 1)
        ];
        const result = serializeBasketItemsToJson(basketItems);
        expect(result).toEqual([
            { event: event1, ticketCount: 2 },
            { event: event2, ticketCount: 1 }
        ]);
    });

    it('should handle an empty basket correctly', () => {
        const basketItems = [];
        const result = serializeBasketItemsToJson(basketItems);
        expect(result).toEqual([]);
    });
});