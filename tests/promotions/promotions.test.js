import { describe, it, expect, vi } from 'vitest';
import { 
  calculatePercentageDiscount, 
  calculateMoneyOff, 
  generateReferralCode, 
  applyDiscount 
} from '../../js/promotions/promotions';
import { getDiscount } from '../../js/promotions/discount/discount';

vi.mock('../../js/promotions/discount/discount');

describe('calculatePercentageDiscount', () => {
  it('calculatePercentageDiscount_AvecPrixSupérieurAuMontantMinimum', () => {
    // Arrange
    const percentage = 20;
    const minimumSpend = 50;
    const currentPrice = 100;

    // Act
    const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

    // Assert
    expect(result).toBe(80);
  });

  it('calculatePercentageDiscount_AvecPrixInférieurAuMontantMinimum', () => {
    // Arrange
    const percentage = 20;
    const minimumSpend = 50;
    const currentPrice = 40;

    // Act
    const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

    // Assert
    expect(result).toBe(40);
  });
});

describe('calculateMoneyOff', () => {
  it('calculateMoneyOff_AvecPrixSupérieurAuMontantMinimum', () => {
    // Arrange
    const discount = 20;
    const minimumSpend = 50;
    const currentPrice = 100;

    // Act
    const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

    // Assert
    expect(result).toBe(80);
  });

  it('calculateMoneyOff_AvecPrixInférieurAuMontantMinimum', () => {
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

describe('generateReferralCode', () => {
  it('generateReferralCode_AvecIdUtilisateurValid', () => {
    // Arrange
    const userId = 123;

    // Act
    const result = generateReferralCode(userId);

    // Assert
    expect(result).toMatch(/#FRIEND-#\d{3}-#123/);
  });
});

describe('applyDiscount', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('applyDiscount_AvecCodeDeRemiseValide', async () => {
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

  it('applyDiscount_AvecCodeDeRemiseInvalide', async () => {
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
});