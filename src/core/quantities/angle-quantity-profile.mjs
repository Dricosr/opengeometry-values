import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class AngleQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.ANGLE,
      internalUnit: UNIT_TOKENS.RADIAN,
      supportedUnits: [
        UNIT_TOKENS.DEGREE,
        UNIT_TOKENS.RADIAN
      ]
    });
  }
}