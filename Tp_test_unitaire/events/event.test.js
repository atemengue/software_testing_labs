import {describe,expect,it} from 'vitest';
import {isSoldOut,getTagLine,createEvent} from './event.js';
import { InvalidEventNameError, InvalidEventPriceError } from "../error-handling/exceptions";


//FONCTION isSoldOut

describe('tester la fonction isSoldOut', () => {
   //cas de test 1:doit retouner vrai si le ticketremaining est egal a 0
    it('shoud returns true when event issoldout is equal to 0', () => {
        // Arrange
        const event = {
            id: 1,
            name: 'Test Event',
            ticketPrice: 10.00,
            totalTickets: 100,
            ticketsRemaining: 0,
            date: new Date()
        };
    
        // Act
        const result = isSoldOut(event);
    
        // Assert
        expect(result).toBe(true);
    });


    //cas de test 2:doit retouner faux si le ticketremaining est negatif
    it('shoud returns false when event issoldout is negatif', () => {
        // Arrange
        const event = {
            id: 1,
            name: 'Test Event',
            ticketPrice: 10.00,
            totalTickets: 100,
            ticketsRemaining: -10,
            date: new Date()
        };
    
        // Act
        const result = isSoldOut(event);
    
        // Assert
        expect(result).toBe(false);
    });

    //cas de test 3:doit retouner faux si le ticketremaining est egal a un nombre decimal
    it('shoud returns false when event issoldout is a decimal number', () => {
        // Arrange
        const event = {
            id: 1,
            name: 'Test Event',
            ticketPrice: 10.00,
            totalTickets: 100,
            ticketsRemaining: 10.5,
            date: new Date()
        };
    
        // Act
        const result = isSoldOut(event);
    
        // Assert
        expect(result).toBe(false);
    });

    //cas de test 4:doit retouner faux si le ticketremaining est une chaine de caractere
    it('shoud returns false when event issoldout is a string', () => {
        // Arrange
        const event = {
            id: 1,
            name: 'Test Event',
            ticketPrice: 10.00,
            totalTickets: 100,
            ticketsRemaining: "10",
            date: new Date()
        };
    
        // Act
        const result = isSoldOut(event);
    
        // Assert
        expect(result).toBe(false);
    });

    //cas de test 5:doit retouner faux si le ticketremaining est superieur a zero
    it('shoud returns false when event issoldout is greather than 0', () => {
        // Arrange
        const event = {
            id: 1,
            name: 'Test Event',
            ticketPrice: 10.00,
            totalTickets: 100,
            ticketsRemaining: 10,
            date: new Date()
        };
    
        // Act
        const result = isSoldOut(event);
    
        // Assert
        expect(result).toBe(false);
    });
});

    //FONCTION getTagline

describe('tester la fonction getTagLine', () => {
    //cas de test 1:verifie que la fonction le message'Event sold out' lorsque issoldout retoune true
  it(' should return "Event Sold Out!" when event is sold out', () => {
    // Arrange
    const eventSoldOut = { ticketsRemaining: 0 };

    // Act
    const result = getTagLine(eventSoldOut, 10, false);

    // Assert
    expect(result).toBe("Event Sold Out!");
  });


  //cas de test 2:verifie que la fonction affiche le message'Hurry only 10 tickets left!' lorsque issoldout retoune false
  it('should return correct message when tickets remaining is less than minimumTicketCount', () => {
    // Arrange
    const eventWithFewTickets = { ticketsRemaining: 5 };

    // Act
    const result = getTagLine(eventWithFewTickets, 10, false);

    // Assert
    expect(result).toBe("Hurry only 5 tickets left!");
  });


  //cas de test 3:verifie que la fonction affiche le message'This Event is getting a lot of interest. Don't miss out, purchase your ticket now!' lorsque issoldout retoune false et ispopular retoune true
  it('return correct message when event is popular', () => {
    // Arrange
    const popularEvent = { ticketsRemaining: 10 };

    // Act
    const result = getTagLine(popularEvent, 5, true);

    // Assert
    expect(result).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
  });


  //cas de test 4:verifie que la fonction affiche le message'Don't miss out, purchase your ticket now!' lorsque issoldout retoune false et ispopular retoune false
  it('returns correct message when event is not popular', () => {
    // Arrange
    const nonPopularEvent = { ticketsRemaining: 10 };

    // Act
    const result = getTagLine(nonPopularEvent, 5, false);

    // Assert
    expect(result).toBe("Don\'t miss out, purchase your ticket now!");
  });

  //cas de test 5:verifie que la fonction affiche le message'Hurry only 10 tickets left!' lorsque issoldout retoune false et ispopular retoune false

  it('should return correct message when tickets remaining is equal to minimumTicketCount', () => {
    // Arrange
    const eventWithEqualTickets = { ticketsRemaining: 10 };

    // Act
    const result = getTagLine(eventWithEqualTickets, 11, false);

    // Assert
    expect(result).toEqual("Hurry only 10 tickets left!");
});

});

//FONCTION createEvent

describe("tester la fonction createEvent", () => {
  it("should throw InvalidEventNameError for invalid event name", () => {
    // Arrange
    const invalidName = 12345; // Not a string

    // Act
    const createEventFunction = () => createEvent(invalidName, 10, 10);

    // Assert
    expect(createEventFunction).toThrow(InvalidEventNameError);
  });

 it("should throw InvalidEventNameError for event name exceeding 200 characters", () => {
    // Arrange
    const longName = "a".repeat(201); // 201 characters

    // Act
    const createEventFunction = () => createEvent(longName, 10, 10);

    // Assert
    expect(createEventFunction).toThrow(InvalidEventNameError);
  });

  it("should throw InvalidEventPriceError for invalid event price", () => {
    // Arrange
    const invalidPrice = -10; // Negative price

    // Act
    const createEventFunction = () => createEvent("Test Event", invalidPrice, 10);

    // Assert
    expect(createEventFunction).toThrow(InvalidEventPriceError);
  });


  it("should throws InvalidEventPriceError for non-numeric event price", () => {
    // Arrange
    const nonNumericPrice = "10"; // Not a number

    // Act
   const createEventFunction = () => createEvent("Test Event", nonNumericPrice, 10);

    // Assert
   expect(createEventFunction).toThrow(InvalidEventPriceError);
  });

  it("should throw InvalidEventPriceError for non-numeric availableTickets", () => {
    // Arrange
   const nonNumericAvailableTickets = "10"; // Not a number

    // Act
    const createEventFunction = () => createEvent("Test Event", 10, nonNumericAvailableTickets);

    // Assert
   expect(createEventFunction).toThrow(InvalidEventPriceError);
  });

  it("throw InvalidEventPriceError for availableTickets less than 1", () => {
    // Arrange
    const lessThanOneAvailableTickets = 0;

    //Act
    const createEventFunction = () => createEvent("Test Event", 10, lessThanOneAvailableTickets);

    // Assert
   expect(createEventFunction).toThrow(InvalidEventPriceError);
  });
});


