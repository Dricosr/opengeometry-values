import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { QuantityProfile } from "./quantity-profile.mjs";

export class TemperatureQuantityProfile extends QuantityProfile {
  constructor() {
    super({
      quantityType: QUANTITY_TYPES.TEMPERATURE,
      internalUnit: UNIT_TOKENS.DEGREE_CELSIUS,
      supportedUnits: [
        UNIT_TOKENS.DEGREE_CELSIUS,
        UNIT_TOKENS.DEGREE_FAHRENHEIT,
        UNIT_TOKENS.KELVIN
      ]
    });
  }
}