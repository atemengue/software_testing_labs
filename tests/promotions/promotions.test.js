import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import {
    calculatePercentageDiscount,
    calculateMoneyOff,
    generateReferralCode,
    applyDiscount,
} from '../../js/promotions/promotions';

describe('Discount Functions', () => {
    describe('calculatePercentageDiscount', () => {
        it('should apply the percentage discount if current price is above the minimum spend', () => {
            const result = calculatePercentageDiscount(10, 50, 100);
            expect(result).toBe(90); // 10% off of 100 is 90
        });

        it('should not apply the percentage discount if current price is below the minimum spend', () => {
            const result = calculatePercentageDiscount(10, 50, 40);
            expect(result).toBe(40);
        });
    });

    describe('calculateMoneyOff', () => {
        it('should apply the money off discount if current price is above the minimum spend', () => {
            const result = calculateMoneyOff(10, 50, 100);
            expect(result).toBe(90); // 10 off of 100 is 90
        });

        it('should not apply the money off discount if current price is below the minimum spend', () => {
            const result = calculateMoneyOff(10, 50, 40);
            expect(result).toBe(40);
        });
    });

    describe('generateReferralCode', () => {
        it('should generate a referral code based on the user ID', () => {
            const userId = 'user123';
            const code = generateReferralCode(userId);
            expect(code).toMatch(new RegExp(`#FRIEND-#\\d{3}-#${userId}`));
        });
    });

    describe('applyDiscount', () => {
        it('should apply MONEYOFF discount correctly', async () => {
            const discountCode = 'MONEYOFF123';
            const currentTotal = 100;
            const mockResponse = {
                data: {
                    isValid: true,
                    type: 'MONEYOFF',
                    value: 10,
                    minSpend: 50,
                },
            };

            vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

            const result = await applyDiscount(discountCode, currentTotal);
            expect(result).toBe(90);
        });

        it('should apply PERCENTAGEOFF discount correctly', async () => {
            const discountCode = 'PERCENTAGEOFF123';
            const currentTotal = 100;
            const mockResponse = {
                data: {
                    isValid: true,
                    type: 'PERCENTAGEOFF',
                    value: 10,
                    minSpend: 50,
                },
            };

            vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

            const result = await applyDiscount(discountCode, currentTotal);
            expect(result).toBe(90);
        });

        it('should not apply discount if discount code is invalid', async () => {
            const discountCode = 'INVALIDCODE';
            const currentTotal = 100;
            const mockResponse = {
                data: {
                    isValid: false,
                },
            };

            vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

            const result = await applyDiscount(discountCode, currentTotal);
            expect(result).toBe(currentTotal);
        });

        it('should return current total if discount type is not recognized', async () => {
            const discountCode = 'UNKNOWNDISCOUNT';
            const currentTotal = 100;
            const mockResponse = {
                data: {
                    isValid: true,
                    type: 'UNKNOWN',
                },
            };

            vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

            const result = await applyDiscount(discountCode, currentTotal);
            expect(result).toBe(currentTotal);
        });
    });
});
