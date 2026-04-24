import { MATHJS_STRINGS } from "../../constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class AngleQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.ANGLE,
      internalUnit: MATHJS_STRINGS.RADIAN,
      supportedUnits: [
        MATHJS_STRINGS.DEGREE,
        MATHJS_STRINGS.RADIAN
      ]
    });
  }
}