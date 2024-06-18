
  import { today,next7Days,next30Days } from './filters.js';
  import { test, describe, expect } from 'vitest';
  //fonction today
  
describe('tester la fonction today', () => {
    test('La fonction aujourd\'hui renvoie true pour une date avec le même jour, mois et année mais heure différente', () => {
      // Créer un objet Date pour la date d'aujourd'hui à une heure différente
      const eventDate = new Date();
      eventDate.setHours(23, 59, 59);
  
      // Créer un objet événement avec la date eventDate
      const event = { date: eventDate };
  
      // Vérifier que la fonction today renvoie true pour l'événement
      expect(today(event)).toBe(true);
    });
  
    // Les autres tests peuvent rester inchangés car ils ne dépendent pas de l'heure
  });
  

test('La fonction aujourd\'hui renvoie false pour une date dans le passé', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    pastDate.setHours(12, 0, 0);

    const event = { date: pastDate };

    expect(today(event)).toBe(false);
});

test('La fonction aujourd\'hui renvoie false pour une date dans le futur', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    futureDate.setHours(12, 0, 0);

    const event = { date: futureDate };

    expect(today(event)).toBe(false);
});

test('La fonction aujourd\'hui renvoie true pour une date avec le même jour, mois et année', () => {
    const todayDate = new Date();
    todayDate.setHours(12, 0, 0);

    const event = { date: todayDate };

    expect(today(event)).toBe(true);
});

test('La fonction aujourd\'hui renvoie false pour une date avec une année différente', () => {
    const pastYearDate = new Date();
    pastYearDate.setFullYear(pastYearDate.getFullYear() - 1);
    pastYearDate.setHours(12, 0, 0);

    const event = { date: pastYearDate };

    expect(today(event)).toBe(false);
});

//fonction next7Days
describe('tester la fonction next7Days',() => {

test('La fonction next7Days renvoie true pour une date dans les 7 prochains jours', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    futureDate.setHours(12, 0, 0);

    const event = { date: futureDate };

    expect(next7Days(event)).toBe(true);
});

test('La fonction next7Days renvoie false pour une date dans le passé', () => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 1);
  pastDate.setHours(12, 0, 0);

  const event = { date: pastDate };

  expect(next7Days(event)).toBe(false);
});

test('La fonction next7Days renvoie true pour une date un jour dans le futur', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);
  futureDate.setHours(12, 0, 0);

  const event = { date: futureDate };

  expect(next7Days(event)).toBe(true);
});

test('La fonction next7Days renvoie true pour une date avec le même jour, mois et année', () => {
  const todayDate = new Date();
  todayDate.setHours(12, 0, 0);

  const event = { date: todayDate };

  expect(next7Days(event)).toBe(true);
});

test('La fonction next7Days renvoie false pour une date avec une année différente', () => {
  const pastYearDate = new Date();
  pastYearDate.setFullYear(pastYearDate.getFullYear() - 1);
  pastYearDate.setHours(12, 0, 0);

  const event = { date: pastYearDate };

  expect(next7Days(event)).toBe(false);
});
});
//fonction next30Days

describe('tester la fonction next30Days',() => {

  test('La fonction next30Days renvoie true pour une date dans les 30 prochains jours', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    futureDate.setHours(12, 0, 0);

    const event = { date: futureDate };

    expect(next30Days(event)).toBe(true);
  });

  test('La fonction next30Days renvoie false pour une date dans le passé', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    pastDate.setHours(12, 0, 0);

    const event = { date: pastDate };

    expect(next30Days(event)).toBe(false);
  });

  test('La fonction next30Days renvoie true pour une date un jour dans le futur', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    futureDate.setHours(12, 0, 0);

    const event = { date: futureDate };

    expect(next30Days(event)).toBe(true);
  });

  test('La fonction next30Days renvoie true pour une date avec le même jour, mois et année', () => {
    const todayDate = new Date();
    todayDate.setHours(12, 0, 0);

    const event = { date: todayDate };

    expect(next30Days(event)).toBe(true);
  });
  test('La fonction next30Days renvoie false pour une date avec une année différente', () => {
    const pastYearDate = new Date();
    pastYearDate.setFullYear(pastYearDate.getFullYear() - 1);
    pastYearDate.setHours(12, 0, 0);

    const event = { date: pastYearDate };

    expect(next30Days(event)).toBe(false);
  });
});





