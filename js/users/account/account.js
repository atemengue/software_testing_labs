import* as exception from '../../../js/error-handling/exceptions';
import * as users from '../../../js/users/users';
import * as purchaseHistory from '../../../js/users/account/purchaseHistory/purchaseHistory';
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
    const isValid = await isValidUserName(username);
    if (!isValid) {
        throw new exception.InvalidUsernameError("Please enter a valid username");
    }
    const userExists = await users.userExists(username);
    return new Promise((resolve, reject) => {
        if (!userExists) {
            resolve({
                data: {
                    userId: users.createUserId(),
                    username: username,
                }
            });
        } else {
            reject("User already exists");
        }
    });
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