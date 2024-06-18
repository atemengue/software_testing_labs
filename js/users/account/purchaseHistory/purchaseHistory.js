import { Purchase } from '../account';
import { BASE_URL } from './__mocks__/config';// Correction ajoutée

export function getPurchaseHistory(userId) {
    const url = new URL(`${BASE_URL}/account/orders/history`);// Correction ajoutée
    url.searchParams.append("userId", userId);

    const request = new XMLHttpRequest();
    request.open("GET", url.toString());
    request.send();// Correction ajoutée

    return request;
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