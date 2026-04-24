import { describe, expect, it } from "vitest";
import { MassEngineeringValueIoVisualTest } from "./specialists/mass-engineering-value-io-visual-test.mjs";

describe("mass engineering value I/O previews", () => {
  it("renders visual engineering cases for mass values", () => {
    const specialist = new MassEngineeringValueIoVisualTest();

    expect(specialist.renderPreviews()).toEqual(specialist.getExpectedPreviews());
    expect(specialist.renderInvalidPreviews()).toEqual(specialist.getExpectedInvalidPreviews());
  });
});