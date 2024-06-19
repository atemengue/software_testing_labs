import {test,expect,describe,vi} from 'vitest'
import { calculatePercentageDiscount,calculateMoneyOff,generateReferralCode,applyDiscount} from '../../js/promotions/promotions';
import { getDiscount } from '../../js/promotions/discount/discount';



vi.mock('../../js/promotions/discount/discount');

  


describe("fonction calculatePercentageDiscount", () => {

    test("doit me retourner currentPrice * (discount / 100) si currentPrice >= minimumSpend", () => {
        expect(calculatePercentageDiscount(20, 100, 200)).toBe(160);
        expect(calculatePercentageDiscount(20, 100, 100)).toBe(80);
    });

    test("doit me retourner currentPrice si currentPrice < minimumSpend", () => {
        expect(calculatePercentageDiscount(20, 200, 100)).toBe(100);
    });
});

describe("fonction calculateMoneyOff", () => {

    test("doit me retourner currentPrice - discoun si currentPrice >= minimumSpend", () => {
        expect(calculateMoneyOff(20, 100, 200)).toBe(180);
        expect(calculateMoneyOff(20, 100, 100)).toBe(80);
    });

    test("doit me retourner currentPrice si currentPrice < minimumSpend", () => {
        expect(calculateMoneyOff(20, 200, 100)).toBe(100);
    });
});

describe("fonction generateReferralCode", () => {
    test("doit me retourner #FRIEND-#${id}-#${userId} peut importe ce qu'on introduit dans la fonction lors de son appel", () => {
        expect(typeof generateReferralCode(100)).toBe("string");
    });
});


describe('fonction applyDiscount', () => {
    test('doit me retourner la valeur de la fonction calculateMoneyOff si le data.type = MONEYOFF', async () => {

      const discountCode = 'SOMECODE';
      const currentTotal = 100;
      const discountData = { isValid: true, value:20, type: 'MONEYOFF', minSpend: 50};
      vi.mocked(getDiscount).mockReturnValue({ data: discountData });
      const result =  await applyDiscount(discountCode, currentTotal);
      console.log(result)
      expect(result).toBe(80);
    });
    test('doit me retourner la valeur de la fonction calculatePercentageDiscount si le data.type = PERCENTAGEOFF', async () => {

      const discountCode = 'SOMECODE';
      const currentTotal = 100;
      const discountData = { isValid: true, value:20, type: 'PERCENTAGEOFF', minSpend: 50};
      vi.mocked(getDiscount).mockReturnValue({ data: discountData });
      const result =  await applyDiscount(discountCode, currentTotal);
      console.log(result)
      expect(result).toBe(80);
    });
    test('doit me retourner currentTotal si data.type n\'est ni MONEYOFF OU PERCENTAGEOFF', async () => {

      const discountCode = 20;
      const currentTotal = 100;
      const discountData = {isValid: true, value:200, type: '', minSpend: 50};
      vi.mocked(getDiscount).mockReturnValue({ data: discountData });
      const result =  await applyDiscount(discountCode, currentTotal);
      expect(result).toBe(100);
    });
    test('doit me retourner currentTotal si data n\'est pas valide', async () => {
      const discountCode = 20;
      const currentTotal = 100;
      const discountData = { };
      vi.mocked(getDiscount).mockReturnValue({ data: discountData });
      const result =  await applyDiscount(discountCode, currentTotal);
      expect(result).toBe(100);
    });
});
