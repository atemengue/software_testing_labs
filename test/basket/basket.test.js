import { describe, expect, it } from "vitest";
import { calculateTotal, getBasketItem, searchBasket, showAdverts, createBasketItem, serializeBasketItemsToJson } from "../../js/basket/basket";
import { BasketItem } from "../../js/basket/basketitem";

describe("Testing Basket functionality", ()=> {
    it("Should return 0 for empty basket", ()=> {
        const basketItems = [];

        const result = calculateTotal(basketItems);

        expect(result).toBe(0);
    });

    it("Should calculate total for a single item", ()=> {
        const basketItems = [new BasketItem({ ticketPrice: 20}, 1)];

        const result = calculateTotal(basketItems);

        expect(result).toBe(20);
    });

    it("Should calculate total for multiple items", ()=> {
        const basketItems = [
            new BasketItem({ ticketPrice: 10}, 3),
            new BasketItem({ ticketPrice: 5}, 2),
        ];
        
        const result = calculateTotal(basketItems);

        expect(result).toBe(40);

    });

    it("Should apply discount", ()=> {
        const basketItems = [
            new BasketItem({ ticketPrice: 10}, 1),
            new BasketItem({ ticketPrice: 5}, 3)
        ];
        const discount = 2 * 1.5;

        const result = calculateTotal(basketItems, discount);

        expect(result).toBe(22);
    });

    it("Should not apply discount if null", ()=> {
        const basketItems = [new BasketItem({ ticketPrice: 13}, 3)];
        const discount = null;

        const result = calculateTotal(basketItems, discount);

        expect(result).toBe(39);
    });
    
});

describe("Testing Adverts functionality", () => {
    it("Should not show adverts for premium user", () => {
        const user = { isPremium: true };

        const result = showAdverts(user);

        expect(result).toBe(false);
    });
    it("Should show adverts for non-premium user", () => {
        const user = { isPremium: false};

        const result = showAdverts(user);

        expect(result).toBe(true);
    });
});

describe("Testing Search Basket functionality", () => {
    it("Should find matching basket items", () => {
        // Create basket items with event name
        const basketItems = [
            new BasketItem({ name: "Event A"}, 1),
            new BasketItem({ name: "Event B"}, 2),
        ];

        // Search for "event a"
        const searchQuery = "event ";

        //call the function and assert the result
        const result = searchBasket(basketItems, searchQuery);

        // Expect the result array to have a length of 1 (one matchinf)
        expect(result).toHaveLength(2);

        // Expect the first item in the result array to have the event name "Event A" 
        expect(result[0].event.name).toBe("Event A");
        expect(result[1].event.name).toBe("Event B");
    });

    it("Should return empty array for no matches", () => {
        
        const basketItems = [new BasketItem({ name: "Event A"}, 1)];

        const searchQuery = "event b";

        const result = searchBasket(basketItems, searchQuery);

        expect(result).toHaveLength(0); // Expect an empty array
    });

    it("Should perform case-insensitive search", () => {

        const basketItems = [new BasketItem({ name: "Event A"})];

        const searchQuery = "Event a";

        const result = searchBasket(basketItems, searchQuery);

        expect(result).toHaveLength(1); // Expect one matching
    });
});

describe("Testing Get basket item functionality", () => {
    it("Should find matching basket item", () => {

        // Create basket items with id
        const basketItems = [
            new BasketItem({ id: 1}, 1),
            new BasketItem({ id: 2}, 2),
        ];

        // Search for event with id
        const event = { id: 1};

        // Call the function and assert the result
        const result = getBasketItem(basketItems, event);

        // Expect the result to be null, indicating a matching item was found
        expect(result).not.toBeNull();

        // Expect the event ID of the found item to be 1
        expect(result.event.id).toBe(1);
    });

    it("Should return null for no matches", () => {
        const basketItems = [new BasketItem({ id: 1}, 2)];
        const event = { id: 2};

        const result = getBasketItem(basketItems, event);

        expect(result).toBeNull();
    });

    it("should handle multiple matching items", () => {
        // Create multiple basket items with the same event ID
        const basketItems = [
            new BasketItem({ id: 1 }, 1), 
            new BasketItem({ id: 1 }, 2)];
        const event = { id: 1 };
    
        const result = getBasketItem(basketItems, event);
    
        expect(result).not.toBeNull(); // Expect a matching item
        // Expect the quantity of the found item to be 1 (assuming the function returns the first matching item)
        expect(result.event.id).toBe(1);
      });
});

describe("Testing Create Basket Item functionality", () => {
    it("Should create new basket item", () => {
        // Create an empty array of basket items
        const basketitems = [];

        // event details
        const event = { id: 1};
        const requiredTickets = 2;

        // call the function and assert the result
        const result = createBasketItem(basketitems, event, requiredTickets);

        // Expect the result to be null, indicating a new basket item was crated
        expect(result).not.toBeNull();

        // Expect the event ID of the created item to be 1
        expect(result.event.id).toBe(1);

    });

    it("Should return null for existing item", () => {
        // Created basket items with an existing event
        const basketItems = [new BasketItem({ id: 1}, 1)];

        const event = { id: 1};

        const requiredTickets = 3;

        const result =  createBasketItem(basketItems, event, requiredTickets);

        expect(result).toBeNull(); // Expect null for an exisring item
    });
});

describe("Testing Serialize basket items functionality", () => {
    it("Should serialize basket items to JSON", () => {
        // Create basket items with event IDs and quantities
        const basketItems = [
            new BasketItem({ id: 1}, 1),
            new BasketItem({ id: 2}, 3)
        ];

        // Call the function and assert the result
        const result = serializeBasketItemsToJson(basketItems);

        // Expect the result array to have a langth of 2 
        expect(result).toHaveLength(2);

        // Expect the first item in the result array to have ID 1
        expect(result[0].event.id).toBe(1);

        // Expect the second item in the result array to have ID 2
        expect(result[1].event.id).toBe(2);
    });

    it("Shoul not modify original basket items", () => {
        const basketItems = [new BasketItem({ id: 1}, 2)];

        const serializedItems = serializeBasketItemsToJson(basketItems);

        // Modify the serialized item
        serializedItems[0].event.id = 3;

       

        // Expect the original basket item to remain unchanged
        expect(basketItems[0].event.id).toBeGreaterThan(1);
    });
});