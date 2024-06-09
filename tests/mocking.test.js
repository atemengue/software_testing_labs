// Mocks

// Mock functions
// Partial mocking
// Spies

// Terms
// Summary

// • Mock functions simulate the behavior of real functions, allowing you to control their
// output and behavior during testing. They are useful for isolating specific code paths
// and testing functions in isolation.

// • Mock functions can be created using vi.fn().

// • You can mock an entire module and replace all exported functions with mocks using
// vi.mock().

// • Partial mocking is valuable for mocking parts of a module while retaining some of its
// original behavior.

// • Function spying allows you to monitor and record calls to functions during testing.
// They’re useful for tracking function invocations and arguments without modifying
// their behavior.

// Mocks should be cleared before or after each test to ensure a clean slate for
// subsequent tests.

// • While mocks are valuable for isolating and testing specific units, they can result in
// tests becoming tightly coupled to implementation details. Such tests may become
// fragile and break as the implementation evolves. Therefore, use mocks primarily to
// replace external dependencies that may be unavailable or slow during test
// execution, such as databases, the file system, APIs, etc.


// • Tests should not be dependent on the current date and time as this can lead to
// different results during different test runs. Mocking dates and times is useful when
// testing time-sensitive logic to maintain result consistency.


import { describe, expect, it, vi } from 'vitest';
import { trackPageView } from '../libs/analytics';
import { getExchangeRate } from '../libs/currency';
import { sendEmail } from '../libs/email';
import { charge } from '../libs/payment';
import security from '../libs/security';
import { getShippingQuote } from '../libs/shipping';
import {
  getDiscount,
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from '../mocking';

// Parcourir les fichiers package.json la section script pour tester les commandes du projet.
// mock des modules, 
//les fichiers contenant des functions doubles doivent etre mocker
vi.mock('../libs/currency');
vi.mock('../libs/shipping');
vi.mock('../libs/analytics');
vi.mock('../libs/payment');


// Ici nous fesons un mock partiel du module email
// ils sont utilises lorsqu'on ne veut pas mocker toutes
// les fonctions d'un module
vi.mock('../libs/email', async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

// Exemple de test suite avec des mocks.
describe('test suite', () => {
  it('test case', () => {

    // Create a mock for the following function
    // Creation d'un mock (Double avec la function vi.fn())
    // Ce mock ne remplace aucune fonction
    const sendText = vi.fn();
    sendText.mockReturnValue('ok');

    // Call the mock function
    const result = sendText('message');

    // Assert that the mock function is called
    expect(sendText).toHaveBeenCalledWith('message');
    // Assert that the result is 'ok'
    expect(result).toBe('ok');
  });
});

describe('getPriceInCurrency', () => {
  it('should return price in target currency', () => {

    // mock et isolation
    vi.mocked(getExchangeRate).mockReturnValue(650);

    // Act
    const price = getPriceInCurrency(10, 'FCFA');

    // Assert
    expect(price).toBe(6500);
  });
});



describe('renderPage', () => {
  it('should return correct content', async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it('should call analytics', async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});


describe('submitOrder', () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: '1234' };

  it('should charge the customer', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it('should return success when payment is successful', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });

  it('should return success when payment is successful', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'failed' });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: 'payment_error' });
  });
});

describe('signUp', () => {
  const email = 'name@domain.com';

  it('should return false if email is not valid', async () => {
    const result = await signUp('a');

    expect(result).toBe(false);
  });

  it('should return true if email is valid', async () => {
    const result = await signUp(email);

    expect(result).toBe(true);
  });

  it('should send the welcome email if email is valid', async () => {
    await signUp(email);

    expect(sendEmail).toHaveBeenCalledOnce();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});

// Lesson: Spying on functions
describe('login', () => {
  it('should email the one-time login code', async () => {
    const email = 'name@domain.com';
    const spy = vi.spyOn(security, 'generateCode');

    await login(email);

    const securityCode = spy.mock.results[0].value.toString();
    expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
  });
});

describe('isOnline', () => {
  it('should return false if current hour is outside opening hours', () => {
    //mocking a date  setSytemTimes
    vi.setSystemTime('2024-01-01 07:59');
    expect(isOnline()).toBe(false);

    //mocking a date 
    vi.setSystemTime('2024-01-01 20:01');
    expect(isOnline()).toBe(false);
  });

  it('should return true if current hour is within opening hours', () => {

    vi.setSystemTime('2024-01-01 08:00');
    expect(isOnline()).toBe(true);

    vi.setSystemTime('2024-01-01 19:59');
    expect(isOnline()).toBe(true);
  });
});

describe('getDiscount', () => {
  it('should return .2 on Christmas day', () => {
    //mocking a date 
    vi.setSystemTime('2024-12-25 00:01');
    expect(getDiscount()).toBe(0.2);

    vi.setSystemTime('2024-12-25 23:59');
    expect(getDiscount()).toBe(0.2);
  });

  it('should return 0 on any other day', () => {
    vi.setSystemTime('2024-12-24 00:01');
    expect(getDiscount()).toBe(0);

    vi.setSystemTime('2024-12-26 00:01');
    expect(getDiscount()).toBe(0);
  });
});