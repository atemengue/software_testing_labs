import { describe, it, expect, vi } from 'vitest';
import { calculatePercentageDiscount, calculateMoneyOff, generateReferralCode, applyDiscount } from '../../js/promotions/promotions';
import { getDiscount } from '../../js/promotions/discount/discount';

// Mock the getDiscount function
vi.mock('../../js/promotions/discount/discount', () => ({
  getDiscount: vi.fn(),
}));

describe('calculatePercentageDiscount', () => {
  it('should return discounted price when currentPrice is above minimumSpend', () => {
    const result = calculatePercentageDiscount(20, 100, 150);
    expect(result).toBe(120);
  });

  it('should return original price when currentPrice is below minimumSpend', () => {
    const result = calculatePercentageDiscount(20, 100, 80);
    expect(result).toBe(80);
  });
});

describe('calculateMoneyOff', () => {
  it('should return price after money off when currentPrice is above minimumSpend', () => {
    const result = calculateMoneyOff(30, 100, 150);
    expect(result).toBe(120);
  });

  it('should return original price when currentPrice is below minimumSpend', () => {
    const result = calculateMoneyOff(30, 100, 80);
    expect(result).toBe(80);
  });
});

describe('generateReferralCode', () => {
  it('should generate a referral code containing the userId', () => {
    const userId = '12345';
    const code = generateReferralCode(userId);
    expect(code).toMatch(new RegExp(`#FRIEND-#\\d{3}-#${userId}`));
  });
});

describe('applyDiscount', () => {
  it('should apply money off discount when discount type is MONEYOFF', async () => {
    getDiscount.mockResolvedValue({
      data: { isValid: true, type: 'MONEYOFF', value: 20, minSpend: 100 },
    });
    const result = await applyDiscount('DISCOUNT20', 150);
    expect(result).toBe(130);
  });

  it('should apply percentage off discount when discount type is PERCENTAGEOFF', async () => {
    getDiscount.mockResolvedValue({
      data: { isValid: true, type: 'PERCENTAGEOFF', value: 20, minSpend: 100 },
    });
    const result = await applyDiscount('DISCOUNT20', 150);
    expect(result).toBe(120);
  });

  it('should return original price when discount is not valid', async () => {
    getDiscount.mockResolvedValue({ data: { isValid: false } });
    const result = await applyDiscount('INVALIDCODE', 150);
    expect(result).toBe(150);
  });

  it('should return original price when discount type is unknown', async () => {
    getDiscount.mockResolvedValue({
      data: { isValid: true, type: 'UNKNOWN', value: 20, minSpend: 100 },
    });
    const result = await applyDiscount('DISCOUNT20', 150);
    expect(result).toBe(150);
  });
});
