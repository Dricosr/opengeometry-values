import { describe, expect, it } from "vitest";
import { ForceEngineeringValueIoVisualTest } from "./specialists/force-engineering-value-io-visual-test.mjs";

describe("force engineering value I/O previews", () => {
  it("renders visual engineering cases for force values", () => {
    const specialist = new ForceEngineeringValueIoVisualTest();

    expect(specialist.renderPreviews()).toEqual(specialist.getExpectedPreviews());
    expect(specialist.renderInvalidPreviews()).toEqual(specialist.getExpectedInvalidPreviews());
  });
});