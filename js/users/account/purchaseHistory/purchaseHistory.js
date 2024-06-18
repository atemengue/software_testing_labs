import { Purchase } from '../account';

export function getPurchaseHistory(userId) {
    const url = new URL("/account/orders/history ", BASE_URL);
    url.searchParams.append("userId", userId);

    const request = new XMLHttpRequest()
    request.open("GET", url.toString())

    return request
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