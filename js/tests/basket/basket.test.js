import { describe, it, expect } from 'vitest';
import { BasketItem } from '../../basket/basketitem.js';
import { 
    calculateTotal, 
    showAdverts, 
    searchBasket, 
    getBasketItem, 
    createBasketItem, 
    serializeBasketItemsToJson 
} from '../../basket/basket.js';

// Mock data for testing
const mockBasketItems = [
    new BasketItem({ id: 1, name: 'Event 1', ticketPrice: 10 }, 2),
    new BasketItem({ id: 2, name: 'Event 2', ticketPrice: 15 }, 1),
];

// Tests for calculateTotal function
describe('calculateTotal', () => {
    it('calculates total without discount', () => {
        const total = calculateTotal(mockBasketItems);
        expect(total).toBe(35);
    });

    it('calculates total with discount', () => {
        const total = calculateTotal(mockBasketItems, 5);
        expect(total).toBe(30);
    });

    it('returns 0 for empty basket', () => {
        const total = calculateTotal([]);
        expect(total).toBe(0);
    });
});

// Tests for showAdverts function
describe('showAdverts', () => {
    it('returns false for premium user', () => {
        const user = { isPremium: true };
        expect(showAdverts(user)).toBe(false);
    });

    it('returns true for non-premium user', () => {
        const user = { isPremium: false };
        expect(showAdverts(user)).toBe(true);
    });
});

// Tests for searchBasket function
describe('searchBasket', () => {
    it('finds items by name', () => {
        const results = searchBasket(mockBasketItems, 'event 1');
        expect(results.length).toBe(1);
        expect(results[0].event.name).toBe('Event 1');
    });

    it('returns empty array for non-matching query', () => {
        const results = searchBasket(mockBasketItems, 'nonexistent');
        expect(results.length).toBe(0);
    });
});

// Tests for getBasketItem function
describe('getBasketItem', () => {
    it('retrieves basket item by event id', () => {
        const event = { id: 1 };
        const basketItem = getBasketItem(mockBasketItems, event);
        expect(basketItem.event.id).toBe(1);
    });

    it('returns null for non-existent event id', () => {
        const event = { id: 3 };
        const basketItem = getBasketItem(mockBasketItems, event);
        expect(basketItem).toBe(null);
    });
});

// Tests for createBasketItem function
describe('createBasketItem', () => {
    it('creates new BasketItem if not already present', () => {
        const event = { id: 3, name: 'Event 3', ticketPrice: 20 };
        const newBasketItem = createBasketItem(mockBasketItems, event, 2);
        expect(newBasketItem instanceof BasketItem).toBe(true);
        expect(newBasketItem.event.id).toBe(3);
    });

    it('returns null if BasketItem already exists for event', () => {
        const event = { id: 1 };
        const existingBasketItem = createBasketItem(mockBasketItems, event, 1);
        expect(existingBasketItem).toBe(null);
    });
});

// Tests for serializeBasketItemsToJson function
describe('serializeBasketItemsToJson', () => {
    it('serializes basket items to JSON', () => {
        const serializedItems = serializeBasketItemsToJson(mockBasketItems);
        expect(serializedItems.length).toBe(2);
        expect(serializedItems[0].event.name).toBe('Event 1');
        expect(serializedItems[1].event.name).toBe('Event 2');
    });
});
