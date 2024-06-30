import { describe, it, expect } from 'vitest';
import { calculateTotal, showAdverts, searchBasket, getBasketItem, createBasketItem, serializeBasketItemsToJson } from '../software_testing_labs/js/basket/basket';
import { BasketItem } from '../software_testing_labs/js/basket/basketitem';

describe('calculateTotal', () => {
    it('should return 0 for empty basket', () => {
        expect(calculateTotal([])).toBe(0);
    });

    it('should return the price of a single item', () => {
        const item = new BasketItem({id: 1, name: "Event1", ticketPrice: 100}, 1);
        expect(calculateTotal([item])).toBe(100);
    });

    it('should return the total price of multiple items', () => {
        const item1 = new BasketItem({id: 1, name: "Event1", ticketPrice: 100}, 1);
        const item2 = new BasketItem({id: 2, name: "Event2", ticketPrice: 200}, 1);
        expect(calculateTotal([item1, item2])).toBe(300);
    });

    it('should apply discount correctly', () => {
        const item1 = new BasketItem({id: 1, name: "Event1", ticketPrice: 100}, 1);
        const item2 = new BasketItem({id: 2, name: "Event2", ticketPrice: 200}, 1);
        expect(calculateTotal([item1, item2], 50)).toBe(250);
    });
});

describe('showAdverts', () => {
    it('should return false for premium users', () => {
        expect(showAdverts({isPremium: true})).toBe(false);
    });

    it('should return true for non-premium users', () => {
        expect(showAdverts({isPremium: false})).toBe(true);
    });
});

describe('searchBasket', () => {
    it('should find items by search query', () => {
        const item1 = new BasketItem({id: 1, name: "Event1"}, 1);
        const item2 = new BasketItem({id: 2, name: "Event2"}, 1);
        const basketItems = [item1, item2];
        expect(searchBasket(basketItems, 'Event1')).toEqual([item1]);
        expect(searchBasket(basketItems, 'event2')).toEqual([item2]);
    });
});

describe('getBasketItem', () => {
    it('should find the correct basket item by event', () => {
        const event = {id: 1, name: "Event1"};
        const item = new BasketItem(event, 1);
        expect(getBasketItem([item], event)).toEqual(item);
    });

    it('should return null if the item is not found', () => {
        const event = {id: 1, name: "Event1"};
        expect(getBasketItem([], event)).toBe(null);
    });
});

// describe('createBasketItem', () => {
//     it('should create a new basket item if it does not exist', () => {
//         const event = { id: 1, name: "Event1" };
//         const item = createBasketItem([], event, 1);
//         expect(item).toBeInstanceOf(BasketItem);
//         expect(item.event).toEqual(event);
//         expect(item.requiredTickets).toBe(1);
//     });

//     it('should return null if the basket item already exists', () => {
//         const event = { id: 1, name: "Event1" };
//         const existingItem = new BasketItem(event, 1);
//         const basketItems = [existingItem];
//         const item = createBasketItem(basketItems, event, 1);
//         expect(item).toBeNull();
//     });
// });

// describe('serializeBasketItemsToJson', () => {
//     it('should serialize basket items to JSON', () => {
//         const event = { id: 1, name: "Event1" };
//         const item = new BasketItem(event, 1);
//         const result = serializeBasketItemsToJson([item]);
//         expect(result).toEqual([{
//             event: item.event,
//             requiredTickets: item.requiredTickets // Assurez-vous que cette propriété existe
//         }]);
//     });
// });