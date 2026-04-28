import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class LengthQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.LENGTH,
      internalUnit: UNIT_TOKENS.METER,
      resolution: Object.freeze({
        unit: UNIT_TOKENS.METER,
        step: 0.000001
      }),
      supportedUnits: [
        UNIT_TOKENS.MILLIMETER,
        UNIT_TOKENS.CENTIMETER,
        UNIT_TOKENS.METER,
        UNIT_TOKENS.INCH
      ]
    });
  }
}
