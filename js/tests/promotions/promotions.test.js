import { describe, it, expect } from 'vitest';
import { applyDiscount, calculatePercentageDiscount, calculateMoneyOff, generateReferralCode } from "../../promotions/promotions";

// Test de la fonction calculatePercentageDiscount
describe('calculatePercentageDiscount', () => {
  it('should calculate correct discount', () => {
    // 20% de réduction sur 100 (doit être égal à 80)
    expect(calculatePercentageDiscount(20, 50, 100)).toBe(80);

    // 10% de réduction sur 40 (doit être égal à 36)
    expect(calculatePercentageDiscount(10, 50, 40)).toBe(36);

    // Pas de réduction car le prix actuel est inférieur au minimum de 100 (doit être égal à 80)
    expect(calculatePercentageDiscount(15, 100, 80)).toBe(80);
  });
});

// Test de la fonction calculateMoneyOff
describe('calculateMoneyOff', () => {
  it('should calculate correct discount', () => {
    expect(calculateMoneyOff(10, 50, 100)).toBe(90); // 10$ de réduction sur 100
    expect(calculateMoneyOff(5, 50, 40)).toBe(40); // 5$ de réduction sur 40
    expect(calculateMoneyOff(20, 100, 80)).toBe(80); // Pas de réduction car inférieur au minimum de 100
  });
});

// Test de la fonction generateReferralCode
describe('generateReferralCode', () => {
  it('should generate a referral code', () => {
    const userId = "user123";
    const referralCode = generateReferralCode(userId);
    expect(typeof referralCode).toBe("string");
    expect(referralCode.split("-").length).toBe(3); // Vérifie le format du code généré
  });
});

// Mock de la fonction getDiscount pour les tests de applyDiscount
class MockDiscountProvider {
  async getDiscount(code) {
    if (code === "CODE123") {
      return { data: { isValid: true, type: "PERCENTAGEOFF", value: 20, minSpend: 50 } };
    } else {
      return { data: { isValid: false } };
    }
  }
}

// Remplacement de la fonction getDiscount par le mock
const mockDiscountProvider = new MockDiscountProvider();

// Test de la fonction applyDiscount avec un mock de getDiscount
describe('applyDiscount', () => {
  it('should apply discount correctly', async () => {
    const currentTotal = 100;
    const discountedTotal = await applyDiscount("CODE123", currentTotal, mockDiscountProvider);
    expect(discountedTotal).toBe(80); // 20% de réduction sur 100
  });

  it('should return current total when discount code is invalid', async () => {
    const currentTotal = 100;
    const discountedTotal = await applyDiscount("INVALIDCODE", currentTotal, mockDiscountProvider);
    expect(discountedTotal).toBe(100); // Aucune réduction appliquée
  });
});
