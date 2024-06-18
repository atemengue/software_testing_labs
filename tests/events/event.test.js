import { describe, it, expect, vi } from 'vitest';
import { Event, isSoldOut, getTagLine, createEvent } from '../../js/events/event';
import { InvalidEventNameError, InvalidEventPriceError } from '../../js/error-handling/exceptions';

// IsSoldOut Function Test
describe('isSoldOut Function', () => {
    // Test case 1
    it('Should return true if the tickets Remaining is equal to zero (0)', () => {
        const mockedEvent = vi.mocked(
            new Event(1, 'NK', 500, 100, 0, '06/07/2000')
        );
        expect(isSoldOut(mockedEvent)).toBeTruthy();
    });

    // Test case 2
    it('Should return false if the tickets Remaining is not equal to zero (0)', () => {
        const mockedEvent = vi.mocked(
            new Event(1, 'NK', 500, 100, 150, '06/07/2000')
        );
        expect(isSoldOut(mockedEvent)).toBeFalsy();
    });
});

// GetTagLine Function Test
describe('GetTagLine Function', () => {
    // Test case 1
  it('GetTagLine_AvecDifferentsEtats', () => {

    // Arrange
    const soldOutEvent = new Event(1, 'Sold Out Event', 50, 100, 0, new Date());
    const lowTicketsEvent = new Event(2, 'Low Tickets Event', 50, 100, 5, new Date());
    const otherTicketsEvent = new Event(2, 'Low Tickets Event', 50, 100, 1, new Date());
    const popularEvent = new Event(3, 'Popular Event', 50, 100, 50, new Date());
    const unpopularEvent = new Event(4, 'Unpopular Event', 50, 100, 50, new Date());
    const minimumTicketCount = 10;

    // Act
    const soldOutTagLine = getTagLine(soldOutEvent, minimumTicketCount, false);
    const lowTicketsTagLine1 = getTagLine(lowTicketsEvent, minimumTicketCount, false);
    const lowTicketsTagLine2 = getTagLine(otherTicketsEvent,minimumTicketCount, false);
    const popularTagLine = getTagLine(popularEvent, minimumTicketCount, true);
    const unpopularTagLine = getTagLine(unpopularEvent, minimumTicketCount, false);

    // Assert
    expect(soldOutTagLine).toBe('Event Sold Out!');
    expect(lowTicketsTagLine1).toBe('Hurry only 5 tickets left!');
    expect(lowTicketsTagLine2).toBe('Hurry only 1 ticket left!');
    expect(popularTagLine).toBe( `This Event is getting a lot of interest. Don't miss out, purchase your ticket now!`);
    expect(unpopularTagLine).toBe("Don't miss out, purchase your ticket now!");
  });
});

// CreateEvent Function Test
describe('CreateEvent Function', () => {
    // Test Case 1
    it('Should return a new event if the name, price and availableTickets are valid', () => {  
        const event = createEvent('Canal Olympia', 500, 500);

        expect(event.name).toBe(('Canal Olympia'));
        expect(event.ticketPrice).toBe((500));
        expect(event.totalTickets).toBe((500));
    
    });
  
    // Test case 2
    it('Should throw an errow InvalidEventNameError if the name is not a type of string', () => {
        expect(() => createEvent(237, 500, 500)).toThrowError(InvalidEventNameError);
    });

    // Test case 3
    it('Should throw an errow InvalidEventPriceError if the price is < 0', () => {
        expect(() => createEvent('Canal Olympia', -500, 500)).toThrowError(InvalidEventPriceError);
    });

    // Test case 4
    it('Should throw an errow InvalidEventPriceError if the availableTickets is < 1', () => {
        expect(() => createEvent('Canal Olympia', 500, 0)).toThrowError(InvalidEventPriceError);
    });
});