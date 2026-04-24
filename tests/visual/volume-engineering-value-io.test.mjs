import { describe, expect, it } from "vitest";
import { VolumeEngineeringValueIoVisualTest } from "./specialists/volume-engineering-value-io-visual-test.mjs";

describe("volume engineering value I/O previews", () => {
  it("renders visual engineering cases for volume values", () => {
    const specialist = new VolumeEngineeringValueIoVisualTest();

    expect(specialist.renderPreviews()).toEqual(specialist.getExpectedPreviews());
    expect(specialist.renderInvalidPreviews()).toEqual(specialist.getExpectedInvalidPreviews());
  });
});