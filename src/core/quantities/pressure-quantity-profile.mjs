import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class PressureQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.PRESSURE,
      internalUnit: UNIT_TOKENS.PASCAL,
      supportedUnits: [
        UNIT_TOKENS.PASCAL,
        UNIT_TOKENS.KILOPASCAL,
        UNIT_TOKENS.MEGAPASCAL,
        UNIT_TOKENS.BAR
      ]
    });
  }
}