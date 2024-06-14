import {
    calculateTotal,
    createBasketItem,
    getBasketItem,
    searchBasket,
    serializeBasketItemsToJson,
    showAdverts
} from "./basket";

import {MockBasketItem} from "./mock.basket.item"


describe('Basket Functions', () => {
    const event1 = { id: 1, name: "Concert", price: 100 };
    const event2 = { id: 2, name: "Theater", price: 150 };

    describe('calculateTotal', () => {
        test('returns 0 when no items are in the basket', () => {
            expect(calculateTotal([])).toBe(0);
        });

        test('calculates total for one item', () => {
            const items = [new MockBasketItem(event1, 2)];
            expect(calculateTotal(items)).toBe(200);
        });

        test('calculates total for multiple items', () => {
            const items = [new MockBasketItem(event1, 2), new MockBasketItem(event2, 1)];
            expect(calculateTotal(items)).toBe(350);
        });

        test('applies discount to total', () => {
            const items = [new MockBasketItem(event1, 2)];
            expect(calculateTotal(items, 50)).toBe(150);
        });

        test('returns total without discount when no discount is provided', () => {
            const items = [new MockBasketItem(event1, 2)];
            expect(calculateTotal(items)).toBe(200);
        });
    });

    describe('showAdverts', () => {
        test('returns false for premium user', () => {
            const user = { isPremium: true };
            expect(showAdverts(user)).toBe(false);
        });

        test('returns true for non-premium user', () => {
            const user = { isPremium: false };
            expect(showAdverts(user)).toBe(true);
        });
    });

    describe('searchBasket', () => {
        test('returns items matching the search query', () => {
            const items = [new MockBasketItem(event1, 2), new MockBasketItem(event2, 1)];
            expect(searchBasket(items, "Concert")).toEqual([new MockBasketItem(event1, 2)]);
        });

        test('returns empty array when no items match the search query', () => {
            const items = [new MockBasketItem(event1, 2), new MockBasketItem(event2, 1)];
            expect(searchBasket(items, "Dance")).toEqual([]);
        });
    });

    describe('getBasketItem', () => {
        test('returns the correct basket item', () => {
            const items = [new MockBasketItem(event1, 2)];
            expect(getBasketItem(items, event1)).toEqual(new MockBasketItem(event1, 2));
        });

        test('returns null when the item does not exist', () => {
            const items = [new MockBasketItem(event1, 2)];
            expect(getBasketItem(items, event2)).toBeNull();
        });
    });

    describe('createBasketItem', () => {
        test('creates a new basket item if it does not already exist', () => {
            const items = [];
            expect(createBasketItem(items, event1, 2)).toEqual(new MockBasketItem(event1, 2));
        });

        test('returns null if the basket item already exists', () => {
            const items = [new MockBasketItem(event1, 2)];
            expect(createBasketItem(items, event1, 2)).toBeNull();
        });
    });

    describe('serializeBasketItemsToJson', () => {
        test('serializes basket items to JSON correctly', () => {
            const items = [new MockBasketItem(event1, 2)];
            expect(serializeBasketItemsToJson(items)).toEqual([{ event: event1, ticketCount: 2 }]);
        });
    });
});
