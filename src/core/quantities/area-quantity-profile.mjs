import { MATHJS_STRINGS } from "../../constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class AreaQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.AREA,
      internalUnit: MATHJS_STRINGS.SQUARE_METER,
      supportedUnits: [
        MATHJS_STRINGS.SQUARE_CENTIMETER,
        MATHJS_STRINGS.SQUARE_METER,
        MATHJS_STRINGS.SQUARE_INCH
      ]
    });
  }
}