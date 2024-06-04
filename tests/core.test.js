// test case 1
// test 1: doit retourner false si le price < min 
// test 2: doit retourner false si le price > max
// test 3: doit retourner true si price est compris entre le min et le max
// test 4: doit retourner true si price est egale a min
// test 5: doit retourner true si price est egale a max 

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { isPriceInRange } from '../core';

describe('IsPriceRange', () => {
  it.each([
    { scenario: 'price < min', price: -10, min: 0, max: 100, result: false },
    { scenario: 'price > max', price: 110, min: 0, max: 100, result: false },
    { scenario: 'price entre min et max', price: 20, min: 0, max: 100, result: true },
    { scenario: 'price = max', price: 100, min: 0, max: 100, result: true },
    { scenario: 'price = min', price: 0, min: 0, max: 100, result: true }
  ])('doit me retourner $result si $scenario', ({ price, min, max, result }) => {
    expect(isPriceInRange(price, min, max)).toBe(result);
  })


  // test('doit retourner false si le price < min ', () => {
  //   expect(isPriceInRange(-10, 0, 100)).toBe(false);
  // });
  // test('doit retourner false si le price > max ', () => {
  //   expect(isPriceInRange(110, 0, 100)).toBe(false);
  // });
  // test('doit retourner true si le price est entre le min et le max ', () => {
  //   expect(isPriceInRange(20, 0, 100)).toBe(true);
  // });
  // test('doit retourner true si le price = max ', () => {
  //   expect(isPriceInRange(100, 0, 100)).toBe(true);
  // });
  // test('doit retourner true si le price = min ', () => {
  //   expect(isPriceInRange(0, 0, 100)).toBe(true);
  // });

});

describe("test suite", () => {
  beforeEach(() => {
    console.log("before each log");
  });

  beforeAll(() => {
    console.log('before all')
  })

  test("test case 1", () => {
  });

  test("test case 2", () => {
  });

  afterEach(() => {
    console.log('after each test case')
  });

  afterAll(() => {
    console.log('after all')
  })
})

describe("test suite", () => {
  it("test case", () => {

    // create a mock for the following function


    // Call the mock function is called


    // Assert that the result is 'ok'
  })
})

