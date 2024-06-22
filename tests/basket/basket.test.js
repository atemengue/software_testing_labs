import { describe, expect, it, test, vi } from 'vitest';
import { calculateTotal, showAdverts, searchBasket, getBasketItem, createBasketItem, serializeBasketItemsToJson } from '../../js/basket/basket.js';
import { BasketItem } from '../../js/basket/basketitem.js';

vi.mock('basket');

describe('calculateTotal', () => {

    it('Doit retourner 0 si taille basketItems = 0 et discount = null', () => {

        expect(calculateTotal([], null)).toBe(0);
    });

    it('Doit retourner 10 si taille de basketItems = 1 avec discount = null', () => {
        expect(calculateTotal([{ getPrice: () => 10 }], null)).toBe(10);
    });

    it('Doit retourner 10 si basketItems est egal 1 et discount egal a 5', () => {
        expect(calculateTotal([{ getPrice: () => 15 }], 5)).toBe(10);
    });

    it('Doit retourner 30 si basketItems > 1 et discount = null', () => {
        expect(calculateTotal([{ getPrice: () => 10 }, { getPrice: () => 10 }, { getPrice: () => 10 }], null)).toBe(30);
    });
    it('Doit retourner 20 si basketItems > 1 et discount = 10', () => {
        expect(calculateTotal([{ getPrice: () => 10 }, { getPrice: () => 10 }, { getPrice: () => 10 }], 10)).toBe(20);
    });
    it('Doit retourner -5 si basketItems est egal a 0 et discount = 5', () => {
        expect(calculateTotal([], 5)).toBe(-5);
    });
})

describe('showAdverts', () => {

    it('Doit retourner faux si user est premium ', () => {
        const user = showAdverts({ isPremium: true });

        expect(typeof user).toBe('boolean');
        expect(showAdverts({ isPremium: true })).toBe(false);
    });

    it('Doit retourner vrai si user n\'est pas premium ', () => {
        const user = showAdverts({ isPremium: false });

        expect(typeof user).toBe('boolean');
        expect(user).toBe(true);

    });

    it('Doit retourner vrai si user est vide ', () => {
        expect(showAdverts({ isPremium: '' })).toBe(true);
        expect(showAdverts({})).toBe(true);
    });

});

describe('searchBasket', () => {
    test('Doit retourner basketItems si searchQuery est vide', () => {
        const basketItems = [
            { event: { name: "Concert" } },
            { event: { name: "Festival" } }
        ];
        const searchQuery = "";
        const result = searchBasket(basketItems, searchQuery);
        expect(result.length).toBeGreaterThan(0);
        expect(result).toEqual(basketItems);
    });

    test('Doit retourner le vide si shearchQuery ne correspond a aucun element dans baskeItems', () => {
        const basketItems = [
            { event: { name: "Concert" } },
            { event: { name: "Festival" } }
        ];
        const searchQuery = "hepl";
        const result = searchBasket(basketItems, searchQuery);
        expect(result.length).toBeLessThan(1);
        expect(result).toEqual([]);
    });

    test('Doit retourner enregistrement si  searchQuery correspond est partiellement a un enregistrement de basketItems (casse ignorée)', () => {
        const basketItems = [
            { event: { name: "Concert" } },
            { event: { name: "Festival" } }
        ];
        const searchQuery = "con";
        const result = searchBasket(basketItems, searchQuery);
        expect(result.length).toBeGreaterThan(0);
        expect(result).toEqual([{ event: { name: "Concert" } }]);
    });

    test('Doit retourner enregistrement si searchQuery correspond exactement a un enregistrement de basketItems (casse ignorée)', () => {
        const basketItems = [
            { event: { name: "Concert" } },
            { event: { name: "Festival" } }
        ];
        const searchQuery = "concert";
        const result = searchBasket(basketItems, searchQuery);
        expect(result.length).toBeGreaterThan(0);
        expect(result).toEqual([{ event: { name: "Concert" } }]);
    });

    test('Doit retourner les enregistrements qui contiennent element de searchQuery', () => {
        const basketItems = [
            { event: { name: "Concert" } },
            { event: { name: "Concert Hall" } },
            { event: { name: "Festival" } }
        ];
        const searchQuery = "concert";
        const result = searchBasket(basketItems, searchQuery);
        expect(result.length).toBeGreaterThan(0);
        expect(result).toEqual([
            { event: { name: "Concert" } },
            { event: { name: "Concert Hall" } }
        ]);
    });

    test('Doit retourner une liste vide si basketItems est vide', () => {
        const basketItems = [];
        const searchQuery = "music concert";
        const result = searchBasket(basketItems, searchQuery);
        expect(result.length).toBeLessThan(1);
        expect(result).toEqual([]);
    });
});

describe('getBasketItem', () => {
    test('Doit retourner enregistrement correspondant s\il a ete trouver dans basketItems', () => {
        const basketItems = [
            { event: { id: 1, name: "Concert" } },
            { event: { id: 2, name: "Festival" } }
        ];
        const event = { id: 1, name: "Concert" };
        const result = getBasketItem(basketItems, event);
        expect(result).toEqual({ event: { id: 1, name: "Concert" } });
    });

    test('Doit retourner null si aucun objet ne correspond aux objets de basketItems', () => {
        const basketItems = [
            { event: { id: 1, name: "Concert" } }
        ];
        const event = { id: 2, name: "Festival" };
        const result = getBasketItem(basketItems, event);
        expect(result).toBeNull();
    });

    test('Doit retourner null si la basketItems est vide', () => {
        const basketItems = [];
        const event = { id: 1, name: "Concert" };
        const result = getBasketItem(basketItems, event);
        expect(result).toBeNull();
    });

    test('Doit retourner enregistrement meme si evénement est avec une propriétés supplémentaires', () => {
        const basketItems = [
            { event: { id: 1, name: "Concert", date: "2024" } }
        ];
        const event = { id: 1, name: "Concert" };
        const result = getBasketItem(basketItems, event);
        expect(result).toEqual({ event: { id: 1, name: "Concert", date: "2024" } });
    });
});

describe('createBasketItem', () => {

    test('Doit retourner le nouvel enregistrement creer du panier pour un événement non présent dans le panier', () => {
        const basketItems = [{ event: { id: 1, name: "Concert" } }];
        const event = { id: 2, name: "Festival" };
        const requiredTickets = 2;
        const result = createBasketItem(basketItems, event, requiredTickets);
        expect(result).toEqual(new BasketItem(event, requiredTickets));
    });

    test('Doit retourner null si evénement est déjà présent dans le panier', () => {
        const basketItems = [{ event: { id: 1, name: "Concert" } }];
        const event = { id: 1, name: "Concert" };
        const requiredTickets = 2;
        const result = createBasketItem(basketItems, event, requiredTickets);
        expect(result).toBeNull();
    });

    test('Doit retourner le nouvel enregistrement creer si le panier est vide', () => {
        const basketItems = [];
        const event = { id: 1, name: "Concert" };
        const requiredTickets = 2;
        const result = createBasketItem(basketItems, event, requiredTickets);
        expect(result).toEqual(new BasketItem(event, requiredTickets));
    });

});

describe('serializeBasketItemsToJson', () => {
    test('Doit retourner les enregistrements entrer', () => {
        const basketItems = [
            { event: { id: 1, name: "Concert" }, requiredTickets: 2 },
            { event: { id: 2, name: "Festival" }, requiredTickets: 3 }
        ];
        const result = serializeBasketItemsToJson(basketItems);
        expect(result).toEqual(basketItems);
    });

    test('Doit retourner un tableau vide si les basktItems est vide', () => {
        const basketItems = [];
        const result = serializeBasketItemsToJson(basketItems);
        expect(result).toEqual([]);
    });

    test('Doit retourner les enregistrement entrer meme s\il contient plus de parametre', () => {
        const basketItems = [{ event: { id: 1, name: "Concert" }, requiredTickets: 2, type: 'Numerique' }];
        const result = serializeBasketItemsToJson(basketItems);
        expect(result).toEqual(basketItems);
    });

});
