import { describe , expect ,it ,vi } from 'vitest'
import { Purchase, isValidUserName, createAccount, getPastPurchases }  from '../../../js/users/account/account'
import {getPurchaseHistory, parsePurchaseResponse} from '../../../js/users/account/purchaseHistory/purchaseHistory'
import  axios from 'axios';


vi.mock('../../js/users/account/purchaseHistory/purchaseHistory.js',()=>({
    getPurchaseHistory: vi.fn().mockImplementation((()=>{
        const url = new URL("/account/orders/history/users/");
         url.searchParams.append("userId", userId);

    const request = async()=>{
        await axios.get(url.toString())
    }

    return request
    }))
  
}));

describe('Test fonction getPurchaseHistory',()=>{
    it('Should return an instance of Axios Request',()=>{

        expect(getPurchaseHistory()).toBeInstanceOf(Function);
    })
});

describe('Test fonction parsePurchaseResponse',()=>{

    it('Should return an array of purchase',()=>{
        const purchaseData =  [
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
        ];

        expect(parsePurchaseResponse(purchaseData)).toBeInstanceOf(Array);
    })
})
