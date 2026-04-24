import { describe, expect, it } from "vitest";
import { parseNumber, strictNumberParser } from "../../src/core/parsers/strict-number-parser.mjs";

describe("StrictNumberParser", () => {
  it("accepts dot as the decimal separator", () => {
    expect(strictNumberParser.parse(" 2000.25 ")).toBe(2000.25);
    expect(parseNumber("-10.5")).toBe(-10.5);
  });

  it("rejects comma and thousands separators", () => {
    expect(() => parseNumber("10,5")).toThrow("Invalid numeric value");
    expect(() => parseNumber("1,000")).toThrow("Invalid numeric value");
    expect(() => parseNumber("2 000.25")).toThrow("Invalid numeric value");
  });
});