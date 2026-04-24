import { MATHJS_STRINGS } from "../../constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class ForceQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.FORCE,
      internalUnit: MATHJS_STRINGS.NEWTON,
      supportedUnits: [
        MATHJS_STRINGS.NEWTON,
        MATHJS_STRINGS.KILONEWTON
      ]
    });
  }
}