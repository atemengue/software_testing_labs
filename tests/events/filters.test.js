import { describe, test, it, expect } from 'vitest';
import { today, next7Days, next30Days } from '../../js/events/filters';

describe('today Function', () => {
  test('Should return true if the date of event is the current day', () => {
    // Arrange
    const eventDate = new Date();
    const event = { date: eventDate };

    // Act
    const isToday = today(event);

    // Assert
    expect(isToday).toBe(true);
  });

  test('Should return false if the date of event is not the current day', () => {
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

describe('Next7Days Function', () => {
  test('Should return true if the event date is not the next 7 days', () => {
    // Arrange
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 3);
    const event = { date: eventDate };

    // Act
    const isWithin7Days = next7Days(event);

    // Assert
    expect(isWithin7Days).toBe(true);
  });

  test('Should return false if the event date is not in the next 7 days', () => {
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

describe('next30Days Function', () => {
  test('Should return true if the event date is in the next 30 days', () => {
    // Arrange
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 15);
    const event = { date: eventDate };

    // Act
    const isWithin30Days = next30Days(event);

    // Assert
    expect(isWithin30Days).toBe(true);
  });

  test('Should return false if the event date is not in the next 30 days', () => {
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