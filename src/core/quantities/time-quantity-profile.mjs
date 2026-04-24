import { MATHJS_STRINGS } from "../../constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class TimeQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.TIME,
      internalUnit: MATHJS_STRINGS.SECOND,
      supportedUnits: [
        MATHJS_STRINGS.SECOND,
        MATHJS_STRINGS.MINUTE,
        MATHJS_STRINGS.HOUR
      ]
    });
  }
}