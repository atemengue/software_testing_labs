import { Purchase } from '../account';
// Utilisation de la bibliotheque axios a la place de 'XHMLHttpRequest' pour effectuer des requetes HTTP, car elle fonctionne bien dans les environnement node
import axios from 'axios';

// Definition de 'BASE_URL' pour la fonction 'getPurchseHistory'.
const BASE_URL = "https://example.com";

export async function getPurchaseHistory(userId) {
    const url = new URL("/account/orders/history", BASE_URL);
    url.searchParams.append("userId", userId);

    try {
        const response = await axios.get(url.toString());
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch purchase history');
    }
}

export function parsePurchaseResponse(purchaseData) {
    const purchases = [];

    for (const purchase of purchaseData) {
        purchases.push(
            new Purchase(purchase.event, purchase.tickets, purchase.price)
        );
    }

    return purchases;
}