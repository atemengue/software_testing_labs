import { describe, expect, it, vi} from "vitest";
import { calculatePercentageDiscount, calculateMoneyOff, generateReferralCode, applyDiscount} from "../../js/promotions/promotions";
import { getDiscount } from "../../js/promotions/discount/discount";
import axios from "axios";

describe("Testing calculatePercentageDiscount", () =>{
    it("Shoud apply the percentage discount when cuurent price is equal to minimum spend", () =>{
        const percentage = 10;
        const minimumSpend = 60;
        const currentPrice = 60;
        // discount = 90
        const resultatAttendu = 54;
        const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should apply the precentage discount correctly when curent price meets minimum spend", () => {
        const precentage = 10;
        const minimumSpend = 50;
        const currentPrice = 60;
        // discount = 100 - 10 = 90
        const resultatAttendu = 54; // 60 * 0.9 = 54
        const result = calculatePercentageDiscount(precentage, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should not apply the discount when preice is below minimum spend", () => {
        const percentage = 10;
        const minimumSpend = 50;
        const currentPrice = 40;
        // discount = 90 
        const resultatAttendu = 40;
        const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should return the same price for 0% percenetage", () => {
        const percentage = 0;
        const minimumSpend = 50;
        const currentPrice = 60;
        // discount = 100 - 0 = 100
        const resultatAttendu = 60 // 60 * (1) = 60
        const result = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Shoud return 0 for 100% percentage", () => {
        const percenetage = 100;
        const minimumSpend = 50;
        const currentPrice = 60;
        // discount = 100 - 100 = 0
        const resultatAttendu = 0 // 60 * (0/100) = 0
        const result = calculatePercentageDiscount(percenetage, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it('should handle invalid percentage gracefully', () => {
        const percenetage = - 10;
        const minimumSpend = 50;
        const currentPrice = 60;

        expect(() => calculatePercentageDiscount(percenetage, minimumSpend, currentPrice)).toThrow("Percentage cannot be negative");
    });

    it("Should handle the percentage greater than 100 gracefully", () =>{
        const percenetage = 110;
        const minimumSpend = 50;
        const currentPrice = 60;
    
        expect(() => calculatePercentageDiscount(percenetage, minimumSpend, currentPrice)).toThrow("Percentage cannot be greater than 100")
    
    });   
})

describe("Testing calculateMoneyOff function", () => {
    it("Should apply the discount when current price is equal to minimum spend", () => {
        const discount = 10;
        const minimumSpend = 60;
        const currentPrice = 60;

        const resultatAttendu = 50; // 60 - 10 = 50
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should apply discount when current price is greater than minimum spend", () => {
        const discount = 10;
        const minimumSpend = 50;
        const currentPrice = 70;
        const resultatAttendu = 60; // 70 - 10 = 60
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should not apply the discount when current price is less than minimum spend", () => {
        const discount = 10;
        const minimumSpend = 50;
        const currentPrice = 40;
        const resultatAttendu = 40; // Not applied because 50 > 40
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should handle discount greater than current price", () => {
        const discount = 70;
        const minimumSpend = 50;
        const currentPrice = 60;
        const resultatAttendu = -10; // 60 - 70;
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should return the same price when discount is zero", () => {
        const discount = 0;
        const minimumSpend = 50;
        const currentPrice = 60;
        const resultatAttendu = 60; // 60 - 0 = 60
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should handle zero current price", () => {
        const discount = 10;
        const minimumSpend = 50;
        const currentPrice = 0;
        const resultatAttendu = 0; // No discount applied
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

    it("Should handle zero minimum spend", () => {
        const discount = 10;
        const minimumSpend = 0;
        const  currentPrice = 60;
        const resultatAttendu = 50; // 60 - 10 = 50
        const result = calculateMoneyOff(discount, minimumSpend, currentPrice);

        expect(result).toBe(resultatAttendu);
    });

});

describe("Testing generateReferralCode function", () => {

    it("Should generate a valid referral code", () => {
        const userId = "abc123";
        const referralCode = generateReferralCode(userId);

        // Verifier que le code de parrainage commence par "#FRIEND-#"
        expect(referralCode.startsWith("#FRIEND-#")).toBe(true);

        // Verifier que le code de parrainage contient l'ID utilisateur
        expect(referralCode.includes(`#${userId}`)).toBe(true);

        // Verifier la longueur du code de parrainage (attendu: 17 caracteres)
        expect(referralCode.length).toBe(20);

        // Verification du format 
        expect(referralCode).toMatch(/#FRIEND-#\d{3}-#abc123/)
    });

    it("Should generate unique referral codes for different users", () => {
        const userId1 = "abc123";
        const userId2 = "abc456";

        const referralCode1 = generateReferralCode(userId1);
        const referralCode2 = generateReferralCode(userId2);

        expect(referralCode1).not.toBe(referralCode2);
    });
});

// Mock axios
vi.mock('axios');
describe("Testing applyDiscount function", () => {
    it("Should apply a MONEYOFF discount correctly", async () => {
        const discountCode = "DISCOUNT10";
        const currentTotal = 100;

        // Mock reponse for getDiscount
        axios.get.mockResolvedValue({
            data: {
                isValid: true,
                type: "MONEYOFF",
                value: 10,
                minSpend: 50
            }
        });

        const result = await applyDiscount(discountCode, currentTotal);
        const resultatAttendu = 90; // 100 - 10 = 90

        expect(result).toBe(resultatAttendu);
    });

    it("Should apply PERCENTAGEOFF discount correctly", async () => {
        const discountCode = "DISCOUNT10";
        const currentTotal = 100;

        // Mock response for getDiscount
        axios.get.mockResolvedValue({
            data: {
                isValid: true,
                type: "PERCENTAGEOFF",
                value: 10,
                minSpend: 50
            }
        });

        const result = await applyDiscount(discountCode, currentTotal);
        const resultatAttendu = 90; // 100 * 0.9 = 90

        expect(result).toBe(resultatAttendu);
    });

    it("Should not apply a discount if the code is invalid", async () => {
        const discountCode = "INVALID";
        const currentTotal = 100;

        // Mock response for getDiscount
        axios.get.mockResolvedValue({
            data: {
                isValid: false,
                type: "",
                value: 0,
                minSpend: 0
            }
        });

        const result = await applyDiscount(discountCode, currentTotal);
        const resultatAttendu = 100; // No discount applied

        expect(result).toBe(resultatAttendu);
    });

    it("Should not apply a discount if the minimum spend is not met", async () => {
        const discountCode = "DISCOUNT10";
        const currentTotal = 40; // Bellow the minimum spend of 50

        // Mock response for getDiscount
        axios.get.mockResolvedValue({
            data: {
                isValid: true,
                type: "MONEYOFF",
                value: 10,
                minSpend: 50
            }
        });

        const result = await applyDiscount(discountCode, currentTotal);
        const resultatAttendu = 40; // No discount applied

        expect(result).toBe(resultatAttendu);
    });

    it("Should handle errors gracefully", async () => {
        const discountCode = "DISCOUNT10";
        const currentTotal = 60;

        // Mock error response for getDiscount
        axios.get.mockRejectedValue(new Error("Network Error"));

        const result = await applyDiscount(discountCode, currentTotal);
        const resultatAttendu = 60; // No discount applied due to error

        expect(result).toBe(resultatAttendu);
    });
});