import { formatExpectedTime } from "./dateTime";

describe("formatExpectedTime", () => {
  it("formats time correctly for AM times", () => {
    const isoString = "2025-05-31T07:05:12.326Z"; // 7:05 AM UTC
    expect(formatExpectedTime(isoString)).toBe("7:05 AM");
  });

  it("formats time correctly for PM times", () => {
    const isoString = "2025-05-31T19:35:12.326Z"; // 7:35 PM UTC
    expect(formatExpectedTime(isoString)).toBe("7:35 PM");
  });

  it("formats midnight as 12 AM", () => {
    const isoString = "2025-05-31T00:00:00.000Z"; // 12:00 AM UTC
    expect(formatExpectedTime(isoString)).toBe("12:00 AM");
  });

  it("formats noon as 12 PM", () => {
    const isoString = "2025-05-31T12:00:00.000Z"; // 12:00 PM UTC
    expect(formatExpectedTime(isoString)).toBe("12:00 PM");
  });

  it("pads minutes correctly", () => {
    const isoString = "2025-05-31T10:07:00.000Z"; // 10:07 AM UTC
    expect(formatExpectedTime(isoString)).toBe("10:07 AM"); // Note: your function doesn't pad minutes, see below
  });
});
