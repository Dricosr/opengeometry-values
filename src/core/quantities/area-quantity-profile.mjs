import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class AreaQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.AREA,
      internalUnit: UNIT_TOKENS.SQUARE_METER,
      supportedUnits: [
        UNIT_TOKENS.SQUARE_CENTIMETER,
        UNIT_TOKENS.SQUARE_METER,
        UNIT_TOKENS.SQUARE_INCH
      ]
    });
  }
}