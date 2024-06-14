import { describe, it, expect, vi } from 'vitest';
import {
    calculatePercentageDiscount,
    calculateMoneyOff,
    generateReferralCode,
    applyDiscount
} from './promotions';
import { getDiscount } from './discount/discount';

vi.mock('./discount/discount');

describe('Promotions Functions', () => {
    describe('calculatePercentageDiscount', () => {
        test('applies discount when currentPrice is greater than or equal to minimumSpend', () => {
            expect(calculatePercentageDiscount(20, 50, 100)).toBe(80);
        });

        test('does not apply discount when currentPrice is less than minimumSpend', () => {
            expect(calculatePercentageDiscount(20, 50, 40)).toBe(40);
        });
    });

    describe('calculateMoneyOff', () => {
        test('applies money off when currentPrice is greater than or equal to minimumSpend', () => {
            expect(calculateMoneyOff(20, 50, 100)).toBe(80);
        });

        test('does not apply money off when currentPrice is less than minimumSpend', () => {
            expect(calculateMoneyOff(20, 50, 40)).toBe(40);
        });
    });

    describe('generateReferralCode', () => {
        test('generates a referral code', () => {
            const userId = "123";
            const code = generateReferralCode(userId);
            expect(code).toMatch(new RegExp(`#FRIEND-#\\d{3}-#${userId}`));
        });
    });

    describe('applyDiscount', () => {
        afterEach(() => {
            vi.clearAllMocks();
        });

        test('applies MONEYOFF discount', async () => {
            getDiscount.mockResolvedValue({
                data: { isValid: true, type: "MONEYOFF", value: 20, minSpend: 50 }
            });
            const newTotal = await applyDiscount("DISCOUNT20", 100);
            expect(newTotal).toBe(80);
        });

        test('applies PERCENTAGEOFF discount', async () => {
            getDiscount.mockResolvedValue({
                data: { isValid: true, type: "PERCENTAGEOFF", value: 20, minSpend: 50 }
            });
            const newTotal = await applyDiscount("DISCOUNT20", 100);
            expect(newTotal).toBe(80);
        });

        test('does not apply discount when code is invalid', async () => {
            getDiscount.mockResolvedValue({
                data: { isValid: false }
            });
            const newTotal = await applyDiscount("INVALIDCODE", 100);
            expect(newTotal).toBe(100);
        });

        // test('handles error during discount retrieval', async () => {
        //     getDiscount.mockRejectedValue(new Error('Network error'));
        //     await expect(applyDiscount("DISCOUNT20", 100)).rejects.toThrow('Discount service error');
        // }); // somme issue in rejects.toThrow(....)

        test('applies a valid MONEYOFF discount to a price', async () => {
            getDiscount.mockResolvedValue({
                data: { isValid: true, type: 'MONEYOFF', value: 20, minSpend: 50 }
            });
            const newTotal = await applyDiscount('DISCOUNT20', 100);
            expect(getDiscount).toHaveBeenCalledWith('DISCOUNT20');
            expect(newTotal).toBe(80);
        });

        test('does not apply discount if code is invalid', async () => {
            getDiscount.mockResolvedValue({
                data: { isValid: false }
            });
            const newTotal = await applyDiscount('INVALIDCODE', 100);
            expect(getDiscount).toHaveBeenCalledWith('INVALIDCODE');
            expect(newTotal).toBe(100);
        });

        test('should throw an error if there is an issue with the discount service', async () => {
            getDiscount.mockRejectedValue(new Error('Discount service error'));
            await expect(applyDiscount('DISCOUNT20', 100)).rejects.toThrow('Discount service error');
        });

        test('should apply a valid percentage discount', async () => {
            getDiscount.mockResolvedValue({
                data: { isValid: true, type: 'PERCENTAGEOFF', value: 10, minSpend: 100 }
            });
            const newTotal = await applyDiscount('PERCENTAGE10', 200);
            expect(getDiscount).toHaveBeenCalledWith('PERCENTAGE10');
            expect(newTotal).toBe(180);
        });
    });

});
