import {test, describe, expect} from 'vitest'
import { calculatePercentageDiscount, calculateMoneyOff,generateReferralCode } from '../../js/promotions/promotions'

describe('test calculatePercentageDiscount', () => {
    test('doit retourner un reel valide si currentPRice >= minimumSpend', () => {
        const testPercentage = 10, minimum = 10, current = 100
        expect(calculatePercentageDiscount(testPercentage, minimum, current)).toBe(90);
    })

    test('doit retourner prixCourant si prixCourant  <depenseMinimale', () =>{
        const testPercentage = 10, minimum = 100, current = 10
        expect(calculatePercentageDiscount(testPercentage, minimum, current)).toBe(current);
    })
})

describe('test calculateMoneyOff', () =>{
    test('doit retourner la difference entre le prixCourant et la reduction si prixCourant >= depenseMinimale', () =>{
        const prixCourant=1000, depenseMinimale = 300, reduction = 200
        expect(calculateMoneyOff(reduction, depenseMinimale, prixCourant)).toBe(800)
    
    })
    test("doit retourner le prixCourant si la prixCourant < depenseMinimale", () =>{
        const prixCourant=100, depenseMinimale = 300, reduction = 200
        expect(calculateMoneyOff(reduction, depenseMinimale, prixCourant)).toBe(prixCourant)
    })
})


describe('test generateReferralCode', () =>{
    let result = generateReferralCode('toto')
    test('doit retourner un mot ayant userId', () =>{{
        expect(result).toContain('toto');
    }}) 
})