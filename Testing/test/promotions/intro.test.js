import {expect,test,describe} from 'vitest'
import { max,calcluerMoyenne,ManagemetMarks} from '../../../intro'

describe('test max function',()=>{
    test("should return b if b>a ",()=>{
            const a=5;
            const b=6;
            const attend=6;

        const resulttat =max(a,b);
        expect(resulttat).toBe(attend);
        }),

    test("should return a if a>b ",()=>{
            const b=5;
            const a=6;
            const attend=6;

        const resulttat =max(a,b);
        expect(resulttat).toBe(attend);
        }),
    test("should return b or if b equal to a ",()=>{
            const a=6;
            const b=6;
            const attend=6;

        const resulttat =max(a,b);
        expect(resulttat).toBe(attend);
        })
})
// TTd
describe('calculer moyenne',()=>{
    test("should return null if array is empty",()=>{
            let tab=[]

            let rest=calcluerMoyenne(tab)
        expect(rest).toBe(NaN);
        })
    test("should return value of element if array is not empty and contain one element",()=>{
            let tab=[0]
        expect(calcluerMoyenne([0])).toBe(0);
        })

    test("should return moy if length of tab is sup than 1",()=>{
            let tab=[1,2,3]

            let rest=calcluerMoyenne(tab)
        expect(rest).toBe(2);
        })
    })

    // calcul de la note d'un etudiant
    describe('calculer la note final ',()=>{

        test("should return good note if the boundary is respected",()=>{
            const cc= 15;
            const tp= 25;
            const ee=29;
            const resultat_A=69;
            const resultat_O=ManagemetMarks(cc,tp,ee);

            expect(resultat_O).toBe(resultat_A);
        })
         test("should return an error if the cc is not between 0 and 20 respected",()=>{
            const cc= 25;
            const tp= 25;
            const ee=29;
            const resultat_O=ManagemetMarks(cc,tp,ee);

            expect(resultat_O).toMatch(/error/);
        })
         test("should return an error if the tp is not between 0 and 30 respected",()=>{
            const cc= 15;
            const tp= 50;
            const ee=29;
            const resultat_O=ManagemetMarks(cc,tp,ee);

            expect(resultat_O).toMatch(/error/);
        })
         test("should return an error if the ee is not between 0 and 50 respected",()=>{
            const cc= 15;
            const tp= 25;
            const ee=55;
            const resultat_O=ManagemetMarks(cc,tp,ee);

            expect(resultat_O).toMatch(/error/);
        })

         test("should return an error if the cc is not a number ",()=>{
            const ee= 15;
            const tp= 25;
            const cc='10';
            const resultat_O=ManagemetMarks(cc,tp,ee);

            expect(resultat_O).toMatch(/error/);
        })
         test("should return an error if the tp is not a number ",()=>{
            const cc= 15;
            const ee= 25;
            const tp='10';
            const resultat_O=ManagemetMarks(cc,tp,ee);

            expect(resultat_O).toMatch(/error/);
        })
         test("should return an error if the ee is not a number ",()=>{
            const cc= 15;
            const tp= 25;
            const ee='10';
            const resultat_O=ManagemetMarks(cc,tp,ee);

            expect(resultat_O).toMatch(/error/);
        })

         test("should return an error if the ee or cc tp is null ",()=>{
            const cc= 15;
            const tp= 25;
            let ee;
            const resultat_O=ManagemetMarks(cc,tp,ee);

            expect(resultat_O).toMatch(/error/);
        })
    })