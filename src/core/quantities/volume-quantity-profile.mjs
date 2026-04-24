import { MATHJS_STRINGS } from "../../constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class VolumeQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.VOLUME,
      internalUnit: MATHJS_STRINGS.CUBIC_METER,
      supportedUnits: [
        MATHJS_STRINGS.CUBIC_CENTIMETER,
        MATHJS_STRINGS.CUBIC_METER,
        MATHJS_STRINGS.CUBIC_INCH
      ]
    });
  }
}