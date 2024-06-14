import {createEvent, Event, getTagLine, isSoldOut} from './event';
import {InvalidEventNameError, InvalidEventPriceError} from '../error-handling/exceptions';

describe('Event Functions', () => {
    describe('createEvent', () => {

        test('throws InvalidEventPriceError when availableTickets is invalid', () => {
            expect(() => createEvent('Concert', 50, 0)).toThrow(InvalidEventPriceError);
            expect(() => createEvent('Concert', 50, -10)).toThrow(InvalidEventPriceError);
        });

        test('creates event when inputs are valid', () => {
            const event = createEvent('Concert', 50, 100);
            expect(event).toEqual(expect.objectContaining({
                name: 'Concert',
                ticketPrice: 50,
                totalTickets: 100,
                ticketsRemaining: 100 // Assuming ticketsRemaining starts as totalTickets
            }));
        });

        test('throws InvalidEventNameError when name is invalid', () => {
            expect(() => createEvent('', 50, 100)).toThrow(InvalidEventNameError);
        });

        test('throws InvalidEventPriceError when price is invalid', () => {
            expect(() => createEvent('Concert', -50, 100)).toThrow(InvalidEventPriceError);
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
            expect(popularTagLine).toBe(`This Event is getting a lot of interest. Don't miss out, purchase your ticket now!`);
            expect(unpopularTagLine).toBe("Don't miss out, purchase your ticket now!");
        });
    });

});
