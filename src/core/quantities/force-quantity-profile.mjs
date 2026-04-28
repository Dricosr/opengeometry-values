import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class ForceQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.FORCE,
      internalUnit: UNIT_TOKENS.NEWTON,
      supportedUnits: [
        UNIT_TOKENS.NEWTON,
        UNIT_TOKENS.KILONEWTON
      ]
    });
  }
}