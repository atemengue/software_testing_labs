import {Purchase, isValidUserName, createAccount, getPastPurchases } from '../../../js/users/account/account'
import {vi, test, describe, expect } from "vitest";
import { userExists } from '../../../js/users/users';
import exception from '../../../js/error-handling/exceptions';
import { getPurchaseHistory} from '../../../js/users/account/purchaseHistory/purchaseHistory';


const isValidUserName = vi.fn();
const userExists = vi.fn();
const getPurchaseHistory=vi.fn();

vi.mock('../../users/users.js', () => ({
    userExists: userExists,
    createUserId: () => 2,
}));

vi.mock('../../users/account/account.js', () => ({
    isValidUserName: isValidUserName,
    getPurchaseHistory: getPurchaseHistory,
}));
//--------------------(4)

describe('Test cases for Purchase class', () =>{

    //(4.1)
    test('Should create Purchase object with valid data', () => {
        const result = new Purchase("JUIN",4,2400);
        expect(result).toEqual({
            eventName: "JUIN",
            tickets: 4,
            cost: 2400,
        });
    });

    //(4.2)
    test('Should not create a Purchase object if ticket < 0', () => {
        const NegativeTicketError = () =>{
            new Purchase("JUIN", -3, 2400)
        }
        expect(NegativeTicketError).toThrow();
    });

    //(4.3)
    test('Should not create a Purchase object if cost < 0', () => {
        const NegativeCostError = () =>{
            new Purchase("JUIN", 4, -100)
        }
        expect(NegativeCostError).toThrow();
    });

    //(4.4)
    test('Should not create a Purchase object if cost is not an integer', () => {
        const NotIntegerCostError = () =>{
            new Purchase("JUIN", 4, "bro")
        }
        expect(NotIntegerCostError).toThrow();
    });

    //(4.5)
    test('Should not create a Purchase object if cost is not an integer', () => {
        const NotIntegerTicketError = () =>{
            new Purchase("JUIN", "sap", 2400)
        }
        expect(NotIntegerTicketError).toThrow();
    });

    //(4.6)
    test('Should not create a Purchase object if eventName is not a string', () => {
        const NotStringEventError = () =>{
            new Purchase(1, 4, 2400)
        }
        expect(NotStringEventError).toThrow();
    });
});

//--------------------(5)
describe('Test cases for isValidUserName function', () =>{ [450,false], [450,false],
   test.each([ [450,false],
    ['newuser1@pluralsight.com',true], //(5.1)
    ['newuser2-pluralsight.com',false],//(5.2)
    ['momo@monero-com', false],
    ['user.pamara@polo', false],
    [450,false],
    ['',false],
    ['user@.com', false],
    ['@domain.com', false],
   ])('isValidUerName(%s) should return %s', (input, expected) => {
    expect(isValidUserName(input)).toBe(expected);
   });
});

//--------------------(6)
describe('Test cases for createAccount function', async() =>{
    //(6.1)
    test('Should create an account if the username is valid and the user does not exist', async() => {
        const username = "newuser3@pluralsight.com";
        isValidUserName.mockReturnValue(true)
        userExists.mockResolveedValue(false);
        const result = await createAccount(username);
        expect(result).toEqual({
            data: {
                userId: 2,
                username: 'newuser3@pluralsight.com'
            },
        });
    });

    //(6.2)
    test('Should return an error message if the username is not valid', async() => {
        const username = "newuser2-pluralsight.com";
        isValidUserName.mockReturnValue(false)
        const result= await createAccount(username)
        expect (result).rejects.toThrow(exception.InvalidUsernameError);
    });

    //(6.3)
    test('Should return an error message if the valid username alread exists', async() => {
        const username = "newuser1@pluralsight.com";
        isValidUserName.mockReturnValue(true);
        userExists.mockResolvedValue(true);
        const result= await createAccount(username)
        expect (result).rejects.toBe('User already exist');
    });
});

//--------------------(7)
describe('Test cases for getPastPurchases function', () =>{

    //(7.1)
    test('Should return purchase events if the userID is valid', () => {
        const userId = 1;
        const mockPurchaseHistory = {
        readyState: 4,
        response: {
        events: [
          { eventName: 'Concert A', tickets: 2, cost: 100 },
          { eventName: 'Movie B', tickets: 3, cost: 50 },
        ],
      },
    };
    getPurchaseHistory.mockReturnValue(mockPurchaseHistory);
    const result = getPastPurchases(userId);
    expect(result).toEqual([
      { eventName: 'Concert A', tickets: 2, cost: 100 },
      { eventName: 'Movie B', tickets: 3, cost: 50 },
    ]);
  });

    //(7.2)
    test('Should throw an error if the userID is invalid', () => {
    const userId = 67;
    const mockPurchaseHistory = {
      readyState: 3,
      response: {},
    };

    getPurchaseHistory.mockReturnValue(mockPurchaseHistory);
    expect(() => getPastPurchases(userId)).toThrow('Failed to get purchase history');
  });
});

