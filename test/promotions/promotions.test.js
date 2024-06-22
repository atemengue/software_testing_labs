// Importer Vitest
import { test, expect, vi } from 'vitest';
// Importer les fonctions à tester
import { calculatePercentageDiscount, calculateMoneyOff, generateReferralCode, applyDiscount } from '../../js/promotions/promotions';
import { getDiscount } from '../../js/promotions/discount/discount';

// Mock pour la fonction getDiscount
vi.mock('../../js/promotions/discount/discount', () => ({
  getDiscount: vi.fn()
}));

// Tests pour calculatePercentageDiscount
test('calculatePercentageDiscount should apply discount if minimum spend is met', () => {
  // Arrange
  const percentage = 20;
  const minimumSpend = 100;
  const currentPrice = 150;

  // Act
  const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

  // Assert
  expect(result).toBe(120); // 20% de 150 est 30, donc 150 - 30 = 120
});

test('calculatePercentageDiscount should not apply discount if minimum spend is not met', () => {
  // Arrange
  const percentage = 20;
  const minimumSpend = 200;
  const currentPrice = 150;

  // Act
  const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

  // Assert
  expect(result).toBe(150); // Pas de réduction car le minimum n'est pas atteint
});

// Tests pour calculateMoneyOff
test('calculateMoneyOff should apply discount if minimum spend is met', () => {
  // Arrange
  const discount = 20;
  const minimumSpend = 100;
  const currentPrice = 150;

  // Act
  const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

  // Assert
  expect(result).toBe(130); // 150 - 20 = 130
});

test('calculateMoneyOff should not apply discount if minimum spend is not met', () => {
  // Arrange
  const discount = 20;
  const minimumSpend = 200;
  const currentPrice = 150;

  // Act
  const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

  // Assert
  expect(result).toBe(150); // Pas de réduction car le minimum n'est pas atteint
});

// Tests pour generateReferralCode
test('generateReferralCode should generate a referral code', () => {
  // Arrange
  const userId = 12345;

  // Act
  const result = generateReferralCode(userId);

  // Assert
  expect(result).toMatch(new RegExp(`#FRIEND-#\\d{3}-#${userId}`));
});

// Tests pour applyDiscount
test('applyDiscount should apply money off discount correctly', async () => {
  // Arrange
  const discountCode = 'SAVE20';
  const currentTotal = 150;
  getDiscount.mockResolvedValue({
    data: {
      isValid: true,
      type: 'MONEYOFF',
      value: 20,
      minSpend: 100
    }
  });

  // Act
  const result = await applyDiscount(discountCode, currentTotal);

  // Assert
  expect(result).toBe(130); // 150 - 20 = 130
});

test('applyDiscount should apply percentage discount correctly', async () => {
  // Arrange
  const discountCode = 'SAVE20';
  const currentTotal = 150;
  getDiscount.mockResolvedValue({
    data: {
      isValid: true,
      type: 'PERCENTAGEOFF',
      value: 20,
      minSpend: 100
    }
  });

  // Act
  const result = await applyDiscount(discountCode, currentTotal);

  // Assert
  expect(result).toBe(120); // 20% de 150 est 30, donc 150 - 30 = 120
});

test('applyDiscount should return current total if discount is invalid', async () => {
  // Arrange
  const discountCode = 'SAVE20';
  const currentTotal = 150;
  getDiscount.mockResolvedValue({
    data: {
      isValid: false,
      type: 'MONEYOFF',
      value: 20,
      minSpend: 100
    }
  });

  // Act
  const result = await applyDiscount(discountCode, currentTotal);

  // Assert
  expect(result).toBe(currentTotal); // Le total reste inchangé car la réduction n'est pas valide
});


/* Tests individuels :

Pour calculatePercentageDiscount et calculateMoneyOff, nous testons à la fois 
les cas où la dépense minimale est atteinte et où elle ne l'est pas.

Pour generateReferralCode, nous vérifions que le code généré correspond au format attendu.

Pour applyDiscount, nous testons l'application des réductions en argent et en pourcentage, 
ainsi que le cas où la réduction est invalide. */