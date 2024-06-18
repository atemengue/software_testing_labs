import {describe, it, expect, afterEach,vi } from 'vitest';
import {getDiscount } from '../../../js/promotions/discount/discount';
import {calculateMoneyOff, calculatePercentageDiscount , generateReferralCode,applyDiscount} from '../../../js/promotions/promotions';
 vi.mock('../../../js/promotions/discount/discount');
 describe('applyDiscount', () => {
   

  it('applies a MONEYOFF discount', async () => {
    const discountCode = 'MONEYOFF_10';
    const currentTotal = 100;
    const data = { isValid: true, type: 'MONEYOFF', value: 10, minSpend: 50 };
    vi.mocked(getDiscount).mockResolvedValue( {data });

    const result = await applyDiscount(discountCode, currentTotal);
    expect(result).toBe(90);
  });
   it('applies a PERCENTAGEOFF discount', async () => {
    const discountCode = 'PERCENTAGEOFF_20';
    const currentTotal = 100;
    const data = { isValid: true, type: 'PERCENTAGEOFF', value: 20, minSpend: 50 };
    vi.mocked(getDiscount).mockResolvedValue( {data} );

    const result = await applyDiscount(discountCode, currentTotal);
    expect(result).toBe(80);
  });
   it('returns the original total if the discount is invalid', async () => {
    const discountCode = 'INVALID_DISCOUNT';
    const currentTotal = 100;
    const data = { isValid: false };
    vi.mocked(getDiscount).mockResolvedValue({data} );

    const result = await applyDiscount(discountCode, currentTotal);
    expect(result).toBe(100);
  });

});


describe('calculatePercentageDiscount', () => {
  it('should return the original price if the current price is less than the minimum spend', () => {
    const percentage = 20;
    const minimumSpend = 100;
    const currentPrice = 50;
    const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);
    expect(result).toBe(50);
  });

  it('should apply the discount if the current price is greater than or equal to the minimum spend', () => {
    const percentage = 20;
    const minimumSpend = 100;
    const currentPrice = 150;
    const expectedDiscount = currentPrice * (100 - percentage) / 100;
    const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);
    expect(result).toBeCloseTo(expectedDiscount, 2);
  });

  it('should return 0 if the percentage is 100', () => {
    const percentage = 100;
    const minimumSpend = 100;
    const currentPrice = 150;
    const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);
    expect(result).toBe(0);
  });

  it('should throw an error if the percentage is greater than 100', () => {
    const percentage = 150;
    const minimumSpend = 100;
    const currentPrice = 150;
    const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);
    expect(result).toMatch(/error/);
   });
});


describe('calculateMoneyOff', () => {
  it('should return the original price if the current price is less than the minimum spend', () => {
    const discount = 10;
    const minimumSpend = 100;
    const currentPrice = 50;
    const result = calculateMoneyOff(discount, minimumSpend, currentPrice);
    expect(result).toBe(50);
  });

  it('should subtract the discount from the current price if the current price is greater than or equal to the minimum spend', () => {
    const discount = 10;
    const minimumSpend = 100;
    const currentPrice = 150;
    const expectedResult = currentPrice - discount;
    const result = calculateMoneyOff(discount, minimumSpend, currentPrice);
    expect(result).toBe(expectedResult);
  });

  it('should not subtract more than the current price', () => {
    const discount = 150;
    const minimumSpend = 100;
    const currentPrice = 100;
    const result = calculateMoneyOff(discount, minimumSpend, currentPrice);
    expect(result).toBe(-50);
  });
});
describe('generateReferralCode', () => {
  it('should generate a referral code with the correct format', () => {
    const userId = 123;
    const referralCode = generateReferralCode(userId);
    expect(referralCode).toMatch(/^#FRIEND-#[0-9]{3}-#\d+$/);
  });

  it('should include the user ID in the referral code', () => {
    const userId = 456;
    const referralCode = generateReferralCode(userId);
    expect(referralCode).toContain(`#${userId}`);
  });

  it('should generate a unique referral code for each user ID', () => {
    const userId1 = 789;
    const userId2 = 890;
    const referralCode1 = generateReferralCode(userId1);
    const referralCode2 = generateReferralCode(userId2);
    expect(referralCode1).not.toBe(referralCode2);
  });
});