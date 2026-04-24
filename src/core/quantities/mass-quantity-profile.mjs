import { MATHJS_STRINGS } from "../../constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class MassQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.MASS,
      internalUnit: MATHJS_STRINGS.KILOGRAM,
      supportedUnits: [MATHJS_STRINGS.KILOGRAM]
    });
  }
}