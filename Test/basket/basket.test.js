import {test,expect,describe,it,vi, expectTypeOf} from 'vitest'
import {showAdverts,calculateTotal,searchBasket,getBasketItem,createBasketItem,serializeBasketItemsToJson} from './js/basket/basket.js'
import{BasketItem} from './js/basket/basketitem'
import{Event} from './js/events/event'
import{User}from './js/users/users'


describe("calculateTotal", () => {
    test("doit me retourner la somme pour un Panier vide", () => {
      const basketItems = [];
      const result = calculateTotal(basketItems);
      expect(result).toBe(0);
    });
  
    test("doit me retourne la somme pour un panier contenant un seul élément ", () => {
        const event = new Event(1,'ballon',50,30,10,"12/01/24")
      const basketItems = [new BasketItem(event, 1)];
      const result = calculateTotal(basketItems);
      expect(result).toBe(50);
    });
  
    test("Doitme retourner la somme pour plusieurs éléments dans le panier", () => {
        const event1 = new Event(1,'ballon',50,30,10,"12/01/24");
        const event2 = new Event(1,'ballon',75,30,10,"12/01/24")
        const basketItems = [
        new BasketItem(event1, 2),
        new BasketItem(event2, 1),
      ];
      const result = calculateTotal(basketItems);
      expect(result).toBe(175);
    });
  
    test("doit me retourner la somme pour des element avec remise", () => {
        const event1 = new Event(1,'ballon',50,30,10,"12/01/24");
        const event2 = new Event(1,'ballon',75,30,10,"12/01/24")
        const basketItems = [
        new BasketItem(event1, 2),
        new BasketItem(event2, 1),
      ];
      const discount = 20;
      const result = calculateTotal(basketItems, discount);
      expect(result).toBe(155);
    });
  });



describe("testing showAdverts",()=>{
 
    let _user=new User(1,"jean");
    it.each([{scenario:" type of user =User",user:_user,resultat:true},
        {scenario:" l'utilisateur n'est pas premium",user:_user,resultat:true}
    ])("doit me retourner $resultat si $scenario",({user,resultat})=>{
        expect(showAdverts(user)).toBe(resultat);
    })
})



describe("searchBasket", () => {
  let event1, event2, event3, basketItem1, basketItem2, basketItem3, basketItems;


    event1 = new Event(1, "Ballon d'Or", 100, 50, 20, "2024-06-15");
    event2 = new Event(2, "Concert de U2", 80, 40, 10, "2024-07-01");
    event3 = new Event(3, "Exposition d'art", 50, 30, 5, "2024-08-01");

    basketItem1 = new BasketItem(event1, 2);
    basketItem2 = new BasketItem(event2, 1);
    basketItem3 = new BasketItem(event3, 3);

    basketItems = [basketItem1, basketItem2, basketItem3];


  test("Doit me retourner un item avec une correspondance partielle", () => {
    const searchQuery = "ballon";
    const result = searchBasket(basketItems, searchQuery);
    expect(result).toHaveLength(1);
    expect(result[0].event.name).toBe("Ballon d'Or");
  });

  test("doit me retourne un item avec une  correspondance exacte", () => {
    const searchQuery = "Concert de U2";
    const result = searchBasket(basketItems, searchQuery);
    expect(result).toHaveLength(1);
    expect(result[0].event.name).toBe("Concert de U2");
  });

  test("Doit me retoune un tableau vide pour une recherche sans correspondance", () => {
    const searchQuery = "Théâtre";
    const result = searchBasket(basketItems, searchQuery);
    expect(result).toHaveLength(0);
  });

  test("doit me retourner un tableau vide pour une recherche dans un panier vide", () => {
    const emptyBasketItems = [];
    const searchQuery = "Ballon";
    const result = searchBasket(emptyBasketItems, searchQuery);
    expect(result).toHaveLength(0);
  });
});



describe("getBasketItem", () => {
  let event1, event2, basketItem1, basketItem2, basketItems;


    event1 = new Event(1, "Ballon d'Or", 100, 50, 20, "2024-06-15");
    event2 = new Event(2, "Concert de U2", 80, 40, 10, "2024-07-01");

    basketItem1 = new BasketItem(event1, 2);
    basketItem2 = new BasketItem(event2, 1);

    basketItems = [basketItem1, basketItem2];

  test("Doit me retourner  un BasketItem existant dans le panier", () => {
    const result = getBasketItem(basketItems, event1);
    expect(result).toEqual(basketItem1);
  });

  test("Doit me retourner null si l'item n'est pas dans le panier", () => {
    const event3 = new Event(3, "Exposition d'art", 50, 30, 5, "2024-08-01");
    const result = getBasketItem(basketItems, event3);
    expect(result).toBeNull();
  });

  test("doit me retourner null si le panier est  vide", () => {
    const emptyBasketItems = [];
    const result = getBasketItem(emptyBasketItems, event1);
    expect(result).toBeNull();
  });
});

describe('createBasketItem', () => {
  const event1 = new Event(
    1,
   'Ballon d\'Or',
   '2024-06-15',
  100,
  50,
   20,
 );
 const basketItem1 = new BasketItem(event1, 3);
it('doit me retourner null si l\'element existe deja dans le panier', () => {

  const result = createBasketItem([basketItem1], event1, 3);
  console.log(result);
  expect(result).toBe(null);
});

 it('Doit créer un nouveau BasketItem', () => {
   const result = createBasketItem([], event1, 3);
   expect(result).toEqual(new BasketItem(event1, 3));
 });

});

describe('serializeBasketItemsToJson',()=>{


 
 
  it("doit me retourner un tableau d'items",()=>{
const basketItem1 = new BasketItem(  new Event( 1,'Ballon d\'Or','2024-06-15',100,50,20,), 3);

     const appel = serializeBasketItemsToJson([basketItem1]);
     expect(Array.isArray(appel)).toBe(true);
     expect(appel.length).toBeGreaterThan(0)
    
  
  })

  it("doit me retourner un tableau d'item ayant une propriete event valide",()=>{
    const basketItem1 = new BasketItem(  new Event( 1,'Ballon d\'Or','2024-06-15',100,50,20,), 3);

     const appel = serializeBasketItemsToJson([basketItem1]);
     appel.forEach((item) => {
      expect(item).toHaveProperty('event')
      expect(typeof item.event).toBe('object')
      expect( item.event).toBeTruthy();
     });
  });

  it("doit me retourner un tableau d'item ayant une propriete event valide",()=>{
    const basketItem1 = new BasketItem(  new Event( 1,'Ballon d\'Or','2024-06-15',100,50,20,), 3);

     const appel = serializeBasketItemsToJson([basketItem1]);
     appel.forEach((item) => {
      expect(item).toHaveProperty('ticketCount')
      expect(typeof item.ticketCount).toBe('number')
      expect( item.event).toBeTruthy();
      expect(item.ticketCount).toBeGreaterThan(0)
     });
  })
})
