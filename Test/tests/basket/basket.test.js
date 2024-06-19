//const { BasketItem } = require('./basketitem');
import { it, vi, expect, describe } from 'vitest';
import {calculateTotal} from "../js/basket/basket";

// Cas de test 1 : Panier avec un seul article
it('should calculate the total correctly for a single item', () => {
  // Préparer les données de test
  const basketItems = [{ getPrice: () => 10 }];

  // Appeler la fonction à tester
  const result = calculateTotal(basketItems);

  // Vérifier le résultat attendu
  expect(result).toBe(10);
});

// Cas de test 2 : Panier avec plusieurs articles
it('should calculate the total correctly for multiple items', () => {
  // Préparer les données de test
  const basketItems = [
    { getPrice: () => 10 },
    { getPrice: () => 20 },
    { getPrice: () => 30 },
  ];

  // Appeler la fonction à tester
  const result = calculateTotal(basketItems);

  // Vérifier le résultat attendu
  expect(result).toBe(60);
});

// Cas de test 3 : Panier vide
it('should return 0 for an empty basket', () => {
  // Préparer les données de test
  const basketItems = [];

  // Appeler la fonction à tester
  const result = calculateTotal(basketItems);

  // Vérifier le résultat attendu
  expect(result).toBe(0);
});

// Cas de test 4 : Panier avec un rabais
it('should calculate the total correctly with a discount', () => {
  // Préparer les données de test
  const basketItems = [
    { getPrice: () => 10 },
    { getPrice: () => 20 },
    { getPrice: () => 30 },
  ];
  const discount = 5;

  // Appeler la fonction à tester
  const result = calculateTotal(basketItems, discount);

  // Vérifier le résultat attendu
  expect(result).toBe(55);
});


//====================================================

// test-basket.js

// Importer la fonction à tester
//const { showAdverts } = require('./basket');
import {showAdverts} from "../js/basket/basket";

// Cas de test 1 : Utilisateur premium
it('should return false for premium user', () => {
  // Préparer les données de test
  const user = { isPremium: true };

  // Appeler la fonction à tester
  const result = showAdverts(user);

  // Vérifier le résultat attendu
  expect(result).toBe(false);
});

// Cas de test 2 : Utilisateur non premium
it('should return true for non-premium user', () => {
  // Préparer les données de test
  const user = { isPremium: false };

  // Appeler la fonction à tester
  const result = showAdverts(user);

  // Vérifier le résultat attendu
  expect(result).toBe(true);
});


//==========================================================
//const { searchBasket } = require('./basket');
import {searchBasket} from "../js/basket/basket";

it('should return matching items for a search query', () => {
    // Préparer les données de test
    const basketItems = [
      { event: { name: 'Concert A' } },
      { event: { name: 'Concert B' } },
      { event: { name: 'Conference C' } }
    ];
    const searchQuery = 'concert';
  
    // Appeler la fonction à tester
    const result = searchBasket(basketItems, searchQuery);
  
    // Vérifier le résultat attendu
    expect(result).toEqual([
      { event: { name: 'Concert A' } },
      { event: { name: 'Concert B' } }
    ]);
  }  )

//========================================================================
//const { getBasketItem } = require('./basket');  
import {getBasketItem} from "../js/basket/basket";

it('should return the basket item for a matching event', () => {
    // Préparer les données de test
    const basketItems = [
      { event: { id: 1, name: 'Concert A' } },
      { event: { id: 2, name: 'Concert B' } },
      { event: { id: 3, name: 'Conference C' } }
    ];
    const event = { id: 2, name: 'Concert B' };
  
    // Appeler la fonction à tester
    const result = getBasketItem(basketItems, event);
  
    // Vérifier le résultat attendu
    expect(result).toEqual({ event: { id: 2, name: 'Concert B' } });
  });
  
  it('should return null for a non-matching event', () => {
    // Préparer les données de test
    const basketItems = [
      { event: { id: 1, name: 'Concert A' } },
      { event: { id: 2, name: 'Concert B' } },
      { event: { id: 3, name: 'Conference C' } }
    ];
    const event = { id: 4, name: 'Conference D' };
  
    // Appeler la fonction à tester
    const result = getBasketItem(basketItems, event);
  
    // Vérifier le résultat attendu
    expect(result).toBeNull();
  });
  
