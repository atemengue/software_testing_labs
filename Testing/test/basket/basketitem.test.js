import { describe, it, expect } from 'vitest';
import { BasketItem } from '../../../js/basket/basketitem';

describe('test on BasketItem', () => {
  it('should create an instance with the correct properties', () => {
    const event = { ticketPrice: 50 };
    const ticketCount = 2;
    const basketItem = new BasketItem(event, ticketCount);

    expect(basketItem.event).toBe(event);
    expect(basketItem.ticketCount).toBe(ticketCount);
  });

  it('should calculate the correct price', () => {
    const event = { ticketPrice: 50 };
    const ticketCount = 2;
    const basketItem = new BasketItem(event, ticketCount);

    expect(basketItem.getPrice()).toBe(100);
  });

  it('should return 0 if ticket count is 0', () => {
    const event = { ticketPrice: 50 };
    const ticketCount = 0;
    const basketItem = new BasketItem(event, ticketCount);

    expect(basketItem.getPrice()).toBe(0);
  });
});
