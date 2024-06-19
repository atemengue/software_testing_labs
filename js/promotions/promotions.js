import { getDiscount } from "./discount/discount";

export function calculatePercentageDiscount(percentage, minimumSpend, currentPrice) {
    if (percentage < 0){
        throw new Error("Percentage cannot be negative");
    }

    if(percentage > 100){
        throw new Error ("Percentage cannot be greater than 100");
    }
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
    try{
        const { data } = await getDiscount(discountCode);

        if (data.isValid) {
            switch (data.type) {
                case "MONEYOFF":
                    return calculateMoneyOff(data.value, data.minSpend, currentTotal);
                case "PERCENTAGEOFF":
                    return calculatePercentageDiscount(data.value, data.minSpend, currentTotal);
            }
        }
    } catch(error) {
        console.error("Failed to apply discount:", error);
    }
    return currentTotal;
}
