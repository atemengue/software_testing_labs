import { describe, it, expect } from "vitest";
import { today, next7Days, next30Days } from "../../js/events/filters";

describe("today", () => {
  it("should return true if event date is today", () => {
    const event = { date: new Date() };
    expect(today(event)).toBe(true);
  });

  it("should return false if event date is not today", () => {
    const event = { date: new Date(Date.now() + 86400000) };
    expect(today(event)).toBe(false);
  });
});

describe("next7Days", () => {
  it("should return true if event date is within the next 7 days", () => {
    const event = { date: new Date(Date.now() + 3 * 86400000) };
    expect(next7Days(event)).toBe(true);
  });

  it("should return false if event date is beyond the next 7 days", () => {
    const event = { date: new Date(Date.now() + 10 * 86400000) };
    expect(next7Days(event)).toBe(false);
  });
});

describe("next30Days", () => {
  it("should return true if event date is within the next 30 days", () => {
    const event = { date: new Date(Date.now() + 15 * 86400000) };
    expect(next30Days(event)).toBe(true);
  });

  it("should return false if event date is beyond the next 30 days", () => {
    const event = { date: new Date(Date.now() + 40 * 86400000) };
    expect(next30Days(event)).toBe(false);
  });
});
