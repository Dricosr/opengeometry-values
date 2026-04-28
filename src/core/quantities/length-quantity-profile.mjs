import { MATHJS_STRINGS } from "../../constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class LengthQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.LENGTH,
      internalUnit: MATHJS_STRINGS.METER,
      resolution: Object.freeze({
        unit: MATHJS_STRINGS.METER,
        step: 0.000001
      }),
      supportedUnits: [
        MATHJS_STRINGS.MILLIMETER,
        MATHJS_STRINGS.CENTIMETER,
        MATHJS_STRINGS.METER,
        MATHJS_STRINGS.INCH
      ]
    });
  }
}
