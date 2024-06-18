import { describe, expect, it, vi } from "vitest";
import { calculateTotal, createBasketItem, getBasketItem, searchBasket, showAdverts, serializeBasketItemsToJson } from "../../js/basket/basket";
import { User } from "../../js/users/users";
import { BasketItem } from "../../js/basket/basketitem";

// CalculateTotal function test
describe('CalculateTotal Function', () => {

    // Test Case 1
    it('Should calculate the price of a single basket item', () => {
        const mockedBasketItem = {
            getPrice: () => 237,
        };
        const total = calculateTotal([mockedBasketItem]);
        expect(total).toBe(237);
    });

    // Test case 2
    it('Should calculate the price of a multiple basket items', () => {
        const mockedBasketItem1 = {
            getPrice: () => 100,
        };
        const mockedBasketItem2 = {
            getPrice: () => 200,
        };
        const total = calculateTotal([mockedBasketItem1, mockedBasketItem2]);
        expect(total).toBe(300)

    });

    // Test Case 3
    it('Should return 0 for an empty basket', () => {
        const total = calculateTotal([]);
        expect(total).toBe(0);
    });

    // Test Case 4
    it('Should apply a discount to the total price', () => {
        const mockedBasketItem = vi.mocked(new BasketItem({id:1, name:'air jordan', ticketPrice:15000, totalTickets:1, ticketsRemaining:0, date:'06/07/2000'}, 1));
        const discount = 500;
        const total = calculateTotal([mockedBasketItem], discount);
        expect(total).toBe(14500);
    });
});

// ShowAdverts function test
describe('ShowAdverts Function', () => {
    // Test Case 1
    it('Should return false if user is premium', () => {
        const mockeUser = vi.mocked(new User(1, 'NK Wilfried'), true);
        mockeUser.isPremium = true;
        expect(showAdverts(mockeUser)).toBeFalsy();
    });

    // Test Case 2
    it('Should return true if user is not premium', () => {
        const mockedUser = vi.mocked(new User(1, 'Noubissie'), true);
        mockedUser.isPremium = false;
        expect(showAdverts(mockedUser)).toBeTruthy();
    });
});

// SearchBasket function test
describe('SearchBasket Function', () => {
    // Test case 1
    it('Should return an empty array of items if query is not in basketItems', () => {
        const mockedBasketItems = vi.mocked([
            new BasketItem({id:1, name:'air jordan', ticketPrice:15000, totalTickets:1, ticketsRemaining:0, date:'06/07/2000'}, 1),
            new BasketItem({id:2, name:'air force', ticketPrice:13000, totalTickets:1, ticketsRemaining:0, date:'06/07/2000'}, 1),
            new BasketItem({id:3, name:'jogging', ticketPrice:7000, totalTickets:1, ticketsRemaining:0, date:'06/07/2000'}, 1),
            new BasketItem({id:4, name:'pull over', ticketPrice:10000, totalTickets:1, ticketsRemaining:0, date:'06/07/2000'}, 1)

        ]);
        const result = searchBasket(mockedBasketItems, 'Casquette');
        const check = result.length === 0 ? true : false;
        expect(check).toBeTruthy();
    });

    // Test Case 2
    it('Should return a not empty array if basketItem include a search query',()=> {
        const mockedBasketItems = vi.mocked([
            new BasketItem({id:1, name:'air jordan', ticketPrice:15000, totalTickets:1, ticketsRemaining:0, date:'06/07/2000'}, 1),
            new BasketItem({id:2, name:'air force', ticketPrice:13000, totalTickets:1, ticketsRemaining:0, date:'06/07/2000'}, 1),
            new BasketItem({id:3, name:'jogging', ticketPrice:7000, totalTickets:1, ticketsRemaining:0, date:'06/07/2000'}, 1),
            new BasketItem({id:4, name:'pull over', ticketPrice:10000, totalTickets:1, ticketsRemaining:0, date:'06/07/2000'}, 1)

        ]);
        const result = searchBasket(mockedBasketItems, 'Air');
        const check = result.length === 0 ? true : false;
        expect(check).toBeFalsy();
    });
});

// GetBasketItem function test
describe('GetBasketItem Function', () => {
    // Test Case 1
    it('Should return a basket item if the event id is equal to the basket event id', () => {
        
        const mockedBasketItem = [
            new BasketItem({id: 1, name: 'air jordan'}, 1),
            new BasketItem({id: 2, name: 'air force'}, 1),
            new BasketItem({id: 3, name: 'jogging'}, 1)
        ];

        const itemLookFor = { id: 1};

        const items = getBasketItem(mockedBasketItem, itemLookFor);
        expect(items).toBe(mockedBasketItem[0]);
    });

    // Test Case 2
    it('Should return null if event id is not found', () => {
        const mockedBasketItem = [
            new BasketItem({id: 1, name: 'air jordan'}, 1),
            new BasketItem({id: 2, name: 'air force'}, 1),
            new BasketItem({id: 3, name: 'jogging'}, 1)
        ];

        const itemLookFor = { id: 4};

        const items = getBasketItem(mockedBasketItem, itemLookFor);
        expect(items).toBeNull();
    });
});

// CreateBasketItem function test
describe('CreateBasketItem Function', () => {
    // Test case 1
    it('Should create a basket item if it\'s not exist', () => {
        const mockedBasketItem = [
            new BasketItem({id: 1, name: 'air jordan'}, 1),
            new BasketItem({id: 2, name: 'air force'}, 1),
            new BasketItem({id: 3, name: 'jogging'}, 1)
        ];

        const newItem = {id: 4, name:'Pull Over'}
        const requiredTickets = 1;

        const createItem = createBasketItem(mockedBasketItem, newItem, requiredTickets);
        expect(createItem.event).toBe(newItem);
    });

    // Test case 2
    it('Should return null if a basket item already exist', () => {
        const mockedBasketItem = [
            new BasketItem({id: 1, name: 'air jordan'}, 1),
            new BasketItem({id: 2, name: 'air force'}, 1),
            new BasketItem({id: 3, name: 'jogging'}, 1)
        ];

        const newItem = {id: 3, name:'jogging'}
        const requiredTickets = 1;

        const createItem = createBasketItem(mockedBasketItem, newItem, requiredTickets);
        expect(createItem).toBeNull();
    });
});

// SerializeBasketItemsToJson function test
describe('SerializeBasketItemsToJson Function', () => {
    // Test case 1
    it('Serialize BasketItems To Json if the format is correct', () => {
      
        const mockedBasketItem = [
            new BasketItem({id: 1, name: 'air jordan'}, 1),
            new BasketItem({id: 2, name: 'air force'}, 1),
            new BasketItem({id: 3, name: 'jogging'}, 1)
        ];
  
      
      const resultItems = serializeBasketItemsToJson(mockedBasketItem);
      expect(resultItems).toEqual([
        { event: {id: 1, name: 'air jordan'}, ticketCount: 1 },
        { event: {id: 2, name: 'air force'}, ticketCount: 1 },
        { event: {id: 3, name: 'jogging' }, ticketCount: 1 }
      ]);
    });
});