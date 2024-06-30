import { describe, it, expect } from 'vitest';
import { 
    calculatePercentageDiscount, 
    calculateMoneyOff, 
    generateReferralCode, 
    applyDiscount 
} from '../software_testing_labs/js/promotions/promotions';
import { getDiscount } from '../software_testing_labs/js/promotions/discount/discount';

// Mocking getDiscount function
vi.mock('../software_testing_labs/js/promotions/discount/discount', () => ({
    getDiscount: vi.fn()
}));

describe('calculatePercentageDiscount', () => {
    it('should apply percentage discount correctly', () => {
        // Arrange
        const percentage = 20;
        const minimumSpend = 100;
        const currentPrice = 120;

        // Act
        const discountedPrice = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

        // Assert
        expect(discountedPrice).toBe(96); // 20% off of 120 should be 96
    });

    it('should not apply discount if current price is less than minimum spend', () => {
        // Arrange
        const percentage = 20;
        const minimumSpend = 100;
        const currentPrice = 80;

        // Act
        const discountedPrice = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);

        // Assert
        expect(discountedPrice).toBe(80); // No discount applied since current price < minimum spend
    });
});

describe('calculateMoneyOff', () => {
    it('should apply money off discount correctly', () => {
        // Arrange
        const discount = 10;
        const minimumSpend = 50;
        const currentPrice = 60;

        // Act
        const discountedPrice = calculateMoneyOff(discount, minimumSpend, currentPrice);

        // Assert
        expect(discountedPrice).toBe(50); // 10 off of 60 should be 50
    });

    it('should not apply discount if current price is less than minimum spend', () => {
        // Arrange
        const discount = 10;
        const minimumSpend = 50;
        const currentPrice = 40;

        // Act
        const discountedPrice = calculateMoneyOff(discount, minimumSpend, currentPrice);

        // Assert
        expect(discountedPrice).toBe(40); // No discount applied since current price < minimum spend
    });
});

describe('generateReferralCode', () => {
    it('should generate referral code with correct format', () => {
        // Arrange
        const userId = 'abc123';

        // Act
        const referralCode = generateReferralCode(userId);

        // Assert
        expect(referralCode).toMatch(/^#FRIEND-#\d{3}-#\w+$/); // Matches format #FRIEND-#xxx-#userId
    });
});

describe('applyDiscount', () => {
    it('should apply money off discount correctly', async () => {
        // Arrange
        const discountCode = 'ABC123';
        const currentTotal = 100;
        const discountData = {
            isValid: true,
            type: 'MONEYOFF',
            value: 10,
            minSpend: 50
        };

        getDiscount.mockResolvedValue({ data: discountData });

        // Act
        const discountedTotal = await applyDiscount(discountCode, currentTotal);

        // Assert
        expect(getDiscount).toHaveBeenCalledWith(discountCode);
        expect(discountedTotal).toBe(90); // 10 off of 100 should be 90
    });

    it('should apply percentage discount correctly', async () => {
        // Arrange
        const discountCode = 'DEF456';
        const currentTotal = 200;
        const discountData = {
            isValid: true,
            type: 'PERCENTAGEOFF',
            value: 20,
            minSpend: 100
        };

        getDiscount.mockResolvedValue({ data: discountData });

        // Act
        const discountedTotal = await applyDiscount(discountCode, currentTotal);

        // Assert
        expect(getDiscount).toHaveBeenCalledWith(discountCode);
        expect(discountedTotal).toBe(160); // 20% off of 200 should be 160
    });

    it('should return currentTotal if discount is invalid', async () => {
        // Arrange
        const discountCode = 'GHI789';
        const currentTotal = 150;
        const discountData = {
            isValid: false
        };

        getDiscount.mockResolvedValue({ data: discountData });

        // Act
        const discountedTotal = await applyDiscount(discountCode, currentTotal);

        // Assert
        expect(getDiscount).toHaveBeenCalledWith(discountCode);
        expect(discountedTotal).toBe(150); // No discount applied, should return currentTotal
    });
});
