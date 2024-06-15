import {describe,it,expect} from 'vitest'
import {max,fizzBuzz} from './intro.js'

describe("Testing max function",()=>{

    it('should return 2 if 2 is greater than 1',()=>{
            expect(max(1,2)).toBe(2)
        })
    
    it("should return 4 if 4 is equal to 4",()=>{
        expect(max(4,4)).toBe(4)
    })
    
})

describe("Testing fizzBuzz",()=>{

    it("Should return 15 if is equal FizzBuzz",()=>{
        expect(fizzBuzz(15)).toBe('FizzBuzz')
    })
    
})