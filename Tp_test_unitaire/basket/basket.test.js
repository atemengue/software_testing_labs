import { describe, it, expect } from 'vitest';
import { calculateTotal, showAdverts, searchBasket, getBasketItem, createBasketItem, serializeBasketItemsToJson } from './basket';
import { BasketItem } from './basketitem'; 

// Mock BasketItem
class MockBasketItem {
    constructor(event, price) {
        this.event = event;
        this.price = price;
    }
    getPrice() {
        return this.price;
    }
}

describe(' Testing calculateTotal', () => {
    it('should return the total price of basket items', () => {
        const items = [new MockBasketItem({}, 10), new MockBasketItem({}, 15)];
        expect(calculateTotal(items)).toBe(25);
    });

    it('should apply a discount if provided', () => {
        const items = [new MockBasketItem({}, 10), new MockBasketItem({}, 15)];
        expect(calculateTotal(items, 5)).toBe(20);
    });

    it('should return 0 for an empty basket', () => {
        expect(calculateTotal([])).toBe(0);
    });
});

describe(' Testing showAdverts', () => {
    it('should return false for premium users', () => {
        const user = { isPremium: true };
        expect(showAdverts(user)).toBe(false);
    });

    it('should return true for non-premium users', () => {
        const user = { isPremium: false };
        expect(showAdverts(user)).toBe(true);
    });
});

describe('Testing searchBasket', () => {
    it('should return items matching the search query', () => {
        const items = [
            new MockBasketItem({ name: 'Concert' }, 10),
            new MockBasketItem({ name: 'Sport Event' }, 20),
        ];
        expect(searchBasket(items, 'Concert')).toHaveLength(1);
    });

    it('should return an empty array if no items match the search query', () => {
        const items = [
            new MockBasketItem({ name: 'Concert' }, 10),
            new MockBasketItem({ name: 'Sport Event' }, 20),
        ];
        expect(searchBasket(items, 'Theater')).toHaveLength(0);
    });
});

describe(' Testing getBasketItem', () => {
    it('should return the matching basket item', () => {
        const event = { id: 1 };
        const items = [new MockBasketItem(event, 10)];
        expect(getBasketItem(items, event)).toBe(items[0]);
    });

    it('should return null if no matching item is found', () => {
        const event = { id: 1 };
        const items = [new MockBasketItem({ id: 2 }, 10)];
        expect(getBasketItem(items, event)).toBe(null);
    });
});

describe(' Testing createBasketItem', () => {
    it('should create a new basket item if it does not exist', () => {
        const event = { id: 1 };
        const items = [];
        const newItem = createBasketItem(items, event, 2);
        expect(newItem).toBeInstanceOf(BasketItem);
    });

    it('should return null if the item already exists', () => {
        const event = { id: 1 };
        const items = [new MockBasketItem(event, 10)];
        expect(createBasketItem(items, event, 2)).toBe(null);
    });
});

describe(' Testing serializeBasketItemsToJson', () => {
    it('should serialize basket items to JSON', () => {
        const items = [new MockBasketItem({ id: 1, name: 'Concert' }, 10)];
        const json = serializeBasketItemsToJson(items);
        expect(json).toEqual([{ event: { id: 1, name: 'Concert' }, price: 10 }]);
    });
});
