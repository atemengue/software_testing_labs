// Emplacement des fichiers:
// - account.js dans js/users/account/account.js
// - purchaseHistory.js dans js/users/account/purchaseHistory/purchaseHistory.js
// - Tous les tests dans test/users

import { describe, expect, it, vi } from 'vitest';
import { getPurchaseHistory, parsePurchaseResponse } from '../../js/users/account/purchaseHistory/purchaseHistory';
import { Purchase } from '../../js/users/account/account';

const BASE_URL = 'https://api.example.com'; // Remplacez par votre URL de base
const userId = 'user123';
const expectedUrl = `${BASE_URL}/account/orders/history?userId=${userId}`;

// Mock de XMLHttpRequest
global.XMLHttpRequest = vi.fn(() => {
  const xhrMock = {
    open: vi.fn(),
    send: vi.fn(),
    setRequestHeader: vi.fn(),
    readyState: 4,
    responseText: JSON.stringify([]),
    status: 200,
    onreadystatechange: null,
  };

  return xhrMock;
});

describe('Fonctions de compte', () => {
  it("getPurchaseHistory doit construire l'URL correcte et initialiser la requête", () => {
    const xhr = getPurchaseHistory(userId);

    expect(global.XMLHttpRequest).toHaveBeenCalled();
    expect(xhr.open).toHaveBeenCalledWith('GET', expectedUrl);
    expect(xhr.send).toHaveBeenCalled();
  });

  it("parsePurchaseResponse doit correctement analyser les données d'achat", () => {
    const purchaseData = [
      { event: 'Concert A', tickets: 2, price: 100 },
      { event: 'Festival B', tickets: 1, price: 50 },
    ];
    const expectedPurchases = purchaseData.map((data) => new Purchase(data.event, data.tickets, data.price));

    const parsedPurchases = parsePurchaseResponse(purchaseData);

    expect(parsedPurchases).toEqual(expectedPurchases);
  });
});
