import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class MassQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.MASS,
      internalUnit: UNIT_TOKENS.KILOGRAM,
      supportedUnits: [UNIT_TOKENS.KILOGRAM]
    });
  }
}