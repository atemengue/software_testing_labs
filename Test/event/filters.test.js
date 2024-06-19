import {test,expect,describe} from 'vitest'
import {today,next7Days,next30Days, } from './js/events/filters'
import{Event} from './js/events/event'

describe('today()', () => {
    let dat = new Date()
    let event = new Event(1,'ballon',500,30,0,dat)
    let event11 = new Event(1,'ballon',500,30,0,dat)
  test('doit me retourner true lorsque la date de l\'evenement est aujoud\'hui', () => {
    expect(today(event)).toBe(true);
  });

  test('doit me retourner false lorsque la date de l\'evenement n\'est pasaujourd\'hui', () => {
    const event11 = { date: new Date('2024-06-12') };
    expect(today(event11)).toBe(false);
  });

  test('doit me retourner false lorsque la date de l\'evenement est avant aujourd\'hui', () => {
    const event = { date: new Date('2024-06-12') };
    expect(today(event)).toBe(false);
  });


});

describe('next7Days()', () => {
  test('doit me retourner true lorsque la date de l\'evenement est entre les 7 prochains jours', () => {
    let dat = new Date('2024-06-20')
    const event = new Event(1,'ballon',500,30,0,dat)
    expect(next7Days(event)).toBe(true);
  });

  test('doit me retourner true lorsque la date de l\'evnement est le jour 7', () => {
    let dat = new Date('2024-06-20')
    const event = new Event(1,'ballon',500,30,0,dat)
    expect(next7Days(event)).toBe(true);
  });

  test('doit me retourner false lorsque la date de l\'evenement est a l\'exterieur des 7 prochains jours', () => {
    let dat = new Date('2024-06-27')
    const event = new Event(1,'ballon',500,30,0,dat)
    expect(next7Days(event)).toBe(false);
  });

  test('doit me retourner false lorsque la date de l\'evenement est avant les 7 prochains jours', () => {
    let dat = new Date('2024-06-12')
    const event = new Event(1,'ballon',500,30,0,dat)
    expect(next7Days(event)).toBe(false);
  });

  test('doit me retourner false lorsque la date de l\'evenement est null', () => {
    let dat = new Date('2024-06-15')
    const event = new Event(1,'ballon',500,30,0,)
    expect(next7Days(event)).toBe(false);
  });


});

describe('next30Days()', () => {
  test('doit me retourner true lorsque la date de l\'evenement est entre les 30 prochains jours', () => {
    const event = { date: new Date('2024-07-10') };
    expect(next30Days(event)).toBe(true);
  });

  test('doit me retourner true lorsque la date de l\'evnement est le jour 30', () => {
    const event = { date: new Date('2024-07-13') };
    expect(next30Days(event)).toBe(true);
  });

  test('doit me retourner false lorsque la date de l\'evenement est a l\'exterieur des 30 prochains jours', () => {
    const event = { date: new Date('2024-07-31') };
    expect(next30Days(event)).toBe(false);
  });

  test('doit me retourner false lorsque la date de l\'evenement est avant les 30 prochains jours', () => {
    const event = { date: new Date('2024-06-12') };
    expect(next30Days(event)).toBe(false);
  });

  test('doit me retourner false lorsque la date de l\'evenement est null', () => {
    let dat = new Date('2024-06-15')
    const event = new Event(1,'ballon',500,30,0,)
    expect(next30Days(event)).toBe(false);
  });

});


