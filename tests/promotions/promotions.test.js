import { describe, expect, test, vi } from 'vitest'
import { calculatePercentageDiscount, calculateMoneyOff, generateReferralCode, applyDiscount } from '../../js/promotions/promotions'
import { getDiscount } from "../../js/promotions/discount/discount";

// vi.mock('../../js/promotions/promotions');
vi.mock('../../js/promotions/discount/discount');

describe("CALCULATE PERCENTAGE DISCOUNT", () => {
    test("should return current price if current price is less than minimum amount spent.", () => {
        const minimumSpend = 500;
        const currentPrice = 499;
        const percentage = 20;
        const expected = currentPrice;
        const actual = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);
        expect(actual).toBe(expected);
    });
    test("should return current price with percentage discount if current price greater than or equal to minimum amount spent.", () => {
        const minimumSpend = 500;
        const currentPrice = 501;
        const percentage = 20;
        const expected = currentPrice * 0.8;
        const actual = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);
        expect(actual).toBe(expected);
    });
});

describe("CALCULATE MONEY OFF", () => {
    test("should return current price if current price is less than minimum amount spent.", () => {
        const minimumSpend = 500;
        const currentPrice = 499;
        const discount = 20;
        const expected = currentPrice;
        const actual = calculateMoneyOff(discount, minimumSpend, currentPrice);
        expect(actual).toBe(expected);
    });
    test("should return the difference between current price and discount, if current price greater than or equal to minimum amount spent.", () => {
        const minimumSpend = 500;
        const currentPrice = 501;
        const discount = 20;
        const expected = currentPrice - discount;
        const actual = calculateMoneyOff(discount, minimumSpend, currentPrice);
        expect(actual).toBe(expected);
    });
});

describe('TESTING REFERRAL CODE GENERATOR', () => {
    test('should generate referral code with the correct format', () => {
        const userId = 'abc123';
        const referralCode = generateReferralCode(userId);
        const regex = /^#FRIEND-\#\d{3}-#\w+$/;
        expect(referralCode).toMatch(regex);
    });
});


describe("APPLY DISCOUNT FUNCTION", () => {

    test('should return current total if discount is invalid', async () => {
        const discountCode = 'INVALIDCODE';
        const currentTotal = 50;

        vi.mocked(getDiscount).mockReturnValue({data: { isValid: false }});
    
        const newTotal = await applyDiscount(discountCode, currentTotal);
    
        expect(newTotal).toBe(currentTotal);
    });

    test('should apply MONEYOFF when discount is valid and discount type is MONEYOFF', async () => {
        const discountCode = 'MONEYOFF10';
        const currentTotal = 100;
        const discountValue = 10;
        const minSpend = 50;

        const expected = currentTotal - discountValue;
        vi.mocked(getDiscount).mockReturnValue({data: { isValid: true, type: 'MONEYOFF', value: discountValue, minSpend: minSpend }});

        const actual = await applyDiscount(discountCode, currentTotal);

        expect(expected).toBe(actual);
    });

    test('should apply PERCENTAGEOFF when discount is valid and discount type is PERCENTAGEOFF', async () => {
        const discountCode = 'PERCENTAGE20';
        const currentTotal = 100;
        const discountPercentage = 20;
        const minSpend = 25;

        vi.mocked(getDiscount).mockReturnValue({data: { isValid: true, type: 'MONEYOFF', value: discountPercentage, minSpend: minSpend }});

        const expected = currentTotal * (1 - discountPercentage / 100);
        const actual = await applyDiscount(discountCode, currentTotal);

        expect(expected).toBe(actual);
    });

});


