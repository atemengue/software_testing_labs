import {
    calculateTotal,
    createBasketItem,
    getBasketItem,
    searchBasket,
    serializeBasketItemsToJson,
    showAdverts
} from "./basket";

// Mock BasketItem for testing purposes
class MockBasketItem {
    constructor(event, requiredTickets) {
        this.event = event;
        this.requiredTickets = requiredTickets;
    }

    getPrice() {
        return this.event.price * this.requiredTickets;
    }
}

describe('Basket Functions', () => {
    const event1 = {id: 1, name: "Concert", price: 100};
    const event2 = {id: 2, name: "Theater", price: 150};

    test('calculateTotal with no items', () => {
        expect(calculateTotal([])).toBe(0);
    });

    test('calculateTotal with one item', () => {
        const items = [new MockBasketItem(event1, 2)];
        expect(calculateTotal(items)).toBe(200);
    });

    test('calculateTotal with multiple items', () => {
        const items = [new MockBasketItem(event1, 2), new MockBasketItem(event2, 1)];
        expect(calculateTotal(items)).toBe(350);
    });

    test('calculateTotal with discount', () => {
        const items = [new MockBasketItem(event1, 2)];
        expect(calculateTotal(items, 50)).toBe(150);
    });

    test('showAdverts for premium user', () => {
        const user = {isPremium: true};
        expect(showAdverts(user)).toBe(false);
    });

    test('showAdverts for non-premium user', () => {
        const user = {isPremium: false};
        expect(showAdverts(user)).toBe(true);
    });

    test('searchBasket with matching query', () => {
        const items = [new MockBasketItem(event1, 2), new MockBasketItem(event2, 1)];
        expect(searchBasket(items, "Concert")).toEqual([new MockBasketItem(event1, 2)]);
    });

    test('searchBasket with no matching query', () => {
        const items = [new MockBasketItem(event1, 2), new MockBasketItem(event2, 1)];
        expect(searchBasket(items, "Dance")).toEqual([]);
    });

    test('getBasketItem returns correct item', () => {
        const items = [new MockBasketItem(event1, 2)];
        expect(getBasketItem(items, event1)).toEqual(new MockBasketItem(event1, 2));
    });

    test('getBasketItem returns null for non-existing item', () => {
        const items = [new MockBasketItem(event1, 2)];
        expect(getBasketItem(items, event2)).toBeNull();
    });

    test('createBasketItem creates new item if not existing', () => {
        const items = [];
        expect(createBasketItem(items, event1, 2)).toEqual(new MockBasketItem(event1, 2));
    });

    test('createBasketItem returns null if item already exists', () => {
        const items = [new MockBasketItem(event1, 2)];
        expect(createBasketItem(items, event1, 2)).toBeNull();
    });

    test('serializeBasketItemsToJson serializes items correctly', () => {
        const items = [new MockBasketItem(event1, 2)];
        expect(serializeBasketItemsToJson(items)).toEqual([{event: event1, requiredTickets: 2}]);
    });
});
