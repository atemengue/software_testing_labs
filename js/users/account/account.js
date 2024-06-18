import exception, { InvalidUsernameError } from '../../error-handling/exceptions';
import { createUserId, userExists } from '../users';
import { getPurchaseHistory } from './purchaseHistory/purchaseHistory';
// import purchaseHistory from './purchaseHistory/__mocks__/purchaseHistory'
// import { User } from '../users';

export class Purchase {
    constructor(eventName, tickets, cost) {
        this.eventName = eventName;
        this.tickets = tickets;
        this.cost = cost;
    }
}

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
    // if (!isValidUserName(username)) {
    if (!( await isValidUserName(username))) {
        // throw exception.InvalidUsernameError("Please enter a valid username")
        throw new InvalidUsernameError("Please enter a valid username");
    }
    // const userExists = await users.userExists(username);
    const userExist = await userExists(username);
    return new Promise((resolve, reject) => {
        if (!userExist) {
            resolve({
                data: {
                    // "userId": users.createUserId(),
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
    // const purchases = purchaseHistory.getPurchaseHistory(userId);
    const purchases = getPurchaseHistory(userId);
    if (purchases.readyState === 4) {
        return purchases.response.events;
    }
    else {
        throw Error("Failed to get purchase history");
    }
}
