import { describe, it, expect } from 'vitest';
import { today, next7Days, next30Days } from '../../js/events/filters'; 

describe('Date Comparison Functions', () => {
    describe('today', () => {
        it('should return true if event date is today', () => {
            const event = { date: new Date() };
            const result = today(event);
            expect(result).toBe(true);
        });
    
        it('should return false if event date is not today', () => {
            const event = { date: new Date('2024-06-16') };
            const result = today(event);
            expect(result).toBe(false);
        });
    });
    

    describe('next7Days', () => {
        it('should return true if event date is within the next 7 days', () => {
            const today = new Date();
            const eventDate = new Date(today);
            eventDate.setDate(today.getDate() + 5); // Simulate event date 5 days from today
            const event = { date: eventDate }; 
            expect(next7Days(event)).toBe(true);
        });
    
        it('should return false if event date is more than 7 days away', () => {
            const today = new Date();
            const eventDate = new Date(today);
            eventDate.setDate(today.getDate() + 10); // Simulate event date 10 days from today
            const event = { date: eventDate };
            expect(next7Days(event)).toBe(false);
        });
    
        it('should return false if event date is today or in the past', () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);  // Set to start of today
            const event = { date: today };  // Event is today
            expect(next7Days(event)).toBe(false);
        });
    });
    
    
    describe('next30Days', () => {
        it('should return true if event date is within the next 30 days', () => {
            const today = new Date();
            const eventDate = new Date(today);
            eventDate.setDate(today.getDate() + 15); // Simulate event date 15 days from today
            const event = { date: eventDate };
            expect(next30Days(event)).toBe(true);
        });
    
        it('should return false if event date is more than 30 days away', () => {
            const today = new Date();
            const eventDate = new Date(today);
            eventDate.setDate(today.getDate() + 35); // Simulate event date 35 days from today
            const event = { date: eventDate };
            expect(next30Days(event)).toBe(false);
        });
    
        it('should return false if event date is today or in the past', () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);  // Set to start of today
            const event = { date: today };  // Event is today
            expect(next30Days(event)).toBe(false);
        });
    });
    
    
});
