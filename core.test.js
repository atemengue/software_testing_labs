
import { describe, it, expect } from "vitest";
import { getCoupons, calculateDiscount, isPriceInRange, isValidUsername, fetchData, createProduct, isStrongPassword, Stack } from "./core";
import { Product } from "./Product"

describe("test de getCoupons", () => {
    it("doit retourner un tableau de coupons", () => {
        const coupons = getCoupons()
        expect(Array.isArray(coupons)).toBe(true)
        expect(coupons.length).toBeGreaterThan(0)
    })
    it("doit retourner un tableau de coupons ayant des codes valides", () => {
        const coupons = getCoupons()
        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('code')
            expect(typeof coupon.code).toBe('string')
            console.log(expect(coupon.code).toBeTruthy())//test l'existance si
        });
    })
    it("doit retourner un tableau de coupons ayant des discounts valides ", () => {
        const coupons = getCoupons()
        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('discount')
            expect(typeof coupon.discount).toBe('number');
            expect(coupon.discount).toBeGreaterThan(0);
            expect(coupon.discount).toBeLessThan(1);
        });
    })
})

describe("test de calculateDiscount", () => {
    it("doit retourner 'Invalid price' si prix n'est pas un entier ou est < 0", () => {
        expect(calculateDiscount(-1||'test', 1)).toMatch(/Invalid/i)
    })
    it("doit retourner 'Invalid discount code' si le discount code n'est pas une chaine de caractere", () => {
        expect(calculateDiscount(100, 1)).toMatch(/Invalid/i)
    })
    it("doit retourner le prix reduit de 10% si discountCode = 'SAVE10'", () => {
        expect(calculateDiscount(2500, 'SAVE10')).toBe(2250)
    })
    it("doit retourner le prix reduit de 20% si discountCode = 'SAVE20'", () => {
        expect(calculateDiscount(2500, 'SAVE20')).toBe(2000)
    })
})

describe("test de isPriceInRange", () => {
    it.each([
        {scenario: "prix < min", price: 900, min: 1000, max: 2500, result: false},
        {scenario: "prix > max", price: 2600, min: 1000, max: 2500, result: false},
        {scenario: "prix entre min et max", price: 2000, min: 1000, max: 2500, result: true},
        {scenario: "prix = min", price: 1000, min: 1000, max: 2500, result: true},
        {scenario: "prix = max", price: 2500, min: 1000, max: 2500, result: true}
    ])("doit retourner $result si $scenario", ({price, min, max, result}) => {
        expect(isPriceInRange(price, min, max)).toBe(result)
    })
})

describe("test de isValidUsername", () => {
    it.each([
        {scenario: "username length > 15", username: 'my name is best tester', result: false},
        {scenario: "username length < 5", username: 'name', result: false},
        {scenario: "username length in 5 and 15", username: 'my name is', result: true},
        {scenario: "username length = 5", username: 'names', result: true},
        {scenario: "username length = 15", username: 'my name is best', result: true}
    ])("doit retourner $result si $scenario", ({username, result}) => {
        expect(isValidUsername(username)).toBe(result);
    })
})

describe("test de fetchData", () => {
    it("doit retourner les donnees", async () => {
        expect(typeof await fetchData()).toBe('object');
        const data = await fetchData();
        expect(data.length).toBeGreaterThan(0);
    })
})

describe("test de la class Stack", () => {
    describe("test du constructeur", () => {
        it("doit creer un tableau", () => {
            const stack = new Stack();
            expect(stack.items.length).toBe(0)
        })
    })

    describe("test de push", () => {
        it("doit ajouter un element dans le tableau", () => {
            const stack = new Stack(), data = 'product01';
            stack.push(data);
            expect(stack.items.length).toBe(1)
        })
    })

    describe("test de pop", () => {
        it("doit renvoyer une erreur si la pile est vide", () => {
            try{
                const stack = new Stack();
                stack.pop()
            }catch(error){
                expect(error.toString()).toMatch(/error/i)
                expect(error.message).toMatch(/empty/i)
            }
        })
        it("doit retourner le sommet de la pile", () => {
            const stack = new Stack(), data1 = 1, data2 = 2;
            stack.push(data1);
            stack.push(data2)
            expect(stack.pop()).toBe(2)
        })    
    })
    
    describe("test de Peek", () => {
        it("doit renvoyer une erreur si la pile est vide", () => {
            try{
                const stack = new Stack();
                stack.peek()
            }catch(error){
                expect(error.toString()).toMatch(/error/i)
                expect(error.message).toMatch(/empty/i)
            }
        })
        it("doit retourner le dernier element ajoute dans la pile", () => {
            const stack = new Stack(), data1 = 1, data2 = 2, data3 = 3;
            stack.push(data1);
            stack.push(data2);
            stack.push(data3);
            expect(stack.peek()).toBe(3)
        })
    })

    describe("test de isEmpty", () => {
        it("doit retourner true si la pile est vide", () => {
            const stack = new Stack();
            expect(stack.isEmpty()).toBe(true)
        })
    })

    describe("test de size", () => {
        it("doit retourner le nombre d'element dans la pile", () => {
            const stack = new Stack(), data1 = 1, data2 = 2;
            stack.push(data1);
            stack.push(data2)
            expect(stack.size()).toBe(2)
        })
    })

    describe("test de clear", () => {
        it("doit retourner une pile vide", () => {
            const stack = new Stack(), data1 = 1, data2 = 2;
            stack.push(data1);
            stack.push(data2);
            stack.clear();
            expect(stack.items.length).toBe(0)
        })
    })
})

describe("test de createProduct", () => {
    it("doit retourner un objet avec la propriete success a false si le nom du produit est vide", () => {
        const product = new Product();
        const result = createProduct(product);
        expect(typeof result).toBe('object');
        expect(result.success).toBe(false);
        expect(result.error.code).toMatch(/invalid/i);
        expect(result.error.message).toMatch(/name/i)
    })
    it("doit retourner un objet avec la propriete success a false si le prix est <= 0", () => {
        const product = new Product();
        product.setName("product01");
        product.setPrice(-1200);
        const result = createProduct(product);
        expect(typeof result).toBe('object');
        expect(result.success).toBe(false);
        expect(result.error.code).toMatch(/invalid/i);
        expect(result.error.message).toMatch(/price/i)
    })
    it("doit retourner un objet avec la propriete success a true si le prix est > 0 et le nom du produit est non vide", () => {
        const product = new Product();
        product.setName("product01");
        product.setPrice(2200);
        const result = createProduct(product);
        expect(typeof result).toBe('object');
        expect(result.success).toBe(true);
        expect(result.message).toMatch(/successfully/i)
    })
})

describe("test de isStrongPassword", () => {
    it.each([
        {scenario: "la longueur du mot de passe est inferieur a 8", password: "word",  result: false},
        {scenario: "le mot de passe contient moins d'une lettre majuscule", password: "password1",  result: false},
        {scenario: "le mot de passe contient moins d'une lettre minuscule", password: "PASSWORD1",  result: false},
        {scenario: "le mot de passe contient moins d'un chiffre", password: "PassworD",  result: false},
        {scenario: "le mot de passe ayant au moins une lettre majuscule, minuscule ou un chiffre", password: "PassworD1",  result: true}
    ])("doit retourner $result si $scenario", ({password, result}) => expect(isStrongPassword(password)).toBe(result));
})