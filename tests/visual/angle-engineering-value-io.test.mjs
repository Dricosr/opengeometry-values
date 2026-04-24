import { describe, expect, it } from "vitest";
import { AngleEngineeringValueIoVisualTest } from "./specialists/angle-engineering-value-io-visual-test.mjs";

describe("angle engineering value I/O previews", () => {
  it("renders visual engineering cases for angle values", () => {
    const specialist = new AngleEngineeringValueIoVisualTest();

    expect(specialist.renderPreviews()).toEqual(specialist.getExpectedPreviews());
    expect(specialist.renderInvalidPreviews()).toEqual(specialist.getExpectedInvalidPreviews());
  });
});