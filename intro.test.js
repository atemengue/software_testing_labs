
import {describe, it, expect} from 'vitest'
import { max, fizzBuzz, add, subtract, multiply, divide, isEqual } from './intro'

describe("test de max", () =>{
    it.each([
        {scenario: "a > b", a: 12, b: 10, result_value: 12, result: 'a'},
        {scenario: "b > a", a: 10, b: 13, result_value: 13, result: 'b'},
        {scenario: "a = b", a: 10, b: 10, result_value: 10, result: 'a'}
    ])("doit retourner \x1b[94m$result\x1b[0m si \x1b[93m$scenario\x1b[0m", ({a, b, result_value}) => {
        expect(max(a, b)).toBe(result_value)
    })
})

describe("test de fizzBuzz", () => {
    it.each([
        {scenario: "le nombre divisible par 3 et par 5", n: 15, result: "FizzBuzz"},
        {scenario: "le nombre divisible par 3", n: 9, result: "Fizz"},
        {scenario: "le nombre divisible par 5", n: 10, result: "Buzz"},
        {scenario: "le nombre n`est divisible ni par 3 ni 5", n: 14, result: "14"}
    ])("doit retourner $result si $scenario", ({n, result}) => {
        expect(fizzBuzz(n)).toBe(result)
    })
})

describe("test de add", () => {
    it("doit retourner la somme de a et b", () => {
        //Arrange
        const a = 12, b = 15
        //Act
        const result = add(a, b)
        //Assert
        expect(result).toBe(27)
    })
})

describe("test de subtract", () => {
    it("doit retourner la difference en a et b", () => {
        expect(subtract(14, 9)).toBe(5)
    })
})

describe("test de multiply", () => {
    it("doit retourner le produit entre a et b", () => {
        expect(multiply(7, 8)).toBe(56)
    })
})

describe("test de divide", () => {
    it("doit retourner le resultat de la division de a par b", () => {
        expect(divide(15, 5)).toBe(3)
    })
    it("doit retourner le message d'erreur 'Division par zéro' pour b = 0", () => {
        try{
            divide(15, 0)
        }catch(error){
            expect(error.message).toBe('Division par zéro')
        }
    })
})

describe("test de isEqual", () => {
    it('doit retourner true si a est egal a b', () => {
        expect(isEqual(10, 10)).toBe(true)
    })
    it("doit retourner false si a est different de b", () => {
        expect(isEqual(10, 11)).toBe(false)
    })
})