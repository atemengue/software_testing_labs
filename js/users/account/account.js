import { InvalidUsernameError } from '../../../js/error-handling/exceptions';
import { User, createUserId } from '../users';
import purchaseHistory from './purchaseHistory/__mocks__/purchaseHistory';

export class Purchase {
    constructor(eventName, tickets, cost) {
        this.eventName = eventName;
        this.tickets = tickets;
        this.cost = cost;
    }
}

const users = new User(1, "newuser1@pluralsight.com");
export async function isValidUserName(userName) {
    // Placeholder for request checking if username is valid
    if (!userName || !userName.includes('@')) {
        return false;
    }
    else {
        return true;
    }
}

export async function createAccount(username) {
    if (!isValidUserName(username)) {
        throw InvalidUsernameError("Please enter a valid username")
    }
    const userExists = await users.username;
    return new Promise((resolve, reject) => {
        if (!userExists) {
            resolve({
                data: {
                    "userId": createUserId(),
                    "username": username,
                }
            })
        } else {
            reject("User already exists")
        }

    })
}

export function getPastPurchases(userId) {
    const purchases = purchaseHistory.getPurchaseHistory(userId);
    if (purchases.readyState === 4) {
        return purchases.response.events;
    }
    else {
        throw Error("Failed to get purchase history");
    }
}


