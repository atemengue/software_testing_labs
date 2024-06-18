import { describe,it,test,vi ,expect} from 'vitest';
import { getPurchaseHistory ,parsePurchaseResponse} from './purchaseHistory';
import { Purchase } from '../account';
import * as purchaseHistory from './purchaseHistory';


describe('getPurchaseHistory', () => {
  it('should return a XMLHttpRequest object', () => {
    const userId = 'user123';
    const request = getPurchaseHistory(userId);
    expect(request).toBeInstanceOf(XMLHttpRequest);
    expect(request.open).toHaveBeenCalledWith('GET', '/account/orders/history?userId=user123');
  });
});


describe('parsePurchaseResponse', () => {
  it('should return an array of Purchase objects', () => {
    const purchaseData = [
      {
        event: 'Punk Goes Pop - 90s',
        tickets: 2,
        price: 40.00,
      },
      {
        event: 'Adventures Live!',
        tickets: 5,
        price: 120.00,
      },
      {
        event: 'Folk dance party!',
        tickets: 3,
        price: 75.00,
      },
    ];

    const purchases = parsePurchaseResponse(purchaseData);
    expect(purchases).toBeInstanceOf(Array);
    expect(purchases).toHaveLength(3);

    for (const purchase of purchases) {
      expect(purchase).toBeInstanceOf(Purchase);
      expect(purchase).toHaveProperty('eventName', expect.any(String));
      expect(purchase).toHaveProperty('tickets', expect.any(Number));
      expect(purchase).toHaveProperty('cost', expect.any(Number));
      expect(purchases[0]).toEqual(new Purchase('Punk Goes Pop - 90s', 2, 40.00));
      expect(purchases[1]).toEqual(new Purchase('Adventures Live!', 5, 120.00));
      expect(purchases[2]).toEqual(new Purchase('Folk dance party!', 3, 75.00));
    }
  });
});

describe('_getPurchaseHistory', () => {
  it('should return a response object with the correct structure', () => {
    const response = purchaseHistory.getPurchaseHistory();

    expect(response).toHaveProperty('readyState', 4);
    expect(response).toHaveProperty('onreadystatechange', null);
    expect(response).toHaveProperty('response');
    expect(response.response).toHaveProperty('events');
    expect(response.response.events).toBeInstanceOf(Array);
    expect(response.response.events).toHaveLength(3);
  });

  it('should return the correct event data', () => {
    const response = purchaseHistory.getPurchaseHistory();
    const events = response.response.events;

    expect(events[0]).toEqual({
      name: 'Punk Goes Pop - 90s',
      tickets: 2,
      price: 40.00,
    });
    expect(events[1]).toEqual({
      name: 'Adventures Live!',
      tickets: 5,
      price: 120.00,
    });
    expect(events[2]).toEqual({
      name: 'Folk dance party!',
      tickets: 3,
      price: 75.00,
    });
  });
});