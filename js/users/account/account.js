import exception from '../../error-handling/exceptions';
import { userExists, createUserId } from '../users.js';

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
