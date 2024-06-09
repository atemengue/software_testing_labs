import {
    calculatePercentageDiscount,
    calculateMoneyOff,
    generateReferralCode,
    applyDiscount
} from './promotions';
import { getDiscount } from './discount/discount';

// Mock the getDiscount function
jest.mock('./discount/discount', () => ({
    getDiscount: jest.fn(),
}));

describe('Promotion Functions', () => {
    test('calculatePercentageDiscount with sufficient spend', () => {
        expect(calculatePercentageDiscount(10, 50, 100)).toBe(90);
    });

    test('calculatePercentageDiscount with insufficient spend', () => {
        expect(calculatePercentageDiscount(10, 50, 40)).toBe(40);
    });

    test('calculateMoneyOff with sufficient spend', () => {
        expect(calculateMoneyOff(10, 50, 100)).toBe(90);
    });

    test('calculateMoneyOff with insufficient spend', () => {
        expect(calculateMoneyOff(10, 50, 40)).toBe(40);
    });

    test('generateReferralCode generates correct format', () => {
        const userId = '12345';
        const code = generateReferralCode(userId);
        expect(code).toMatch(new RegExp(`#FRIEND-#\\d{3}-#${userId}`));
    });

    test('applyDiscount with valid MONEYOFF discount', async () => {
        getDiscount.mockResolvedValue({ data: { isValid: true, type: 'MONEYOFF', value: 10, minSpend: 50 } });
        const result = await applyDiscount('DISCOUNT10', 100);
        expect(result).toBe(90);
    });

    test('applyDiscount with valid PERCENTAGEOFF discount', async () => {
        getDiscount.mockResolvedValue({ data: { isValid: true, type: 'PERCENTAGEOFF', value: 10, minSpend: 50 } });
        const result = await applyDiscount('DISCOUNT10', 100);
        expect(result).toBe(90);
    });

    test('applyDiscount with invalid discount', async () => {
        getDiscount.mockResolvedValue({ data: { isValid: false } });
        const result = await applyDiscount('INVALID', 100);
        expect(result).toBe(100);
    });

    test('applyDiscount with insufficient spend', async () => {
        getDiscount.mockResolvedValue({ data: { isValid: true, type: 'MONEYOFF', value: 10, minSpend: 150 } });
        const result = await applyDiscount('DISCOUNT10', 100);
        expect(result).toBe(100);
    });
});
