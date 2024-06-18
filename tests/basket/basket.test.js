
import { describe, it, expect, vi,beforeEach  } from 'vitest';
import { calculateTotal ,searchBasket,showAdverts,getBasketItem,createBasketItem,serializeBasketItemsToJson} from "../../js/basket/basket";
import { BasketItem } from '../../js/basket/basketitem';

//test de la fonction calculateTotal

describe('calculateTotal', () => {
    it('should return 0 if basket is empty', () => {
        // Arrange
        const basketItems = [];

        // Act
        const result = calculateTotal(basketItems);

        // Assert
        expect(result).toBe(0);
    });

    it('should return the price of the single item in the basket', () => {
        // Arrange
        const event = { ticketPrice: 50 };
        const basketItems = [new BasketItem(event, 1)];

        // Act
        const result = calculateTotal(basketItems);

        // Assert
        expect(result).toBe(50);
    });

    it('should return the sum of prices of all items in the basket', () => {
        // Arrange
        const event1 = { ticketPrice: 50 };
        const event2 = { ticketPrice: 30 };
        const basketItems = [new BasketItem(event1, 1), new BasketItem(event2, 1)];

        // Act
        const result = calculateTotal(basketItems);

        // Assert
        expect(result).toBe(80);
    });

    it('should apply the discount if provided', () => {
        // Arrange
        const event1 = { ticketPrice: 50 };
        const event2 = { ticketPrice: 30 };
        const basketItems = [new BasketItem(event1, 1), new BasketItem(event2, 1)];
        const discount = 10;

        // Act
        const result = calculateTotal(basketItems, discount);

        // Assert
        expect(result).toBe(70);
    });

    it('should return 0 if discount is equal to total price', () => {
        // Arrange
        const event1 = { ticketPrice: 50 };
        const event2 = { ticketPrice: 30 };
        const basketItems = [new BasketItem(event1, 1), new BasketItem(event2, 1)];
        const discount = 80;

        // Act
        const result = calculateTotal(basketItems, discount);

        // Assert
        expect(result).toBe(0);
    });

    it('should handle negative total price after discount', () => {
        // Arrange
        const event1 = { ticketPrice: 50 };
        const event2 = { ticketPrice: 30 };
        const basketItems = [new BasketItem(event1, 1), new BasketItem(event2, 1)];
        const discount = 100;

        // Act
        const result = calculateTotal(basketItems, discount);

        // Assert
        expect(result).toBe(-20);
    });
});

//test de la fonction showAdverts


describe('showAdverts', () => {
    it('should return false if the user is premium', () => {
        // Arrange
        const user = { isPremium: true };

        // Act
        const result = showAdverts(user);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true if the user is not premium', () => {
        // Arrange
        const user = { isPremium: false };

        // Act
        const result = showAdverts(user);

        // Assert
        expect(result).toBe(true);
    });
});



//test de la fonction searchBasket

describe('searchBasket', () => {
    it('should return an empty array if basket is empty', () => {
        // Arrange
        const basketItems = [];
        const searchQuery = 'concert';

        // Act
        const result = searchBasket(basketItems, searchQuery);

        // Assert
        expect(result).toEqual([]);
    });

    it('should return an empty array if no items match the search query', () => {
        // Arrange
        const event = { name: 'Football Match', ticketPrice: 50 };
        const basketItems = [new BasketItem(event, 1)];
        const searchQuery = 'concert';

        // Act
        const result = searchBasket(basketItems, searchQuery);

        // Assert
        expect(result).toEqual([]);
    });

    it('should return matching items based on the search query', () => {
        // Arrange
        const event1 = { name: 'Concert', ticketPrice: 50 };
        const event2 = { name: 'Football Match', ticketPrice: 30 };
        const basketItems = [new BasketItem(event1, 1), new BasketItem(event2, 1)];
        const searchQuery = 'concert';

        // Act
        const result = searchBasket(basketItems, searchQuery);

        // Assert
        expect(result).toEqual([basketItems[0]]);
    });

    it('should return all matching items for a partial search query', () => {
        // Arrange
        const event1 = { name: 'Concert', ticketPrice: 50 };
        const event2 = { name: 'Rock Concert', ticketPrice: 60 };
        const basketItems = [new BasketItem(event1, 1), new BasketItem(event2, 1)];
        const searchQuery = 'concert';

        // Act
        const result = searchBasket(basketItems, searchQuery);

        // Assert
        expect(result).toEqual([basketItems[0], basketItems[1]]);
    });

    it('should be case insensitive in search', () => {
        // Arrange
        const event = { name: 'Concert', ticketPrice: 50 };
        const basketItems = [new BasketItem(event, 1)];
        const searchQuery = 'CONCERT';

        // Act
        const result = searchBasket(basketItems, searchQuery);

        // Assert
        expect(result).toEqual([basketItems[0]]);
    });
});

// test de la fonction getBasketItem

describe('getBasketItem', () => {
    it('should return null if the basket is empty', () => {
        // Arrange
        const basketItems = [];
        const event = { id: 1 };

        // Act
        const result = getBasketItem(basketItems, event);

        // Assert
        expect(result).toBeNull();
    });

    it('should return null if the event is not in the basket', () => {
        // Arrange
        const event1 = { id: 1, name: 'Concert' };
        const event2 = { id: 2, name: 'Football Match' };
        const basketItems = [new BasketItem(event1, 1)];
        const eventToFind = { id: 3, name: 'Rock Concert' };

        // Act
        const result = getBasketItem(basketItems, eventToFind);

        // Assert
        expect(result).toBeNull();
    });

    it('should return the basket item if the event is in the basket', () => {
        // Arrange
        const event = { id: 1, name: 'Concert' };
        const basketItems = [new BasketItem(event, 1)];

        // Act
        const result = getBasketItem(basketItems, event);

        // Assert
        expect(result).toEqual(basketItems[0]);
    });

    it('should return the correct basket item when multiple items are in the basket', () => {
        // Arrange
        const event1 = { id: 1, name: 'Concert' };
        const event2 = { id: 2, name: 'Football Match' };
        const basketItems = [new BasketItem(event1, 1), new BasketItem(event2, 2)];
        const eventToFind = { id: 2, name: 'Football Match' };

        // Act
        const result = getBasketItem(basketItems, eventToFind);

        // Assert
        
        expect(result).toEqual(basketItems[1]);
    });
});



//test de la fonction createBasketItem

describe('createBasketItem()', () => {
    it('CreateBasketItem_NouvelArticle', () => {
      // Données d'entrée
      const basketItems = [
        new BasketItem({ name: 'Pizza Margherita', id: 1 }, 1),
        new BasketItem({ name: 'Salade César', id: 2 }, 1)
      ];
      const newItem = { name: 'Burger', id: 3, ticketPrice: 8 };
      const requiredTickets = 2;
  
      // Création d'un nouvel article
      const createdItem = createBasketItem(basketItems, newItem, requiredTickets);
      expect(createdItem.event.name).toBe('Burger');
      expect(createdItem.event.id).toBe(3);
      expect(createdItem.ticketCount).toBe(2);
    });
  });
 




// test de la fonction serializeBasketItemsToJson

describe('serializeBasketItemsToJson', () => {
    it('should serialize basket items to JSON format', () => {
        // Arrange
        const basketItems = [
            new BasketItem({ id: 1, name: 'Event 1', ticketPrice: 50 }, 2),
            new BasketItem({ id: 2, name: 'Event 2', ticketPrice: 75 }, 1),
        ];

        // Act
        const result = serializeBasketItemsToJson(basketItems);

        // Assert
        expect(result).toEqual([
            { event: { id: 1, name: 'Event 1', ticketPrice: 50 }, ticketCount: 2 },
            { event: { id: 2, name: 'Event 2', ticketPrice: 75 }, ticketCount: 1 },
        ]);
    });

    it('should handle empty basketItems array', () => {
        // Arrange
        const basketItems = [];

        // Act
        const result = serializeBasketItemsToJson(basketItems);

        // Assert
        expect(result).toEqual([]);
    });

    it('should handle basketItems with null or undefined values', () => {
        // Arrange
        const basketItems = [
            new BasketItem({ id: 1, name: 'Event 1', ticketPrice: 50 }, 2),
            null,
            undefined,
            new BasketItem({ id: 2, name: 'Event 2', ticketPrice: 75 }, 1),
        ];

        // Act
        const result = serializeBasketItemsToJson(basketItems);

        // Assert
        expect(result).toEqual([
            { event: { id: 1, name: 'Event 1', ticketPrice: 50 }, ticketCount: 2 },
            null,
            undefined,
            { event: { id: 2, name: 'Event 2', ticketPrice: 75 }, ticketCount: 1 },
        ]);
    });
});