import { describe, expect, it } from "vitest";
import { applyInternalResolution, InternalResolutionApplier } from "../../src/core/apply-internal-resolution.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";

describe("InternalResolutionApplier", () => {
  it("rounds length values to the configured system step", () => {
    expect(applyInternalResolution(2.123456, QUANTITY_TYPES.LENGTH)).toBe(2.123456);
  });

  it("leaves unsupported quantities and non-numeric values unchanged", () => {
    const applier = new InternalResolutionApplier();

    expect(applier.apply(10, QUANTITY_TYPES.ANGLE)).toBe(10);
    expect(applier.apply("10", QUANTITY_TYPES.LENGTH)).toBe("10");
  });
});