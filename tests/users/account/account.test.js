import { describe , expect ,it ,vi } from 'vitest'
import { isValidUserName, createAccount, getPastPurchases }  from '../../../js/users/account/account'
import {getPurchaseHistory} from '../../../js/users/account/purchaseHistory/purchaseHistory'

vi.mock('../../../js/users/account/purchaseHistory/purchaseHistory',()=>(
    {
       getPurchaseHistory: vi.fn().mockImplementation((()=>{

    return {
        readyState: 4,
        onreadystatechange: null,
        response: {
            events: [
                {
                    name: "Punk Goes Pop - 90s",
                    tickets: 2,
                    price: 40.00,
                },
                {
                    name: "Adventures Live!",
                    tickets: 5,
                    price: 120.00,
                },
                {
                    name: "Folk dance party!",
                    tickets: 3,
                    price: 75.00,
                }
            ],
        }
    }
    }))
    }
))


describe('test isValidUserName function',()=>{

    it('Should return false if username is empty ',async()=>{
        expect(await isValidUserName('')).toBeFalsy()
    });
    it('Should return false if username doesnot contains @ ',async()=>{

        expect(await isValidUserName('user')).toBeFalsy();

    });
    it('Should return true if username is valid', async()=>{
        expect(await isValidUserName('user@name')).toBeTruthy();
    })

});

describe('test createAccount function', ()=>{

    it('Should throw exception if username is invalid', async()=>{
        
        expect(()=> createAccount('')).rejects.toBe("User already exists")
    });

    it('Should return user object if user exists',async()=>{

        expect(await createAccount("newuser1@pluralsight.com")).toBeTypeOf("object")
    })
});

describe('test getPastpurchases function ',()=>{

    it("Should return events if ready state equals 4", ()=>{
        const mockValue = {
            readyState: 4,
            onreadystatechange: null,
            response: {
                events: [
                    {
                        name: "Punk Goes Pop - 90s",
                        tickets: 2,
                        price: 40.00,
                    },
                    {
                        name: "Adventures Live!",
                        tickets: 5,
                        price: 120.00,
                    },
                    {
                        name: "Folk dance party!",
                        tickets: 3,
                        price: 75.00,
                    }
                ],
            }
        };
       
       
        
        expect(getPastPurchases(2)).toEqual(mockValue.response.events)
        
    });
    it("Should throw error if no purchase history", ()=>{
         vi.mocked(getPurchaseHistory).mockImplementation((()=>{

            return {
                readyState: 3,
                onreadystatechange: null,
                response: {
                    events: [
                        {
                            name: "Punk Goes Pop - 90s",
                            tickets: 2,
                            price: 40.00,
                        },
                        {
                            name: "Adventures Live!",
                            tickets: 5,
                            price: 120.00,
                        },
                        {
                            name: "Folk dance party!",
                            tickets: 3,
                            price: 75.00,
                        }
                    ],
                }
            }
            }));
        expect(()=>getPastPurchases()).toThrowError(/history/);
     });

})
