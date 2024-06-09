import { vi } from 'vitest';
const purchaseHistory = vi.mock('../purchaseHistory');

function __getPurchaseHistory() {
    const response = {
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
    }
    return response;
}

purchaseHistory.getPurchaseHistory = __getPurchaseHistory;

export default purchaseHistory;

