import { describe, it, expect, vi } from 'vitest';
import { calculatePercentageDiscount, calculateMoneyOff, generateReferralCode, applyDiscount } from '../../js/promotions/promotions'; 
import { getDiscount } from '../../js/promotions/discount/discount'; 

// Mock the getDiscount function
vi.mock('../../js/promotions/discount/discount', () => ({
  getDiscount: vi.fn(),
}));

describe('calculatePercentageDiscount', () => {
  it('should apply percentage discount if currentPrice is above minimumSpend', () => {
    const result = calculatePercentageDiscount(10, 100, 150);
    expect(result).toBe(135);
  });

  it('should not apply percentage discount if currentPrice is below minimumSpend', () => {
    const result = calculatePercentageDiscount(10, 100, 90);
    expect(result).toBe(90);
  });
});

describe('calculateMoneyOff', () => {
  it('should apply money off discount if currentPrice is above minimumSpend', () => {
    const result = calculateMoneyOff(20, 100, 150);
    expect(result).toBe(130);
  });

  it('should not apply money off discount if currentPrice is below minimumSpend', () => {
    const result = calculateMoneyOff(20, 100, 90);
    expect(result).toBe(90);
  });
});

describe('generateReferralCode', () => {
  it('should generate a referral code with the userId', () => {
    const userId = '12345';
    const code = generateReferralCode(userId);
    expect(code).toMatch(new RegExp(`#FRIEND-#\\d{3}-#${userId}`));
  });
});

describe('applyDiscount', () => {
  it('should apply MONEYOFF discount if discount code is valid', async () => {
    getDiscount.mockResolvedValue({
      data: {
        isValid: true,
        type: 'MONEYOFF',
        value: 20,
        minSpend: 100,
      }
    });

    const result = await applyDiscount('DISCOUNTCODE', 150);
    expect(result).toBe(130);
  });

  it('should apply PERCENTAGEOFF discount if discount code is valid', async () => {
    getDiscount.mockResolvedValue({
      data: {
        isValid: true,
        type: 'PERCENTAGEOFF',
        value: 10,
        minSpend: 100,
      }
    });

    const result = await applyDiscount('DISCOUNTCODE', 150);
    expect(result).toBe(135);
  });

  it('should return the original total if discount code is invalid', async () => {
    getDiscount.mockResolvedValue({
      data: {
        isValid: false,
      }
    });

    const result = await applyDiscount('INVALIDCODE', 150);
    expect(result).toBe(150);
  });
});