import {
    calculatePercentageDiscount,
    calculateMoneyOff,
    generateReferralCode,
    applyDiscount
} from "./promotions";
import { getDiscount } from "./discount/discount";

// Mock the getDiscount function
jest.mock("./discount/discount");

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

        test('does not apply invalid discount', async () => {
            getDiscount.mockResolvedValue({
                data: { isValid: false }
            });
            const newTotal = await applyDiscount("INVALIDCODE", 100);
            expect(newTotal).toBe(100);
        });
    });
});
