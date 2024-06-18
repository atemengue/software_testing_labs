import { describe, it, expect, vi } from 'vitest';
import { 
  calculatePercentageDiscount, 
  calculateMoneyOff, 
  generateReferralCode, 
  applyDiscount 
} from '../../js/promotions/promotions';
import { getDiscount } from '../../js/promotions/discount/discount';

vi.mock('../../js/promotions/discount/discount');

// CalcultatePercentageDiscount Function Test
describe('CalcultatePercentageDiscount Function', () => {
  // Test case 1
  it('Should return the the result of currentPrice * (discount / 100) if the currentPrice is greather than minimum spend', () => {
    const percentage = 20;
    const minimumSpend = 50;
    const currentPrice = 100;

    const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

    expect(result).toBe(80);
  });

  // Test case 2
  it('Should return a current Price if the current price is lower than minimum spend', () => {
    const percentage = 20;
    const minimumSpend = 50;
    const currentPrice = 40;

    const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

    expect(result).toBe(40);
  });
});

// CalculateReferralCode Function test
describe('CalculateMoneyOff Function', () => {
  // Test case 1
  it('Should return the difference of currentPrice and discount if the currentPrice if greather than minimumSpend', () => {
    // Arrange
    const discount = 20;
    const minimumSpend = 50;
    const currentPrice = 100;

    // Act
    const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

    // Assert
    expect(result).toBe(80);
  });

  it('Should return the currentPrice if the currentPrice if lower than minimumSpend', () => {
    // Arrange
    const discount = 20;
    const minimumSpend = 50;
    const currentPrice = 40;

    // Act
    const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

    // Assert
    expect(result).toBe(40);
  });
});

// GenerateReferralCode Function Test
describe('generateReferralCode Function', () => {
  it('Should generate the referral code which match FRIEND', () => {
    // Arrange
    const userId = 123;

    // Act
    const result = generateReferralCode(userId);

    // Assert
    expect(result).toMatch(/#FRIEND-#\d{3}-#123/);
  });
});

describe('applyDiscount Function', () => {
 
  it('Should return the calculateMoneyOff if data is valid and the data type is MONEYOFF', async () => {
    // Arrange
    const discountCode = 'DISCOUNT10';
    const currentTotal = 100;
    const mockData = {
      isValid: true,
      type: 'PERCENTAGEOFF',
      value: 10,
      minSpend: 50,
    };

    vi.mocked(getDiscount).mockResolvedValue({ data: mockData });

    // Act
    const result = await applyDiscount(discountCode, currentTotal);

    // Assert
    expect(getDiscount).toHaveBeenCalledWith(discountCode);
    expect(result).toBe(90);
  });

  it('Should return the calculatePercentageDiscount if data is valid and the data type is PERCENTAGEOFF', async () => {
    // Arrange
    const discountCode = 'INVALIDCODE';
    const currentTotal = 100;
    const mockData = {
      isValid: false,
    };

    vi.mocked(getDiscount).mockResolvedValue({ data: mockData });

    // Act
    const result = await applyDiscount(discountCode, currentTotal);

    // Assert
    expect(getDiscount).toHaveBeenCalledWith(discountCode);
    expect(result).toBe(100);
  });

  it('Should return the current total if the data are invalid', async () => {
    // Arrange
    const discountCode = 'DISCOUNT10';
    const currentTotal = 100;
    const mockData = {
      isValid: true,
      type: 'MONEYOFF',
      value: 10,
      minSpend: 50,
    };

    vi.mocked(getDiscount).mockResolvedValue({ data: mockData });

    // Act
    const result = await applyDiscount(discountCode, currentTotal);

    // Assert
    expect(getDiscount).toHaveBeenCalledWith(discountCode);
    expect(result).toBe(90);
  });
});