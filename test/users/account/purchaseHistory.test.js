import { describe, it, expect, vi } from "vitest";
import * as purchaseHistory from '../../../js/users/account/purchaseHistory/purchaseHistory';
import axios from "axios";
import { Purchase } from "../../../js/users/account/account";

// Mock axios
vi.mock('axios');

describe('Testing getPurchaseHistory function', () => {
    it('should return purchase history for a valid user ID', async () => {
        const userId = 1;
        const mockResponse = {
            data: {
                events: [
                    {
                        eventName: "Punk Goes Pop - 90s",
                        tickets: 2,
                        price: 40.00,
                    },
                    {
                        eventName: "Adventures Live!",
                        tickets: 5,
                        price: 120.00,
                    },
                    {
                        eventName: "Folk dance party!",
                        tickets: 3,
                        price: 75.00,
                    }
                ],
            }
        };
        axios.get.mockResolvedValue(mockResponse);

        const history = await purchaseHistory.getPurchaseHistory(userId);
        expect(history.events).toHaveLength(3);
        expect(history.events[0].eventName).toBe("Punk Goes Pop - 90s");
    });

    it('should parse purchase response correctly', () => {
        const purchaseData = [
            { event: "Concert A", tickets: 2, price: 100 },
            { event: "Concert B", tickets: 1, price: 50 }
        ];
        const parsedData = purchaseHistory.parsePurchaseResponse(purchaseData);
        expect(parsedData).toHaveLength(2);
        expect(parsedData[0]).toBeInstanceOf(Purchase);
        expect(parsedData[0].eventName).toBe("Concert A");
        expect(parsedData[0].tickets).toBe(2);
        expect(parsedData[0].cost).toBe(100);
    });
});