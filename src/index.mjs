// ─── Canonical catalog exports (preferred) ──────────────────────────
export { UNITS, unitCatalog, UnitCatalog } from "./constants/unit-catalog.mjs";
export { QUANTITIES, quantityCatalog, QuantityCatalog } from "./constants/quantity-catalog.mjs";
export { AFFIX_TYPES, affixTypeCatalog, AffixTypeCatalog } from "./constants/affix-type-catalog.mjs";
export { DOMAIN, domainCatalog, DomainCatalog, DOMAIN_STRINGS, domainStringCatalog, DomainStringCatalog } from "./constants/domain-catalog.mjs";
export { BASE_VALUES, baseValueCatalog, BaseValueCatalog } from "./constants/base-value-catalog.mjs";
export { INTERNAL_RESOLUTION, internalResolutionCatalog, InternalResolutionCatalog } from "./constants/internal-resolution.mjs";
export { INTERNAL_UNITS, internalUnitCatalog, InternalUnitCatalog } from "./constants/internal-units.mjs";
export { UNIT_SYMBOLS, unitSymbolCatalog, UnitSymbolCatalog } from "./constants/unit-symbols.mjs";
export { UNIT_TOKENS, unitTokenCatalog, UnitTokenCatalog } from "./constants/unit-token-catalog.mjs";
export { VALUE_TYPES, valueTypeCatalog, ValueTypeCatalog } from "./constants/value-types.mjs";
export {
  SEPARATORS, FRACTION_DENOMINATORS, FRACTION_DEFAULTS,
  fractionalSeparatorCatalog, FractionalSeparatorCatalog,
  fractionalInchDenominatorCatalog, FractionalInchDenominatorCatalog,
  fractionalInchDefaultCatalog, FractionalInchDefaultCatalog
} from "./constants/fractional-inch-catalog.mjs";

// ─── Suffix modes ──────────────────────────────────────────────────
export { OUTPUT_SUFFIX_MODES, outputSuffixModeCatalog, OutputSuffixModeCatalog } from "./constants/output-suffix-modes.mjs";

// ─── Legacy re-exports (deprecated, kept for backward compatibility) ──
export { QUANTITY_TYPES, quantityTypeCatalog, QuantityTypeCatalog } from "./constants/quantity-types.mjs";
export { OUTPUT_AFFIX_TYPES, outputAffixTypeCatalog, OutputAffixTypeCatalog } from "./constants/output-affix-types.mjs";

// ─── Core utilities ─────────────────────────────────────────────────
export { createReferenceId } from "./core/base/create-reference-id.mjs";
export { applyInternalResolution, InternalResolutionApplier, internalResolutionApplier } from "./core/apply-internal-resolution.mjs";
export { convertValue, UnitConverter, unitConverter } from "./core/convert-value.mjs";
export { createValue, tryCreateValue, ValueFactory, valueFactory } from "./core/create-value.mjs";
export { ValueInputError } from "./core/errors/value-input-error.mjs";
export { formatDisplayValue, DisplayValueFormatter, displayValueFormatter } from "./core/format-display-value.mjs";
export { formatEditValue, EditValueFormatter, editValueFormatter } from "./core/format-edit-value.mjs";
export { getMaxDisplayPrecision, DisplayPrecisionService, displayPrecisionService } from "./core/get-max-display-precision.mjs";
export { createValuePreview, ValuePreviewService, valuePreviewService } from "./core/services/create-value-preview.mjs";
export { buildOutput, OutputBuilder, outputBuilder } from "./core/services/output-builder.mjs";

// ─── Models ─────────────────────────────────────────────────────────
export { CustomOutputAffix } from "./core/models/custom-output-affix.mjs";
export { EmptyOutputAffix } from "./core/models/empty-output-affix.mjs";
export { OutputAffix } from "./core/models/output-affix.mjs";
export { Output } from "./core/models/output.mjs";
export { UnitCodeOutputAffix } from "./core/models/unit-code-output-affix.mjs";
export { UnitSymbolOutputAffix } from "./core/models/unit-symbol-output-affix.mjs";

// ─── Presets & Samples ──────────────────────────────────────────────
export { OUTPUT_PRESETS, outputPresetCatalog, OutputPresetCatalog } from "./presets/output-preset-catalog.mjs";
export { PARAMETER_SAMPLES, parameterSampleCatalog, ParameterSampleCatalog } from "./samples/parameter-sample-catalog.mjs";

// ─── Quantity profiles ──────────────────────────────────────────────
export { QUANTITY_PROFILES, QuantityProfileRegistry, quantityProfileRegistry } from "./core/quantities/quantity-profile-registry.mjs";
export { QuantityProfile } from "./core/quantities/quantity-profile.mjs";
export { LengthQuantityProfile } from "./core/quantities/length-quantity-profile.mjs";
export { AreaQuantityProfile } from "./core/quantities/area-quantity-profile.mjs";
export { VolumeQuantityProfile } from "./core/quantities/volume-quantity-profile.mjs";
export { AngleQuantityProfile } from "./core/quantities/angle-quantity-profile.mjs";
export { TemperatureQuantityProfile } from "./core/quantities/temperature-quantity-profile.mjs";
export { MassQuantityProfile } from "./core/quantities/mass-quantity-profile.mjs";
export { ForceQuantityProfile } from "./core/quantities/force-quantity-profile.mjs";
export { PressureQuantityProfile } from "./core/quantities/pressure-quantity-profile.mjs";
export { TimeQuantityProfile } from "./core/quantities/time-quantity-profile.mjs";

// ─── Services ───────────────────────────────────────────────────────
export { resolveDisplayPrecision, DisplayPrecisionResolver, displayPrecisionResolver } from "./core/resolve-display-precision.mjs";
export { parseBoolean, BooleanTextParser, booleanTextParser } from "./core/parsers/boolean-text-parser.mjs";
export { parseFormula, FormulaParser, formulaParser } from "./core/parsers/formula-parser.mjs";
export { parseUnitInput, UnitInputParser, unitInputParser } from "./core/parsers/unit-input-parser.mjs";
export { parseNumber, StrictNumberParser, strictNumberParser } from "./core/parsers/strict-number-parser.mjs";
export { FractionalInchParser, fractionalInchParser, parseFractionalInch, FRACTIONAL_INCH_DENOMINATORS } from "./core/parsers/fractional-inch-parser.mjs";
export { FractionalInchFormatter, fractionalInchFormatter } from "./core/formatters/fractional-inch-formatter.mjs";
export { FractionalInchOutput } from "./core/models/fractional-inch-output.mjs";
export * as mathjsApi from "./core/mathjs-api.mjs";
