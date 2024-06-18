import { describe, expect, it, vi } from 'vitest';
// Importer les fonctions à tester
import { 
    calculatePercentageDiscount, 
    calculateMoneyOff, 
    generateReferralCode, 
    applyDiscount 
} from './promotions';

// Mock de la fonction getDiscount
vi.mock("./discount/discount", () => ({
    getDiscount: vi.fn().mockResolvedValue({ data: { isValid: true, type: "PERCENTAGEOFF", value: 10, minSpend: 50 } }),
}));

describe('calculatePercentageDiscount', () => {
    it('should calculate the correct percentage discount', () => {
        const discount = calculatePercentageDiscount(10, 50, 100);
        expect(discount).toBe(90);
    });
});

describe('calculateMoneyOff', () => {
    it('should calculate the correct money off discount', () => {
        const discount = calculateMoneyOff(10, 50, 100);
        expect(discount).toBe(90);
    });
});

describe('generateReferralCode', () => {
    it('should generate a referral code with the correct format', () => {
        const userId = '123';
        const referralCode = generateReferralCode(userId);
        expect(referralCode).toMatch(/^#FRIEND-#\d{3}-#\d+$/); // Vérifie le format du code généré
    });
});

describe('applyDiscount', () => {
    it('should apply the correct discount based on the discount code', async () => {
        const currentTotal = 100;
        const discountedTotal = await applyDiscount('DISCOUNTCODE', currentTotal);
        expect(discountedTotal).toBe(90); // Vérifie le montant total après application du rabais
    });
});
