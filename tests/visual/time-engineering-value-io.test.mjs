import { describe, expect, it } from "vitest";
import { TimeEngineeringValueIoVisualTest } from "./specialists/time-engineering-value-io-visual-test.mjs";

describe("time engineering value I/O previews", () => {
  it("renders visual engineering cases for time values", () => {
    const specialist = new TimeEngineeringValueIoVisualTest();

    expect(specialist.renderPreviews()).toEqual(specialist.getExpectedPreviews());
    expect(specialist.renderInvalidPreviews()).toEqual(specialist.getExpectedInvalidPreviews());
  });
});