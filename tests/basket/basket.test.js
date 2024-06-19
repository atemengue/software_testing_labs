import { calculateTotal, showAdverts, searchBasket, getBasketItem, createBasketItem, serializeBasketItemsToJson } from '../../js/basket/basket';
import { BasketItem } from '../../js/basket/basketitem';

describe('Basket Module Tests', () => {
    test('calculateTotal should return 0 for empty basket', () => {
        expect(calculateTotal([])).toBe(0);
    });

    test('calculateTotal should return correct total for single item', () => {
        const item = { getPrice: () => 50 };
        expect(calculateTotal([item])).toBe(50);
    });

    test('calculateTotal should return correct total for multiple items', () => {
        const item1 = { getPrice: () => 30 };
        const item2 = { getPrice: () => 20 };
        expect(calculateTotal([item1, item2])).toBe(50);
    });

    test('calculateTotal should apply discount', () => {
        const item1 = { getPrice: () => 30 };
        const item2 = { getPrice: () => 20 };
        expect(calculateTotal([item1, item2], 10)).toBe(40);
    });

    test('showAdverts should return false for premium user', () => {
        expect(showAdverts({ isPremium: true })).toBe(false);
    });

    test('showAdverts should return true for non-premium user', () => {
        expect(showAdverts({ isPremium: false })).toBe(true);
    });

    test('searchBasket should return empty array for empty basket', () => {
        expect(searchBasket([], 'query')).toEqual([]);
    });

    test('searchBasket should return items that match the query', () => {
        const item = { event: { name: 'match' } };
        expect(searchBasket([item], 'match')).toEqual([item]);
    });

    test('searchBasket should return empty array if no items match the query', () => {
        const item = { event: { name: 'no match' } };
        expect(searchBasket([item], 'query')).toEqual([]);
    });

    test('getBasketItem should return correct item if it exists', () => {
        const event = { id: 1 };
        const item = { event: { id: 1 } };
        expect(getBasketItem([item], event)).toEqual(item);
    });

    test('getBasketItem should return null if item does not exist', () => {
        const event = { id: 1 };
        const item = { event: { id: 2 } };
        expect(getBasketItem([item], event)).toBeNull();
    });

    test('createBasketItem should return new BasketItem if item does not exist', () => {
        const event = { id: 1 };
        const basketItems = [];
        const requiredTickets = 2;
        const newBasketItem = createBasketItem(basketItems, event, requiredTickets);
        expect(newBasketItem).toBeInstanceOf(BasketItem);
        expect(newBasketItem.event).toEqual(event);
        expect(newBasketItem.requiredTickets).toBe(requiredTickets);
    });

    test('createBasketItem should return null if item already exists', () => {
        const event = { id: 1 };
        const item = new BasketItem(event, 2);
        const basketItems = [item];
        expect(createBasketItem(basketItems, event, 2)).toBeNull();
    });

    test('serializeBasketItemsToJson should return empty array for empty basket', () => {
        expect(serializeBasketItemsToJson([])).toEqual([]);
    });

    test('serializeBasketItemsToJson should return JSON representation of basket items', () => {
        const item = new BasketItem({ id: 1, name: 'event' }, 2);
        const json = serializeBasketItemsToJson([item]);
        expect(json).toEqual([{ event: { id: 1, name: 'event' }, requiredTickets: 2 }]);
    });
});



// js/basket/basketitem.js

export class BasketItem {
    constructor(event, requiredTickets) {
        this.event = event;
        this.requiredTickets = requiredTickets;
    }

    getPrice() {
        // Example price calculation logic, can be adjusted as needed
        return this.requiredTickets * 20; // Assuming each ticket costs 20 units
    }
}
