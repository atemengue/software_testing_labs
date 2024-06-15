import {describe,it,expect}from 'vitest'
import {getPriceInCurrency} from './mocking.js'
import { getExchangeRate } from './libs/currency.js'

vi.mock("./libs/currency.js")

describe('getPriceInCurrecy',()=>{
    it('should return price in target currency',()=>{
        vi.mocked(getExchangeRate).mockReturnValue(1.5)
        constprice=getPriceInCurrency(10,'AUD')

        expect(price).toBe(15)
    })
})
//on utilise .mockResolvedValue() lorsque la fonction à mocker est asynhrone