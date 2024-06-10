import * as users from '../users';
//import * as purchaseHistory from '../purchaseHistory';
import { InvalidUsernameError } from '../../error-handling/exceptions';

export class Purchase {
    constructor(eventName, tickets, cost) {
        this.eventName = eventName;
        this.tickets = tickets;
        this.cost = cost;
    }
}

export async function isValidUserName(userName) {
    return new Promise((resolve) => {
        if (!userName || !userName.includes('@')) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
}

export async function createAccount(username) {
    const isValid = await isValidUserName(username);
    if (!isValid) {
        throw new InvalidUsernameError("Please enter a valid username");
    }
    const userExists = await users.userExists(username);
    return new Promise((resolve, reject) => {
        if (!userExists) {
            resolve({
                data: {
                    "userId": users.createUserId(),
                    "username": username,
                }
            })
        } else {
            reject(new Error("User already exists"));
        }
    });
}

export function getPastPurchases(userId) {
    const purchases = purchaseHistory.getPurchaseHistory(userId);
    if (purchases.readyState === 4) {
        return purchases.response.events;
    } else {
        throw new Error("Failed to get purchase history");
    }
}
