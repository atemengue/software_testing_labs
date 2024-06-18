import { Purchase } from '../account';

export async function getPurchaseHistory(userId) {
    const url = new URL("/account/orders/history", BASE_URL);
    url.searchParams.append("userId", userId);
  
    const response = await fetch(url.toString());
    const purchaseData = await response.json();
    return parsePurchaseResponse(purchaseData);
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