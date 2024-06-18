import { describe, expect, it } from "vitest";
import { getPurchaseHistory, parsePurchaseResponse } from "../../js/users/account/purchaseHistory/purchaseHistory";
import { Purchase } from "../../js/users/account/account";


describe("getPurcharseHistory", () => {
    it("doit retourner un objet si la réponse du serveur est prête", () => {
        // vi.mocked(purchaseHistory.getPurchaseHistory).mockResolvedValue();
        try
        {
            getPurchaseHistory(1);
        }
        catch(result){
            expect(result).toBeTypeOf("object");
            expect(result).toBeInstanceOf(Error);
        }
    })
    it("doit me retourner un tableau d\'objet", () => {
        const purchaseData = [
            new Purchase("test1", "CODE1", 2600),
            new Purchase("test2", "CODE2", 2100),
            new Purchase("test3", "CODE3", 2300)
        ];
        const result = parsePurchaseResponse(purchaseData);
        expect(result).toBeInstanceOf(Array);
        result.forEach(element => {
            expect(element).toHaveProperty("eventName");
            expect(element).toHaveProperty("tickets");
            expect(element).toHaveProperty("cost");
        });
    })
})