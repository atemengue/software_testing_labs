import { getDiscount } from "./discount/discount";

export function calculatePercentageDiscount(percentage, minimumSpend, currentPrice) {
    if (currentPrice >= minimumSpend) {
        const discount = 100 - percentage;
        return currentPrice * (discount / 100);
    }
    return currentPrice;
}

export function calculateMoneyOff(discount, minimumSpend, currentPrice) {
    if (currentPrice >= minimumSpend) {
        return currentPrice - discount;
    }
    return currentPrice;
}

export function generateReferralCode(userId) {
    const id = Math.random().toString().substring(2, 5)

    return `#FRIEND-#${id}-#${userId}`;
}

export async function applyDiscount(discountCode, currentTotal) {
    const { data } = await getDiscount(discountCode);

    if (data.isValid) {
        switch (data.type) {
            case "MONEYOFF":
                return calculateMoneyOff(data.value, data.minSpend, currentTotal);
            case "PERCENTAGEOFF":
                return calculatePercentageDiscount(data.value, data.minSpend, currentTotal);
        }
    }
    return currentTotal;
}
