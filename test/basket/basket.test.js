import { describe, expect, it } from 'vitest';
import { BasketItem } from '../../js/basket/basketitem';
import {
  calculateTotal,
  showAdverts,
  searchBasket,
  getBasketItem,
  createBasketItem,
  serializeBasketItemsToJson,
} from '../../js/basket/basket';

describe('calculateTotal', () => {
  it('should calculate the total for a single basket item', () => {
    // Arrange
    const basketItems = [new BasketItem({ id: 1, name: 'Event 1' }, 2)];

    // Act
    const total = calculateTotal(basketItems);

    // Assert
    expect(total).toBe(basketItems[0].getPrice());
  });

  it('should calculate the total for multiple basket items', () => {
    // Arrange
    const basketItems = [
      new BasketItem({ id: 1, name: 'Event 1' }, 2),
      new BasketItem({ id: 2, name: 'Event 2' }, 3),
    ];

    // Act
    const total = calculateTotal(basketItems);

    // Assert
    expect(total).toBe(basketItems[0].getPrice() + basketItems[1].getPrice());
  });

  it('should apply a discount to the total', () => {
    // Arrange
    const basketItems = [
      new BasketItem({ id: 1, name: 'Event 1' }, 2),
      new BasketItem({ id: 2, name: 'Event 2' }, 3),
    ];
    const discount = 10;

    // Act
    const total = calculateTotal(basketItems, discount);

    // Assert
    expect(total).toBe(basketItems[0].getPrice() + basketItems[1].getPrice() - discount);
  });
});

describe('showAdverts', () => {
  it('should return false for premium users', () => {
    // Arrange
    const user = { isPremium: true };

    // Act
    const showAds = showAdverts(user);

    // Assert
    expect(showAds).toBe(false);
  });

  it('should return true for non-premium users', () => {
    // Arrange
    const user = { isPremium: false };

    // Act
    const showAds = showAdverts(user);

    // Assert
    expect(showAds).toBe(true);
  });
});

describe('searchBasket', () => {
  it('should return basket items that match the search query', () => {
    // Arrange
    const basketItems = [
      new BasketItem({ id: 1, name: 'Event 1' }, 2),
      new BasketItem({ id: 2, name: 'Event 2' }, 3),
      new BasketItem({ id: 3, name: 'Event 3' }, 1),
    ];
    const searchQuery = 'event 2';

    // Act
    const searchResults = searchBasket(basketItems, searchQuery);

    // Assert
    expect(searchResults.length).toBe(1);
    expect(searchResults[0].event.name).toBe('Event 2');
  });

  it('should return an empty array if no items match the search query', () => {
    // Arrange
    const basketItems = [
      new BasketItem({ id: 1, name: 'Event 1' }, 2),
      new BasketItem({ id: 2, name: 'Event 2' }, 3),
      new BasketItem({ id: 3, name: 'Event 3' }, 1),
    ];
    const searchQuery = 'event 4';

    // Act
    const searchResults = searchBasket(basketItems, searchQuery);

    // Assert
    expect(searchResults.length).toBe(0);
  });
});

describe('getBasketItem', () => {
  it('should return the basket item with the specified event', () => {
    // Arrange
    const event = { id: 1, name: 'Event 1' };
    const basketItems = [
      new BasketItem({ id: 1, name: 'Event 1' }, 2),
      new BasketItem({ id: 2, name: 'Event 2' }, 3),
      new BasketItem({ id: 3, name: 'Event 3' }, 1),
    ];

    // Act
    const basketItem = getBasketItem(basketItems, event);

    // Assert
    expect(basketItem).not.toBeNull();
    expect(basketItem.event.id).toBe(event.id);
  });

  it('should return null if the event is not found in the basket', () => {
    // Arrange
    const event = { id: 4, name: 'Event 4' };
    const basketItems = [
      new BasketItem({ id: 1, name: 'Event 1' }, 2),
      new BasketItem({ id: 2, name: 'Event 2' }, 3),
      new BasketItem({ id: 3, name: 'Event 3' }, 1),
    ];

    // Act
    const basketItem = getBasketItem(basketItems, event);

    // Assert
    expect(basketItem).toBeNull();
  });
});

describe('createBasketItem', () => {
  it('should create a new basket item if the event is not already in the basket', () => {
    // Arrange
    const event = { id: 1, name: 'Event 1' };
    const basketItems = [
      new BasketItem({ id: 2, name: 'Event 2' }, 3),
      new BasketItem({ id: 3, name: 'Event 3' }, 1),
    ];
    const requiredTickets = 2;

    // Act
    const basketItem = createBasketItem(basketItems, event, requiredTickets);

    // Assert
    expect(basketItem).not.toBeNull();
    expect(basketItem.event.id).toBe(event.id);
    expect(basketItem.requiredTickets).toBe(requiredTickets);
  });

  it('should return null if the event is already in the basket', () => {
    // Arrange
    const event = { id: 1, name: 'Event 1' };
    const basketItems = [
      new BasketItem({ id: 1, name: 'Event 1' }, 2),
      new BasketItem({ id: 2, name: 'Event 2' }, 3),
      new BasketItem({ id: 3, name: 'Event 3' }, 1),
    ];
    const requiredTickets = 2;

    // Act
    const basketItem = createBasketItem(basketItems, event, requiredTickets);

    // Assert
    expect(basketItem).toBeNull();
  });
});

describe('serializeBasketItemsToJson', () => {
  it('should serialize basket items to a JSON array', () => {
    // Arrange
    const basketItems = [
      new BasketItem({ id: 1, name: 'Event 1' }, 2),
      new BasketItem({ id: 2, name: 'Event 2' }, 3),
      new BasketItem({ id: 3, name: 'Event 3' }, 1),
    ];

    // Act
    const jsonItems = serializeBasketItemsToJson(basketItems);

    // Assert
    expect(jsonItems.length).toBe(basketItems.length);
    expect(jsonItems[0]).toEqual({ ...basketItems[0] });
    expect(jsonItems[1]).toEqual({ ...basketItems[1] });
    expect(jsonItems[2]).toEqual({ ...basketItems[2] });
  });
});

/* Ce code utilise le framework Vitest pour écrire les tests unitaires pour les fonctions fournies. 
Le modèle AAA (Arrange, Act, Assert) est utilisé pour structurer les tests.
Chaque fonction a plusieurs tests qui vérifient différents scénarios.
Les tests couvrent les cas de base, les cas limites et les cas avec des entrées spéciales. 
 
Arrange : Préparez les données nécessaires pour le test.
Act : Appelez la fonction que vous souhaitez tester.
Assert : Vérifiez que le résultat de l'appel est correct.
 
*/