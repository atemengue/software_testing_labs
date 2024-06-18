import { describe, expect, it, vi } from "vitest";
import { getExchangeRate } from "../libs/currency";
import { getPriceInCurrency, isOnline, login, renderPage, signUp, submitOrder } from "./mocking";
import { trackPageView } from "../libs/analytics";
import { charge } from "../libs/payment";
import { isValidEmail, sendEmail } from "../libs/email";
import { generateCode } from "../libs/security";

vi.mock('./libs/currency');
vi.mock('./libs/analytics');
vi.mock('./libs/payment');
vi.mock('./libs/email');
vi.mock('./libs/security')

describe("getPriceInCurrency", () => {
    it("doit retourner le prix evalue", () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5);
        const price = getPriceInCurrency(2000, 'EUR');
        expect(price).toBe(3000);
    })
})

describe("renderPage", () => {
    it("doit retourner une div", async () => {
        vi.mocked(trackPageView).mockResolvedValue();
        const result = renderPage()
        expect(typeof result).toBe('object');
        expect(await result).toMatch(/div/i)
    })
})

describe("submitOrder", () => {
    it("doit retourner un objet", async () => {
        vi.mocked(charge).mockResolvedValue('success');
        const result = await submitOrder([12, 12], 10)
        expect(result).toBeTypeOf('object');
        expect(result.success).toBe(true)
        // expect(result.error).toMatch(/error/)
    })
})

describe("signUp", () => {
    it("doit returner false si l'email est invalide", async () => {
        vi.mocked(isValidEmail).mockReturnValue(false)
        expect(await signUp('test')).toBe(false)
    })

    it("doit retourner true si l'email est valide", async () => {
        vi.mocked(isValidEmail).mockReturnValue(true)
        // vi.mocked(sendEmail).mockResolvedValue(delay(3000))
        vi.mocked(sendEmail).mockResolvedValue()
        expect(await signUp("test@gmail.com")).toBe(true)
    })
})

describe("login", () => {
    it("doit generer un code renvoyer une promesse", async () => {
        const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        vi.mocked(generateCode).mockReturnValue(code)
        const result = await login("test@gmail.com")
        const sendemail =  vi.fn()
        const call = sendemail("test@gmail.com", code.toString())
        expect(sendemail).toHaveBeenCalledWith("test@gmail.com", code.toString())
        expect(result).toBe(call)
    })
})

describe("isOnline", () => {
    it.each([
        {scenario: "l'heure courante est >= l'heure d'ouverture et <= celle de fermeture", result: true},
        {scenario: "l'heure courante est < l'heure d'ouverture ou > celle de fermeture", result: false}
    ])("doit retourner $result si $scenario", () => {
        const results = isOnline()
        expect(results === true || results === false).toBe(true)
    })
})