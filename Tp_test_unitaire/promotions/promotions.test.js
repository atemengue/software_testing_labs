import { describe, it, expect, vi, test } from 'vitest';
import { calculatePercentageDiscount } from './promotions';
vi.mock('./discount/discount');

// Définit un groupe de tests pour la fonction calculatePercentageDiscount
describe("calculatePercentageDiscount function", () => {
  test("retourne la réduction correcte pour un prix actuel décimal", () => {
    const percentage = 10;
    const minimumSpend = 100;
    const currentPrice = 150.50;

    const expectedResult = 150.50 * (90 / 100);

    expect(calculatePercentageDiscount(percentage, minimumSpend, currentPrice)).toBeCloseTo(expectedResult, 2);
  });

  test("retourne le prix actuel d'origine lorsque le prix actuel est inférieur au minimumSpend", () => {
    const percentage = 10;
    const minimumSpend = 100;
    const currentPrice = 99.99;

    expect(calculatePercentageDiscount(percentage, minimumSpend, currentPrice)).toBe(currentPrice);
  });

  test("retourne le prix réduit lorsque le prix actuel est égal au minimumSpend", () => {
    const percentage = 10;
    const minimumSpend = 100;
    const currentPrice = 100;

    const expectedResult = 100 * (90 / 100);

    expect(calculatePercentageDiscount(percentage, minimumSpend, currentPrice)).toBeCloseTo(expectedResult, 2);
  });

  test("retourne le prix réduit lorsque le prix actuel est supérieur au minimumSpend et le pourcentage est 0", () => {
    const percentage = 0;
    const minimumSpend = 100;
    const currentPrice = 150.50;

    expect(calculatePercentageDiscount(percentage, minimumSpend, currentPrice)).toBe(currentPrice);
  });

  test("retourne le prix réduit lorsque le prix actuel est supérieur au minimumSpend et le pourcentage est 100", () => {
    const percentage = 100;
    const minimumSpend = 100;
    const currentPrice = 150.50;

    expect(calculatePercentageDiscount(percentage, minimumSpend, currentPrice)).toBe(0);
  });
});