import { describe, expect, it } from "vitest";
import { next30Days, next7Days, today } from "../../js/events/filters"; // Assuming today function resides in filters.js

describe("today function", () => {
  it("should return true if today's date matches the event's date", () => {
    
    const event = { date: new Date() };

    const expectedResult = true;

    expect(today(event)).toBe(expectedResult);
  });

  it("should return false if today's date does not match the event's date", () => {
    
    const eventdate = new Date(2023, 11, 19); 
    const event = { date: eventdate };
  
    const expectedResult = false;
  
    expect(today(event)).toBe(expectedResult);
  });
});

describe("next7Days function", () => {
    /*it("should return true if the event's date is within the next 7 days", () => {
      
      const eventdate = new Date(2024, 6, 26); 
      const event = { date: eventdate };
  
      const expectedResult = true;
  
      expect(next7Days(event)).toBe(expectedResult);
    });*/
  
    it("should return false if the event's date is after the next 7 days", () => {
      
      const eventdate = new Date(2024, 6, 29); 
      const event = { date: eventdate };
  
      const expectedResult = false;
  
      expect(next7Days(event)).toBe(expectedResult);
    });
  
    it("should return false if the event's date is in the past", () => {
      
      const eventDate = new Date(2024, 5, 30); 
      const event = { date: eventDate };
  
      const expectedResult = false;
  
      expect(next7Days(event)).toBe(expectedResult);
    });
  
});

describe("next30Days function", () => {
    it("should return true if the event's date is within the next 30 days", () => {
      
      const eventdate = new Date(2024, 6, 17); 
      const event = { date: eventdate };
  
      const expectedResult = true;
  
      expect(next30Days(event)).toBe(expectedResult);
    });
  
    it("should return false if the event's date is after the next 30 days", () => {
      
      const eventdate = new Date(2024, 7, 17); 
      const event = { date: eventdate };
  
      const expectedResult = false;
  
      expect(next30Days(event)).toBe(expectedResult);
    });
  
    /*it("should return false if the event's date is in the past", () => {
      
      const eventDate = new Date(2024, 5, 30); 
      const event = { date: eventDate };
  
      const expectedResult = false;
  
      expect(next30Days(event)).toBe(expectedResult);
    });*/
  
});