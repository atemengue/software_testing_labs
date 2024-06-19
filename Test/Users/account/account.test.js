import {Purchase, isValidUserName, createAccount, getPastPurchases } from '../../../js/users/account/account'
import {vi, it, describe, expect } from "vitest";
import { userExists } from '../../../js/users/users';
import exception from '../../../js/error-handling/exceptions';
import { getPurchaseHistory} from '../../../js/users/account/purchaseHistory/purchaseHistory';

const isValidUserName = vi.fn();
const userExists = vi.fn();
const getPurchaseHistory=vi.fn();

vi.mock('../../../js/users/users', () => ({
    userExists: userExists,
    createUserId: () => 2,
}));

vi.mock('../../../js/users/account/account.js', () => ({
    isValidUserName: isValidUserName,
    getPurchaseHistory: getPurchaseHistory,
}));

describe('Purchase class', () =>{

    it('Should create Purchase object with valid data', () => {
        const result = new Purchase("Concert", 1000, 5000);
        expect(result).toEqual({
            eventName: "Concert",
            tickets: 1000,
            cost: 5000,
        });
    });

    it('Should not create a Purchase object if ticket < 0', () => {
        const NegativeTicketError = () =>{
            new Purchase("Concert", -3, 2400)
        }
        expect(NegativeTicketError).toThrow();
    });

    it('Should not create a Purchase object if cost < 0', () => {
        const NegativeCostError = () =>{
            new Purchase("Concert", 1000, -100)
        }
        expect(NegativeCostError).toThrow();
    });

    it('Should not create a Purchase object if cost is not an integer', () => {
        const NotIntegerCostError = () =>{
            new Purchase("Concert", 1000, "bro")
        }
        expect(NotIntegerCostError).toThrow();
    });

    it('Should not create a Purchase object if cost is not an integer', () => {
        const NotIntegerTicketError = () =>{
            new Purchase("Concert", "sap", 5000)
        }
        expect(NotIntegerTicketError).toThrow();
    });


    it('Should not create a Purchase object if eventName is not a string', () => {
        const NotStringEventError = () =>{
            new Purchase(1.0, 1000, 5000)
        }
        expect(NotStringEventError).toThrow();
    });
});

describe('isValidUserName', () =>{ [265,false], [265,false],
   it.each([ [265,false],
    ['newuser1@pluralsight.com',true], 
    ['newuser2-pluralsight.com',false],
    ['naomi@liomo-com', false],
    ['user.pierre@hello', false],
    [265,false],
    ['',false],
    ['user@.com', false],
    ['@domain.com', false],
   ])('isValidUerName(%s) should return %s', (input, expected) => {
    expect(isValidUserName(input)).toBe(expected);
   });
});

describe('createAccount', async() =>{
    it('Should create an account if the username is valid and the user does not exist', async() => {
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

    
    it('Should return an error message if the username is not valid', async() => {
        const username = "newuser2-pluralsight.com";
        isValidUserName.mockReturnValue(false)
        const result= await createAccount(username)
        expect (result).rejects.toThrow(exception.InvalidUsernameError);
    });

    it('Should return an error message if the valid username alread exists', async() => {
        const username = "newuser1@pluralsight.com";
        isValidUserName.mockReturnValue(true);
        userExists.mockResolvedValue(true);
        const result= await createAccount(username)
        expect (result).rejects.toBe('User already exist');
    });
});

describe('getPastPurchases', () =>{

    it('Should return purchase events if the userID is valid', () => {
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

    it('Should throw an error if the userID is invalid', () => {
    const userId = 56;
    const mockPurchaseHistory = {
      readyState: 3,
      response: {},
    };

    getPurchaseHistory.mockReturnValue(mockPurchaseHistory);
    expect(() => getPastPurchases(userId)).rejects.toThrow('Failed to get purchase history');
  });
});


