import { describe, expect, it } from "vitest";
import { AreaEngineeringValueIoVisualTest } from "./specialists/area-engineering-value-io-visual-test.mjs";

describe("area engineering value I/O previews", () => {
  it("renders visual engineering cases for area values", () => {
    const specialist = new AreaEngineeringValueIoVisualTest();

    expect(specialist.renderPreviews()).toEqual(specialist.getExpectedPreviews());
    expect(specialist.renderInvalidPreviews()).toEqual(specialist.getExpectedInvalidPreviews());
  });
});