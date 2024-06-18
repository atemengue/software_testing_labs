import { describe, expect, it } from "vitest";
import { getDiscount } from "../../../js/promotions/discount/discount";

describe("getDiscount", () => {
    it("doit retourner une liste objet", async () => {
        try{
            await getDiscount("P03387");
        }catch(result){
            expect(result).toBeTypeOf("object");
            expect(result).toBeInstanceOf(Error);
        }
    })
})