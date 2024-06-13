import { calculateTotal, showAdverts, searchBasket, getBasketItem, createBasketItem, serializeBasketItemsToJson } from '../../js/basket/basket';
import { BasketItem } from '../../js/basket/basketitem';

describe('calculateTotal()', () => {
  test('CalculateTotal_AvecEtSansDiscount', () => {
    // Données d'entrée
    const basketItems = [
      new BasketItem({ name: 'Pizza Margherita', ticketPrice: 10 }, 2),
      new BasketItem({ name: 'Salade César', ticketPrice: 7 }, 1)
    ];
    const discount = 0.1;

    // Sans discount
    const totalWithoutDiscount = calculateTotal(basketItems);
    expect(totalWithoutDiscount).toBe(27);

    // Avec discount
    const totalWithDiscount = calculateTotal(basketItems, discount);
    expect(totalWithDiscount).toBe(26.9);
  });
});

describe('showAdverts()', () => {
  test('ShowAdverts_PourUtilisateur', () => {
    // Données d'entrée
    const userWithPremium = { isPremium: true };
    const userWithoutPremium = { isPremium: false };

    // Vérifier l'affichage des annonces
    expect(showAdverts(userWithPremium)).toBe(false);
    expect(showAdverts(userWithoutPremium)).toBe(true);
  });
});

describe('searchBasket()', () => {
  test('SearchBasket_ArticlesCorrespondants', () => {
    // Données d'entrée
    const basketItems = [
      new BasketItem({ name: 'Pizza Margherita', id: 1 }, 1),
      new BasketItem({ name: 'Salade César', id: 2 }, 1),
      new BasketItem({ name: 'Spaghetti Bolognese', id: 3 }, 1)
    ];
    const searchQuery = 'Pizza';

    // Recherche dans le panier
    const searchResults = searchBasket(basketItems, searchQuery);
    expect(searchResults.length).toBe(1);
    expect(searchResults[0].event.name).toBe('Pizza Margherita');
  });
});

describe('getBasketItem()', () => {
  test('GetBasketItem_ArticleSpecifique', () => {
    // Données d'entrée
    const basketItems = [
      new BasketItem({ name: 'Pizza Margherita', id: 1 }, 1),
      new BasketItem({ name: 'Salade César', id: 2 }, 1)
    ];
    const itemToRetrieve = { id: 2 };

    // Récupération de l'article
    const retrievedItem = getBasketItem(basketItems, itemToRetrieve);
    expect(retrievedItem.event.name).toBe('Salade César');
  });
});

describe('createBasketItem()', () => {
  test('CreateBasketItem_NouvelArticle', () => {
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

describe('serializeBasketItemsToJson()', () => {
  test('SerializeBasketItemsToJson_FormatCorrect', () => {
    // Données d'entrée
    const basketItems = [
      new BasketItem({ name: 'Pizza Margherita', id: 1, ticketPrice: 10 }, 2),
      new BasketItem({ name: 'Salade César', id: 2, ticketPrice: 7 }, 1)
    ];

    // Conversion en JSON
    const jsonItems = serializeBasketItemsToJson(basketItems);
    expect(jsonItems).toEqual([
      { event: { name: 'Pizza Margherita', id: 1, ticketPrice: 10 }, ticketCount: 2 },
      { event: { name: 'Salade César', id: 2, ticketPrice: 7 }, ticketCount: 1 }
    ]);
  });
});
