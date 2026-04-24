import { MATHJS_STRINGS } from "../../constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class TemperatureQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.TEMPERATURE,
      internalUnit: MATHJS_STRINGS.DEGREE_CELSIUS,
      supportedUnits: [
        MATHJS_STRINGS.DEGREE_CELSIUS,
        MATHJS_STRINGS.DEGREE_FAHRENHEIT,
        MATHJS_STRINGS.KELVIN
      ]
    });
  }
}