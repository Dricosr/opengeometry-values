import { ReadOnlyCatalog } from "../base/read-only-catalog.mjs";
import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { AngleQuantityProfile } from "./angle-quantity-profile.mjs";
import { AreaQuantityProfile } from "./area-quantity-profile.mjs";
import { ForceQuantityProfile } from "./force-quantity-profile.mjs";
import { LengthQuantityProfile } from "./length-quantity-profile.mjs";
import { MassQuantityProfile } from "./mass-quantity-profile.mjs";
import { PressureQuantityProfile } from "./pressure-quantity-profile.mjs";
import { SimpleQuantityProfile } from "./simple-quantity-profile.mjs";
import { TemperatureQuantityProfile } from "./temperature-quantity-profile.mjs";
import { TimeQuantityProfile } from "./time-quantity-profile.mjs";
import { VolumeQuantityProfile } from "./volume-quantity-profile.mjs";

const quantityProfiles = Object.freeze({
  [QUANTITY_TYPES.NONE]: new SimpleQuantityProfile({
    quantityType: QUANTITY_TYPES.NONE
  }),
  [QUANTITY_TYPES.LENGTH]: new LengthQuantityProfile(),
  [QUANTITY_TYPES.AREA]: new AreaQuantityProfile(),
  [QUANTITY_TYPES.VOLUME]: new VolumeQuantityProfile(),
  [QUANTITY_TYPES.ANGLE]: new AngleQuantityProfile(),
  [QUANTITY_TYPES.TEMPERATURE]: new TemperatureQuantityProfile(),
  [QUANTITY_TYPES.MASS]: new MassQuantityProfile(),
  [QUANTITY_TYPES.FORCE]: new ForceQuantityProfile(),
  [QUANTITY_TYPES.PRESSURE]: new PressureQuantityProfile(),
  [QUANTITY_TYPES.TIME]: new TimeQuantityProfile(),
  [QUANTITY_TYPES.RATIO]: new SimpleQuantityProfile({
    quantityType: QUANTITY_TYPES.RATIO,
    supportedUnits: [UNIT_TOKENS.PERCENT]
  })
});

export class QuantityProfileRegistry extends ReadOnlyCatalog {
  constructor() {
    super(quantityProfiles);
  }

  getProfile(quantity) {
    return this.get(quantity);
  }
}

export const quantityProfileRegistry = new QuantityProfileRegistry();
export const QUANTITY_PROFILES = quantityProfileRegistry.all();