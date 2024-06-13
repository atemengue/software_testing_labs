import { Event, isSoldOut, getTagLine, createEvent } from '../../js/events/event';
import { InvalidEventNameError, InvalidEventPriceError } from '../../js/error-handling/exceptions';

describe('createEvent()', () => {
    test('CreateEvent_AvecEntreesValides', () => {
      // Arrange
      const name = 'Concert de musique classique';
      const price = 50.00;
      const availableTickets = 1000;
  
      // Act
      const event = createEvent(name, price, availableTickets);
  
      // Assert
      expect(event.name).toBe(name);
      expect(event.ticketPrice).toBe(price);
      expect(event.totalTickets).toBe(availableTickets);
      expect(event.ticketsRemaining).toBe(availableTickets);
    });
  
    test('CreateEvent_AvecEntreesInvalides', () => {
      // Arrange
      const invalidName = 123;
      const invalidPrice = -10.00;
      const invalidTickets = 0;
  
      // Act & Assert
      expect(() => createEvent(invalidName, 50, 100)).toThrowError(InvalidEventNameError);
      expect(() => createEvent('Event', invalidPrice, 100)).toThrowError(InvalidEventPriceError);
      expect(() => createEvent('Event', 50, invalidTickets)).toThrowError(InvalidEventPriceError);
    });
  });

describe('isSoldOut()', () => {
  test('IsSoldOut_AvecEtSansTicketsRestants', () => {
    // Arrange
    const soldOutEvent = new Event(1, 'Sold Out Event', 50, 100, 0, new Date());
    const availableEvent = new Event(2, 'Available Event', 50, 100, 50, new Date());

    // Act
    const isSoldOutResult = isSoldOut(soldOutEvent);
    const isAvailableResult = isSoldOut(availableEvent);

    // Assert
    expect(isSoldOutResult).toBe(true);
    expect(isAvailableResult).toBe(false);
  });
});

describe('getTagLine()', () => {
  test('GetTagLine_AvecDifferentsEtats', () => {
    // Arrange
    const soldOutEvent = new Event(1, 'Sold Out Event', 50, 100, 0, new Date());
    const lowTicketsEvent = new Event(2, 'Low Tickets Event', 50, 100, 5, new Date());
    const popularEvent = new Event(3, 'Popular Event', 50, 100, 50, new Date());
    const unpopularEvent = new Event(4, 'Unpopular Event', 50, 100, 50, new Date());
    const minimumTicketCount = 10;

    // Act
    const soldOutTagLine = getTagLine(soldOutEvent, minimumTicketCount, false);
    const lowTicketsTagLine = getTagLine(lowTicketsEvent, minimumTicketCount, false);
    const popularTagLine = getTagLine(popularEvent, minimumTicketCount, true);
    const unpopularTagLine = getTagLine(unpopularEvent, minimumTicketCount, false);

    // Assert
    expect(soldOutTagLine).toBe('Event Sold Out!');
    expect(lowTicketsTagLine).toBe('Hurry only 5 tickets left!');
    expect(popularTagLine).toBe( `This Event is getting a lot of interest. Don't miss out, purchase your ticket now!`);
    expect(unpopularTagLine).toBe("Don't miss out, purchase your ticket now!");
  });
});

