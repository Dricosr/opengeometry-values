import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class VolumeQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.VOLUME,
      internalUnit: UNIT_TOKENS.CUBIC_METER,
      supportedUnits: [
        UNIT_TOKENS.CUBIC_CENTIMETER,
        UNIT_TOKENS.CUBIC_METER,
        UNIT_TOKENS.CUBIC_INCH,
        UNIT_TOKENS.LITER
      ]
    });
  }
}