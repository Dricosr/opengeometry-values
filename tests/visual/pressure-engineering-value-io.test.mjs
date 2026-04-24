import { describe, expect, it } from "vitest";
import { PressureEngineeringValueIoVisualTest } from "./specialists/pressure-engineering-value-io-visual-test.mjs";

describe("pressure engineering value I/O previews", () => {
  it("renders visual engineering cases for pressure values", () => {
    const specialist = new PressureEngineeringValueIoVisualTest();

    expect(specialist.renderPreviews()).toEqual(specialist.getExpectedPreviews());
    expect(specialist.renderInvalidPreviews()).toEqual(specialist.getExpectedInvalidPreviews());
  });
});