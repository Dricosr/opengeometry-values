import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class TimeQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.TIME,
      internalUnit: UNIT_TOKENS.SECOND,
      supportedUnits: [
        UNIT_TOKENS.SECOND,
        UNIT_TOKENS.MINUTE,
        UNIT_TOKENS.HOUR
      ]
    });
  }
}