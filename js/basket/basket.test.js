import { expect, test } from 'vitest';
import { BasketItem } from "./basketitem";
import {
  calculateTotal,
  showAdverts,
  searchBasket,
  getBasketItem,
  createBasketItem,
  serializeBasketItemsToJson,
} from "./basket";

  test("calculating total with single item in basket", () => {
    const singleItemBasket = [new BasketItem({ ticketPrice: 10 }, 1)];
    expect(calculateTotal(singleItemBasket)).toBe(10);
  });

  test("calculating total with multiple items in basket", () => {
    const multipleItemsBasket = [
      new BasketItem({ ticketPrice: 10 }, 2),
      new BasketItem({ ticketPrice: 20 }, 1),
    ];
    expect(calculateTotal(multipleItemsBasket)).toBe(40);
  });

  test("calculating total with discount", () => {
    const basket = [new BasketItem({ ticketPrice: 20 }, 2), new BasketItem({ ticketPrice: 30 }, 1)];
    expect(calculateTotal(basket, 5)).toBe(65);
  });

  test("calculating total with empty basket", () => {
    const emptyBasket = [];
    expect(calculateTotal(emptyBasket)).toBe(0);
  });

  test("showing adverts for non-premium user", () => {
    const nonPremiumUser = { isPremium: false };
    expect(showAdverts(nonPremiumUser)).toBe(true);
  });

  test("not showing adverts for premium user", () => {
    const premiumUser = { isPremium: true };
    expect(showAdverts(premiumUser)).toBe(false);
  });

  test("searching basket items with valid query", () => {
    const basketItems = [new BasketItem({ name: "Event 1" }), new BasketItem({ name: "Event 2" })];
    expect(searchBasket(basketItems, "Event 1")).toEqual([basketItems[0]]);
  });

  test("searching basket items with invalid query", () => {
    const basketItems = [new BasketItem({ name: "Event 1" }), new BasketItem({ name: "Event 2" })];
    expect(searchBasket(basketItems, "Random Query")).toEqual([]);
  });

  test("retrieving existing basket item", () => {
    const event = { id: 1 };
    const basketItems = [new BasketItem({ id: 1 }), new BasketItem({ id: 2 })];
    expect(getBasketItem(basketItems, event)).toEqual(basketItems[0]);
  });

  test("returning null for non-existing basket item", () => {
    const event = { id: 3 };
    const basketItems = [new BasketItem({ id: 1 }), new BasketItem({ id: 2 })];
    expect(getBasketItem(basketItems, event)).toBeNull();
  });

  test("creating new basket item when it does not exist", () => {
    const event = { id: 1 };
    const basketItems = [new BasketItem({ id: 2 }), new BasketItem({ id: 3 })];
    expect(createBasketItem(basketItems, event, 5)).toEqual(new BasketItem(event, 5));
  });

  test("returning null when item already exists in basket", () => {
    const event = { id: 2 };
    const basketItems = [new BasketItem({ id: 1 }), new BasketItem({ id: 2 })];
    expect(createBasketItem(basketItems, event, 3)).toBeNull();
  });

  test("serializing basket items to JSON format", () => {
    const basketItems = [new BasketItem({ name: "Item1" }, 10), new BasketItem({ name: "Item2" }, 20)];
    const serializedItems = serializeBasketItemsToJson(basketItems);
    expect(serializedItems).toHaveLength(2);
    expect(serializedItems[0].event.name).toBe("Item1");
    expect(serializedItems[1].ticketCount).toBe(20);
  });
