import {describe,it,expect,vi} from 'vitest';
import {calculatePercentageDiscount, calculateMoneyOff, generateReferralCode,applyDiscount} from '../../js/promotions/promotions'
import { getDiscount } from '../../js/promotions/discount/discount'

vi.mock('../../js/promotions/discount/discount')

describe("calculatePercentageDiscount",()=>{
    it("should calculate percentage discount if currentPrice greater than minimumSpend",()=>{
        expect(calculatePercentageDiscount(75,4500,5000)).toBe(1250)
    })

    it("should calculate percentage discount if currentPrice equal to minimumSpend",()=>{
        expect(calculatePercentageDiscount(75,5000,5000)).toBe(1250)
    })

    it("should return currentPrice if currentPrice is less than minimumSpend",()=>{
        expect(calculatePercentageDiscount(75,4500,4000)).toBe(4000)
    })

})

describe("calculateMoneyOff",()=>{
    it("should soustract discount if current price is greater than minimumSpend",()=>{
        expect(calculateMoneyOff(800,3000,3500)).toBe(2700)
    })

    it("should soustract discount if current price is equal to minimumSpend",()=>{
        expect(calculateMoneyOff(800,3000,3000)).toBe(2200)
    })

    it("should return current price if currentPrice is less than minimumSpend",()=>{
        expect(calculateMoneyOff(800,4000,3500)).toBe(3500)
    })
})

describe('generateReferralCode', () => {
    it('should generate a valid referral code', () => {
      const userId = 'user123';
      const referralCode = generateReferralCode(userId);
  
      // Vérifier que le code de parrainage a le bon format
      expect(referralCode).toMatch(/#FRIEND-#\d{3}-#user123/);
  
      // Vérifier que l'ID aléatoire a bien 3 chiffres
      const idMatch = referralCode.match(/#FRIEND-#(\d{3})-#/);
      expect(idMatch).not.toBeNull();
      expect(idMatch[1]).toHaveLength(3);
    });
});

describe('appllyDiscount',()=>{
    it("should call getDiscound",async()=>{
        const discountCode = 'SUMMER20';
        const currentTotal = 300;
        

        vi.mocked(getDiscount).mockResolvedValue({ data: { isValid: false } })
        await applyDiscount(discountCode,currentTotal)

        expect(getDiscount).toHaveBeenCalledWith(discountCode)

    })

    it('should calculateMoneyOff if data type is MONEYOFF',async ()=>{
        const discountCode = 'SUMMER20';
        const currentTotal = 300;
        const discountValue = 80;
        const minSpend = 50;
        const data={
            isValid: true,
            type: 'MONEYOFF',
            value: discountValue ,
            minSpend:minSpend
        }

        vi.mocked(getDiscount).mockResolvedValue({data})
        //vi.spyOn(promotions, 'calculateMoneyOff').mockReturnValue(220)
        const result = await applyDiscount(discountCode,currentTotal)

        //expect(calculateMoneyOff).toHaveBeenCalledWith(data.value, data.minSpend, currentTotal)
        expect(result).toBe(220)
    })

    it('should calculate percentage discount if data type is PERCENTAGEOFF',async ()=>{
        const discountCode = 'SUMMER20';
        const currentTotal = 400;
        const discountValue = 70;
        const minSpend = 50;
        const data={
            isValid: true,
            type: 'PERCENTAGEOFF',
            value: discountValue ,
            minSpend:minSpend
        }

        vi.mocked(getDiscount).mockResolvedValue({data})
        //vi.spyOn(promotions, 'calculatePercentageDiscount').mockReturnValue(120)
        const result = await applyDiscount(discountCode,currentTotal)

        //expect(calculatePercentageDiscount).toHaveBeenCalledWith(data.value, data.minSpend, currentTotal)
        expect(result).toBe(120)
    })

    it('should resturn currentTotal if data is not valid',async ()=>{
        const discountCode = 'SUMMER20';
        const currentTotal = 400;

        vi.mocked(getDiscount).mockResolvedValue({ data: { isValid: false } })
        const result = await applyDiscount(discountCode,currentTotal)

        expect(result).toBe(400)
    })
})