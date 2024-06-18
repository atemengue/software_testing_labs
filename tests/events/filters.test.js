import { today, next7Days, next30Days } from '../../js/events/filters';

describe('today()', () => {
  test('today_EventEnJour', () => {
    // Arrange
    const eventDate = new Date();
    const event = { date: eventDate };

    // Act
    const isToday = today(event);

    // Assert
    expect(isToday).toBe(true);
  });

  test('today_EventPasEnJour', () => {
    // Arrange
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 1);
    const event = { date: eventDate };

    // Act
    const isToday = today(event);

    // Assert
    expect(isToday).toBe(false);
  });
});

describe('next7Days()', () => {
  test('next7Days_EventDansLesProchains7Jours', () => {
    // Arrange
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 3);
    const event = { date: eventDate };

    // Act
    const isWithin7Days = next7Days(event);

    // Assert
    expect(isWithin7Days).toBe(true);
  });

  test('next7Days_EventPasDansLesProchains7Jours', () => {
    // Arrange
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 8);
    const event = { date: eventDate };

    // Act
    const isWithin7Days = next7Days(event);

    // Assert
    expect(isWithin7Days).toBe(false);
  });
});

describe('next30Days()', () => {
  test('next30Days_EventDansLesProchains30Jours', () => {
    // Arrange
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 15);
    const event = { date: eventDate };

    // Act
    const isWithin30Days = next30Days(event);

    // Assert
    expect(isWithin30Days).toBe(true);
  });

  test('next30Days_EventPasDansLesProchains30Jours', () => {
    // Arrange
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 31);
    const event = { date: eventDate };

    // Act
    const isWithin30Days = next30Days(event);

    // Assert
    expect(isWithin30Days).toBe(false);
  });
});
