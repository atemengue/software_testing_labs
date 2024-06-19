import { vi } from 'vitest';
import { Purchase } from '../../../../../js/users/account/account';

const purchaseHistory = {
    getPurchaseHistory: vi.fn(() => ({
        readyState: 4,
        onreadystatechange: null,
        response: {
            events: [
                {
                    name: "Punk Goes Pop - 90s",
                    tickets: 2,
                    price: 40.00,
                },
                {
                    name: "Adventures Live!",
                    tickets: 5,
                    price: 120.00,
                },
                {
                    name: "Folk dance party!",
                    tickets: 3,
                    price: 75.00,
                }
            ],
        }
    })),
    parsePurchaseResponse: vi.fn((purchaseData) => {
        const purchases = [];
        for (const purchase of purchaseData) {
            purchases.push(
                new Purchase(purchase.name, purchase.tickets, purchase.price)
            );
        }
        return purchases;
    })
};

export default purchaseHistory;
