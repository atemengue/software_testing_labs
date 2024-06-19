import { describe, it, expect, vi } from 'vitest';
import {
    calculateTotal,
    showAdverts,
    searchBasket,
    getBasketItem,
    createBasketItem,
    serializeBasketItemsToJson
} from '../../js/basket/basket'; 
import { BasketItem } from '../../js/basket/basketitem'; 

// Mock de BasketItem
vi.mock('../../js/basket/basketitem', () => {
    return {
        BasketItem: vi.fn().mockImplementation((event, ticketCount) => {
            return {
                event,
                ticketCount,
                getPrice: vi.fn().mockReturnValue(event.ticketPrice * ticketCount)
            };
        })
    };
});

// Tests pour calculateTotal
describe('calculateTotal', () => {
    it('devrait retourner 0 si le panier est vide', () => {
        const basketItems = [];
        expect(calculateTotal(basketItems)).toBe(0);
    });

    it('devrait retourner le prix correct pour un seul item', () => {
        const event = { ticketPrice: 50 };
        const basketItem = new BasketItem(event, 2);
        expect(calculateTotal([basketItem])).toBe(100);
    });

    it('devrait retourner le prix total correct pour plusieurs items', () => {
        const event1 = { ticketPrice: 50 };
        const event2 = { ticketPrice: 30 };
        const basketItem1 = new BasketItem(event1, 2);
        const basketItem2 = new BasketItem(event2, 1);
        expect(calculateTotal([basketItem1, basketItem2])).toBe(130);
    });

    it('devrait appliquer correctement une réduction', () => {
        const event = { ticketPrice: 50 };
        const basketItem = new BasketItem(event, 2);
        expect(calculateTotal([basketItem], 20)).toBe(80);
    });
});

// Tests pour showAdverts
describe('showAdverts', () => {
    it('devrait retourner false si l\'utilisateur est premium', () => {
        const user = { isPremium: true };
        expect(showAdverts(user)).toBe(false);
    });

    it('devrait retourner true si l\'utilisateur n\'est pas premium', () => {
        const user = { isPremium: false };
        expect(showAdverts(user)).toBe(true);
    });
});

// Tests pour searchBasket
describe('searchBasket', () => {
    it('devrait retourner les items correspondant à la requête de recherche', () => {
        const event1 = { id: 1, name: 'Concert', ticketPrice: 50 };
        const event2 = { id: 2, name: 'Théâtre', ticketPrice: 30 };
        const basketItem1 = new BasketItem(event1, 2);
        const basketItem2 = new BasketItem(event2, 1);
        expect(searchBasket([basketItem1, basketItem2], 'concert')).toEqual([basketItem1]);
    });

    it('devrait retourner un tableau vide si aucun item ne correspond à la requête de recherche', () => {
        const event1 = { id: 1, name: 'Concert', ticketPrice: 50 };
        const event2 = { id: 2, name: 'Théâtre', ticketPrice: 30 };
        const basketItem1 = new BasketItem(event1, 2);
        const basketItem2 = new BasketItem(event2, 1);
        expect(searchBasket([basketItem1, basketItem2], 'opéra')).toEqual([]);
    });
});

// Tests pour getBasketItem
describe('getBasketItem', () => {
    it('devrait retourner l\'item du panier correspondant à l\'événement donné', () => {
        const event = { id: 1, name: 'Concert', ticketPrice: 50 };
        const basketItem = new BasketItem(event, 2);
        expect(getBasketItem([basketItem], event)).toBe(basketItem);
    });

    it('devrait retourner null si aucun item ne correspond à l\'événement donné', () => {
        const event = { id: 1, name: 'Concert', ticketPrice: 50 };
        expect(getBasketItem([], event)).toBe(null);
    });
});

// Tests pour createBasketItem
describe('createBasketItem', () => {
    it('devrait créer et retourner un nouvel item de panier si l\'événement n\'est pas déjà dans le panier', () => {
        const event = { id: 1, name: 'Concert', ticketPrice: 50 };
        const basketItems = [];
        const requiredTickets = 2;
        const newBasketItem = createBasketItem(basketItems, event, requiredTickets);
        expect(newBasketItem).not.toBeNull();
        expect(newBasketItem.event).toEqual(event);
        expect(newBasketItem.ticketCount).toBe(requiredTickets);
    });

    it('ne devrait pas créer un nouvel item de panier si l\'événement est déjà dans le panier', () => {
        const event = { id: 1, name: 'Concert', ticketPrice: 50 };
        const basketItem = new BasketItem(event, 2);
        const basketItems = [basketItem];
        expect(createBasketItem(basketItems, event, 3)).toBe(null);
    });
});

// Tests pour serializeBasketItemsToJson
describe('serializeBasketItemsToJson', () => {
    it('devrait retourner une représentation JSON correcte des items du panier', () => {
        const event = { id: 1, name: 'Concert', ticketPrice: 50 };
        const basketItem = new BasketItem(event, 2);
        const basketItems = [basketItem];
        const serializedItems = serializeBasketItemsToJson(basketItems);
        expect(serializedItems).toEqual([{ ...basketItem }]);
    });
});