import { describe, expect, it } from "vitest";
import { LengthEngineeringValueIoVisualTest } from "./specialists/length-engineering-value-io-visual-test.mjs";

describe("length engineering value I/O previews", () => {
  it("renders visual engineering cases for length values", () => {
    const specialist = new LengthEngineeringValueIoVisualTest();

    expect(specialist.renderPreviews()).toEqual(specialist.getExpectedPreviews());
    expect(specialist.renderInvalidPreviews()).toEqual(specialist.getExpectedInvalidPreviews());
  });
});