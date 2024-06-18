<<<<<<< HEAD
import { InvalidUsernameError } from '../../error-handling/exceptions';
import * as users from '../users'; // Importer le module users  
import purchaseHistory from './purchaseHistory/__mocks__/purchaseHistory'; // Importer le module purchaseHistory correctement

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
    } else {
        return true;
    }
}

export async function createAccount(username) {
    if (!await isValidUserName(username)) {
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
    } else {
        throw new Error("Failed to get purchase history");
    }
}

/*import { InvalidUsernameError } from '../../error-handling/exceptions';
import * as users from '../users'; // Importer le module users
//import { purchaseHistory } from './purchaseHistory/__mocks__/purchaseHistory';
=======
import exception from '../../error-handling/exceptions';
import { userExists, createUserId } from '../users.js';
>>>>>>> ebdf5e6e18eb21799985383acc5bdacaad98d8ed

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
  } else {
    return true;
  }
}

export async function createAccount(username) {
<<<<<<< HEAD
    if (!await isValidUserName(username)) {
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
}*/
=======
  if (!isValidUserName(username)) {
    throw exception.InvalidUsernameError('Please enter a valid username');
  }
  const existingUser = await userExists(username);
  return new Promise((resolve, reject) => {
    if (!existingUser) {
      resolve({
        data: {
          userId: createUserId(),
          username: username,
        },
      });
    } else {
      reject('User already exists');
    }
  });
}

export function getPastPurchases(userId) {
  const purchases = purchaseHistory.getPurchaseHistory(userId);
  if (purchases.readyState === 4) {
    return purchases.response.events;
  } else {
    throw Error('Failed to get purchase history');
  }
}
>>>>>>> ebdf5e6e18eb21799985383acc5bdacaad98d8ed
