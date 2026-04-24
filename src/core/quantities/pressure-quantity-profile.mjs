import { MATHJS_STRINGS } from "../../constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class PressureQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.PRESSURE,
      internalUnit: MATHJS_STRINGS.PASCAL,
      supportedUnits: [
        MATHJS_STRINGS.PASCAL,
        MATHJS_STRINGS.KILOPASCAL,
        MATHJS_STRINGS.MEGAPASCAL,
        MATHJS_STRINGS.BAR
      ]
    });
  }
}