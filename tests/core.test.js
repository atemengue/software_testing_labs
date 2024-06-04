
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { calculateDiscount, fetchData, fetchErrorData, getCoupons, isPriceInRange, isValidUsername, Stack } from '../core';


// Exercise: Writing good assertions
describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should return an array with valid coupon codes', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy();
    });
  });

  it('should return an array with valid discounts', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

// Lesson: Positive and negative testing
describe('calculateDiscount', () => {
  it('should return discounted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  it('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
})

// test case 1
// test 1: doit retourner false si le price < min 
// test 2: doit retourner false si le price > max
// test 3: doit retourner true si price est compris entre le min et le max
// test 4: doit retourner true si price est egale a min
// test 5: doit retourner true si price est egale a max 
describe('IsPriceRange with Parameters', () => {
  it.each([
    { scenario: 'price < min', price: -10, min: 0, max: 100, result: false },
    { scenario: 'price > max', price: 110, min: 0, max: 100, result: false },
    { scenario: 'price entre min et max', price: 20, min: 0, max: 100, result: true },
    { scenario: 'price = max', price: 100, min: 0, max: 100, result: true },
    { scenario: 'price = min', price: 0, min: 0, max: 100, result: true }
  ])('doit me retourner $result si $scenario', ({ price, min, max, result }) => {
    expect(isPriceInRange(price, min, max)).toBe(result);
  })

  describe("IsPriceRange Without Parameters", () => {
    test('doit retourner false si le price < min ', () => {
      expect(isPriceInRange(-10, 0, 100)).toBe(false);
    });
    test('doit retourner false si le price > max ', () => {
      expect(isPriceInRange(110, 0, 100)).toBe(false);
    });
    test('doit retourner true si le price est entre le min et le max ', () => {
      expect(isPriceInRange(20, 0, 100)).toBe(true);
    });
    test('doit retourner true si le price = max ', () => {
      expect(isPriceInRange(100, 0, 100)).toBe(true);
    });
    test('doit retourner true si le price = min ', () => {
      expect(isPriceInRange(0, 0, 100)).toBe(true);
    });
  })
});


// Exercise: Boundary testing
describe('isValidUsername', () => {
  const minLength = 5;
  const maxLength = 15;

  it('should return false if username is too short', () => {
    expect(isValidUsername('a'.repeat(minLength - 1))).toBe(false);
  });

  it('should return false if username is too long', () => {
    expect(isValidUsername('a'.repeat(maxLength + 1))).toBe(false);
  });

  it('should return true if username is at the min or max length', () => {
    expect(isValidUsername('a'.repeat(minLength))).toBe(true);
    expect(isValidUsername('a'.repeat(maxLength))).toBe(true);
  });

  it('should return true if username is within the length constraint', () => {
    expect(isValidUsername('a'.repeat(minLength + 1))).toBe(true);
    expect(isValidUsername('a'.repeat(maxLength - 1))).toBe(true);
  });

});

// Lesson: Testing asynchronous code
describe("fetchData", () => {
  it("Should return data if promise is resolve", async () => {
    const data = await fetchData();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0)
  })
});

// Lesson: Testing Promise with Error
describe("fetchErrorData", () => {
  it("Should return a promise that with resolve to an array of numbers", async () => {
    try {
      await fetchErrorData()
    } catch (error) {
      expect(error).toHaveProperty('reason');
      expect(error.reason).toMatch(/fail/i);
    }
  })
});


// Setup testwith functions
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


describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('push should add an item to the stack', () => {
    stack.push(1);

    expect(stack.size()).toBe(1);
  });

  it('pop should remove and return the top item from the stack', () => {
    stack.push(1);
    stack.push(2);

    const poppedItem = stack.pop();

    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });

  it('pop should throw an error if stack is empty', () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });

  it('peek should return the top item from the stack without removing it', () => {
    stack.push(1);
    stack.push(2);

    const peekedItem = stack.peek();

    expect(peekedItem).toBe(2);
    expect(stack.size()).toBe(2);
  });

  it('peek should throw an error if stack is empty', () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });

  it('isEmpty should return true if stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it('isEmpty should return false if stack is not empty', () => {
    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  it('size should return the number of items in the stack', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.size()).toBe(2);
  });

  it('clear should remove all items from the stack', () => {
    stack.push(1);
    stack.push(2);

    stack.clear();

    expect(stack.size()).toBe(0);
  });
});