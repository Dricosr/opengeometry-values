import { describe, expect, it } from "vitest";
import { TemperatureEngineeringValueIoVisualTest } from "./specialists/temperature-engineering-value-io-visual-test.mjs";

describe("temperature engineering value I/O previews", () => {
  it("renders visual engineering cases for temperature values", () => {
    const specialist = new TemperatureEngineeringValueIoVisualTest();

    expect(specialist.renderPreviews()).toEqual(specialist.getExpectedPreviews());
    expect(specialist.renderInvalidPreviews()).toEqual(specialist.getExpectedInvalidPreviews());
  });
});