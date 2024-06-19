import {test,expect,describe,it,vi} from 'vitest'
import { isSoldOut,getTagLine,createEvent } from './js/events/event'
import{Event} from './js/events/event'


describe("fonction isSoldOut",()=>{
    
    
    it("doit me retourner false si le nombre de nombre de ticket restant est != 0",()=>{
        let event1 = new Event(1,'short',500,30,10,"12/01/24")
        expect(isSoldOut(event1)).toBe(false)
    })
    
    it("doit me retourner true si le nombre de ticket restant est egale a 0",()=>{
        let event = new Event(1,'ballon',500,30,0,"12/01/24")
        expect(isSoldOut(event)).toBe(true)
    })
})


describe('fonction getTagLine', () => {
    test('doit me retourner Event Sold Out! si le nombre de ticket restant est egale a 0', () => {
        let event = new Event(1,'ballon',500,30,0,"12/01/24")
        expect(getTagLine(event, 2, 'true')).toMatch('Out!');
    })

    test('doit me retourner Hurry only nombre de ticket left! si le nombre de ticket restant est inferieur au minimum de ticket requis', () => {
        let event = new Event(1,'ballon',500,30,6,"12/01/24")
        expect(getTagLine(event,7,'true')).toMatch('left!')
    })

    test('doit me retourner This Event is getting a lot of interest. Don\'t miss out, purchase your ticket now! si le ticket est populaire', () => {
        let event = new Event(1,'ballon',500,30,8,"12/01/24")
        expect(getTagLine(event,7,true)).toMatch('interest')
    })

    test('doit me retourner Don\'t miss out, purchase your ticket now! si le ticket n\'est pas populaire', () => {
        let event = new Event(1,'ballon',500,30,8,"12/01/24")
        expect(getTagLine(event,7,false)).toBe("Don't miss out, purchase your ticket now!")
    })
 })


 describe('fonction createEvent', () => {
    test('doit me retourner une erreur si nom n\'est pas une chaine de caractere ou si la taille du nom est superieur a 200', () => {
       
        expect(() => createEvent(2, 200, 3)).toThrow(/exceed/i);
        expect(() => createEvent("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssvvvssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", 200, 3)).toThrow(/exceed/i);
    })

    test('doit me retourner une erreur si le prix est different d\'un nombre ou est inferieur a 0', () => {
        expect(() => createEvent("name", -200, 3)).toThrow(/equal/i);
        expect(() => createEvent("name", "deux", 3)).toThrow(/equal/i);
    })

    test('doit me retourner une erreur si le nombre de ticket disponible est inferieura 1 ou n\'est pas un nombre', () => {
        expect(() => createEvent("name", 200, "3")).toThrow(/than/i);
        expect(() => createEvent("name", 233, 0)).toThrow(/than/i);
    })

    test('doit me creer un evenement si toutes les conditions ne sont pas verifiee', () => {
        expect(createEvent("name", 200, 3)).toEqual(new Event(null,"name", 200, 3));
    })
 })
