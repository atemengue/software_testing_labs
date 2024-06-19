// discount.test.js

import { calculatePercentageDiscount, calculateMoneyOff, generateReferralCode, applyDiscount } from './discount';

jest.mock('./discount/discount', () => ({
    getDiscount: jest.fn().mockResolvedValue({ data: { isValid: true, type: 'PERCENTAGEOFF', value: 10, minSpend: 50 } })
}));

describe('Discount Module Tests', () => {
    test('calculatePercentageDiscount - Valid Percentage Discount Calculation', () => {
        const result = calculatePercentageDiscount(10, 50, 100);
        expect(result).toBe(90);
    });

    test('calculatePercentageDiscount - No Discount Applied', () => {
        const result = calculatePercentageDiscount(10, 100, 50);
        expect(result).toBe(50);
    });

    test('calculateMoneyOff - Valid Money Off Calculation', () => {
        const result = calculateMoneyOff(10, 50, 100);
        expect(result).toBe(90);
    });

    test('calculateMoneyOff - No Discount Applied', () => {
        const result = calculateMoneyOff(10, 100, 50);
        expect(result).toBe(50);
    });

    test('generateReferralCode - Generate Referral Code', () => {
        const result = generateReferralCode('user123');
        expect(result).toMatch(/^#FRIEND-#[0-9a-zA-Z]{3}-#user123$/);
    });

    test('applyDiscount - Valid Discount Application - Percentage Off', async () => {
        const result = await applyDiscount('DISCOUNT10', 100);
        expect(result).toBe(90);
    });

    test('applyDiscount - Invalid Discount Code', async () => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
        const invalidDiscountCode = 'INVALIDCODE';
        const result = await applyDiscount(invalidDiscountCode, 100);
        expect(result).toBe(100); // Current total remains unchanged for invalid code
        expect(console.error).toHaveBeenCalledWith(`Error fetching discount for code: ${invalidDiscountCode}`);
    });

    // Add more test cases as per the test plan
});
