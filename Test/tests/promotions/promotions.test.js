import { it, vi, expect, describe } from 'vitest';
import {
    calculatePercentageDiscount,
    calculateMoneyOff,
    generateReferralCode,
    applyDiscount,
  } from '../js/promotions/promotions';
  
  describe('calculatePercentageDiscount', () => {
    it('should calculate the correct percentage discount when current price is greater than or equal to minimum spend', () => {
      const percentage = 20;
      const minimumSpend = 100;
      const currentPrice = 120;
      const discountedPrice = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);
      expect(discountedPrice).toBe(96);
    });
  
    it('should return the current price when current price is less than minimum spend', () => {
      const percentage = 20;
      const minimumSpend = 100;
      const currentPrice = 80;
      const discountedPrice = calculatePercentageDiscount(percentage, minimumSpend, currentPrice);
      expect(discountedPrice).toBe(80);
    });
  });
  
  describe('calculateMoneyOff', () => {
    it('should calculate the correct money off when current price is greater than or equal to minimum spend', () => {
      const discount = 10;
      const minimumSpend = 50;
      const currentPrice = 60;
      const discountedPrice = calculateMoneyOff(discount, minimumSpend, currentPrice);
      expect(discountedPrice).toBe(50);
    });
  
    it('should return the current price when current price is less than minimum spend', () => {
      const discount = 10;
      const minimumSpend = 50;
      const currentPrice = 40;
      const discountedPrice = calculateMoneyOff(discount, minimumSpend, currentPrice);
      expect(discountedPrice).toBe(40);
    });
  });
  
  describe('generateReferralCode', () => {
    it('should generate a referral code with the correct format', () => {
      const userId = '123';
      const referralCode = generateReferralCode(userId);
      expect(referralCode).toMatch(/^#FRIEND-#\w{3}-#\d{3}$/);
    });
  });
  
  describe('applyDiscount', () => {
    it('should apply the correct money off discount when the discount code is valid and of type MONEYOFF', async () => {
      const discountCode = 'MONEYOFF10';
      const currentTotal = 100;
      const discountedTotal = await applyDiscount(discountCode, currentTotal);
      expect(discountedTotal).toBe(90);
    });
  
    it('should apply the correct percentage discount when the discount code is valid and of type PERCENTAGEOFF', async () => {
      const discountCode = 'PERCENTAGEOFF20';
      const currentTotal = 100;
      const discountedTotal = await applyDiscount(discountCode, currentTotal);
      expect(discountedTotal).toBe(80);
    });
  
    it('should return the current total when the discount code is invalid', async () => {
      const discountCode = 'INVALIDCODE';
      const currentTotal = 100;
      const discountedTotal = await applyDiscount(discountCode, currentTotal);
      expect(discountedTotal).toBe(100);
    });
  });