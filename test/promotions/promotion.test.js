import { describe, it, expect, vi } from 'vitest';
import { calculatePercentageDiscount,calculateMoneyOff, calculatePercentageDiscount, applyDiscount, generateReferralCode } from './../../js/promotions/promotions';
import {getDiscount} from './../../js/promotions/discount/discount';

vi.mock("./../../js/promotions/discount/discount");




describe('calculatePercentageDiscount', () => {
  const testCases = [
    { percentage: 20, minimumSpend: 100, currentPrice: 150, expected: 120 },
    { percentage: 20, minimumSpend: 100, currentPrice: 80, expected: 80 },
    { percentage: 0, minimumSpend: 100, currentPrice: 150, expected: 150 },
    { percentage: 100, minimumSpend: 100, currentPrice: 150, expected: 0 },
    { percentage: 20, minimumSpend: 100, currentPrice: 100, expected: 80 },
  ];

  it.each(testCases)(
    'calculer le pourcentage de rabais pour pourcenage : $percentage, minimumSpend: $minimumSpend, currentPrice: $currentPrice',
    ({ percentage, minimumSpend, currentPrice, expected }) => {
      const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);
      expect(result).toBe(expected);
    }
  );
});



describe('calculateMoneyOff', () => {
    const testCases = [
      { discount: 20, minimumSpend: 100, currentPrice: 150, expected: 130 },
      { discount: 20, minimumSpend: 100, currentPrice: 80, expected: 80 },
      { discount: 0, minimumSpend: 100, currentPrice: 150, expected: 150 },
      { discount: 150, minimumSpend: 100, currentPrice: 150, expected: 0 },
      { discount: 20, minimumSpend: 100, currentPrice: 100, expected: 80 },
    ];
  
    it.each(testCases)(
      'Calculer le bon montant pour  discount: $discount, minimumSpend: $minimumSpend, currentPrice: $currentPrice',
      ({ discount, minimumSpend, currentPrice, expected }) => {
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);
        expect(result).toBe(expected);
      }
    );
  });



  describe('generateReferralCode', () => {
    it('générer un referal code avec le format correct', () => {
        const userId = 'user123';
        const referralCode = generateReferralCode(userId);

        expect(referralCode.startsWith('#FRIEND-#')).toBe(true);

        expect(referralCode).toContain(userId);

        const regex = /^#FRIEND-#\w{3}-#\w+$/;
        expect(referralCode).toMatch(regex);
    });
  });
  



  describe('applyDiscount', () => {
    it('should apply MONEYOFF discount correctly', async () => {
        const discountCode = 'VALID_MONEYOFF';
        const currentTotal = 100;

        vi.mocked(getDiscount).mockResolvedValue({
            data: {
                isValid: true,
                type: 'MONEYOFF',
                value: 20,
                minSpend: 50,
            },
        });

        const discountedTotal = await applyDiscount(discountCode, currentTotal);

        expect(discountedTotal).toBe(80);
    });

    it('should apply PERCENTAGEOFF discount correctly', async () => {
        const discountCode = 'VALID_PERCENTAGEOFF';
        const currentTotal = 100;

        vi.mocked(getDiscount).mockResolvedValue({
            data: {
                isValid: true,
                type: 'PERCENTAGEOFF',
                value: 30,
                minSpend: 50,
            },
        });

        const discountedTotal = await applyDiscount(discountCode, currentTotal);

        expect(discountedTotal).toBe(70);
    });

    it('should return currentTotal when discount is not valid', async () => {
        const discountCode = 'INVALID_DISCOUNT';
        const currentTotal = 100;

        vi.mocked(getDiscount).mockResolvedValue({
            data: {
                isValid: false,
            },
        });

        const discountedTotal = await applyDiscount(discountCode, currentTotal);

        expect(discountedTotal).toBe(100);
    });
});
