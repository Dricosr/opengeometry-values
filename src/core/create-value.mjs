import { DOMAIN } from "../constants/domain-catalog.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { internalResolutionApplier } from "./apply-internal-resolution.mjs";
import { ValueInputError } from "./errors/value-input-error.mjs";
import { booleanTextParser } from "./parsers/boolean-text-parser.mjs";
import { fractionalInchParser } from "./parsers/fractional-inch-parser.mjs";
import { formulaParser } from "./parsers/formula-parser.mjs";
import { strictNumberParser } from "./parsers/strict-number-parser.mjs";
import { unitInputParser } from "./parsers/unit-input-parser.mjs";
import { InternalValue } from "./models/internal-value.mjs";
import { IForgeEdpValue } from "./models/iforge-edp-value.mjs";
import { Output } from "./models/output.mjs";
import { ValueInput } from "./models/value-input.mjs";
import { quantityProfileRegistry } from "./quantities/quantity-profile-registry.mjs";
import { unitConverter } from "./convert-value.mjs";

export class ValueFactory {
  constructor({
    numberParser = strictNumberParser,
    booleanParser = booleanTextParser,
    formulaParser: formulaParserArg = formulaParser,
    unitInputParser: unitInputParserArg = unitInputParser,
    fractionalInchParser: fractionalInchParserArg = fractionalInchParser,
    converter = unitConverter,
    resolutionApplier = internalResolutionApplier,
    quantityProfiles = quantityProfileRegistry
  } = {}) {
    this.numberParser = numberParser;
    this.booleanParser = booleanParser;
    this.formulaParser = formulaParserArg;
    this.unitInputParser = unitInputParserArg;
    this.fractionalInchParser = fractionalInchParserArg;
    this.converter = converter;
    this.resolutionApplier = resolutionApplier;
    this.quantityProfiles = quantityProfiles;
  }

  create({ id, output, outputId, value, valueType, quantity, unit }) {
    const inputUnit = unit ?? QUANTITY_TYPES.NONE;
    const resolvedQuantity = quantity ?? QUANTITY_TYPES.NONE;

    if (valueType === VALUE_TYPES.STRING) {
      const internalValue = new InternalValue({ value });

      return new IForgeEdpValue({
        valueType,
        quantity: resolvedQuantity,
        input: new ValueInput({
          id,
          value,
          unit: inputUnit,
          quantity: resolvedQuantity,
          internal: internalValue,
          output: this.resolveOutput({
            output,
            outputId,
            inputUnit,
            internalValue
          })
        }),
        internal: internalValue
      });
    }

    if (valueType === VALUE_TYPES.BOOLEAN) {
      const parsedValue = this.booleanParser.parse(value);
      const internalValue = new InternalValue({ value: parsedValue });

      return new IForgeEdpValue({
        valueType,
        quantity: resolvedQuantity,
        input: new ValueInput({
          id,
          value: parsedValue,
          unit: inputUnit,
          quantity: resolvedQuantity,
          internal: internalValue,
          output: this.resolveOutput({
            output,
            outputId,
            inputUnit,
            internalValue
          })
        }),
        internal: internalValue
      });
    }

    const { numericValue, inputValue, effectiveUnit, hasEmbeddedUnits, isFractionalInput } = this.resolveNumericInput({
      value,
      valueType,
      quantity: resolvedQuantity,
      unit: inputUnit
    });

    if (valueType === VALUE_TYPES.INTEGER && !Number.isInteger(numericValue)) {
      throw this.createInputError({
        code: DOMAIN.ERROR_CODE_INVALID_INTEGER_VALUE,
        field: DOMAIN.ERROR_FIELD_VALUE,
        message: `${DOMAIN.ERROR_INVALID_INTEGER_VALUE_PREFIX}: ${value}`,
        value,
        valueType,
        quantity: resolvedQuantity,
        unit: effectiveUnit
      });
    }

    const quantityProfile = this.quantityProfiles.getProfile(resolvedQuantity);
    this.assertSupportedUnit({ quantityProfile, value, valueType, quantity: resolvedQuantity, unit: effectiveUnit });

    const normalizedInternal = this.normalizeNumericValue({
      quantityProfile,
      numericValue,
      value,
      valueType,
      quantity: resolvedQuantity,
      unit: effectiveUnit
    });

    const internalValue = new InternalValue({
      value: normalizedInternal.value,
      unit: normalizedInternal.unit
    });

    return new IForgeEdpValue({
      valueType,
      quantity: resolvedQuantity,
      input: new ValueInput({
        id,
        value: inputValue,
        unit: effectiveUnit,
        quantity: resolvedQuantity,
        internal: internalValue,
        formulaHasEmbeddedUnits: hasEmbeddedUnits,
        output: this.resolveOutput({
          output,
          outputId,
          inputUnit: effectiveUnit,
          internalValue
        })
      }),
      internal: internalValue
    });
  }

  tryCreate(options) {
    try {
      return {
        ok: true,
        value: this.create(options),
        error: null
      };
    } catch (error) {
      if (error instanceof ValueInputError) {
        return {
          ok: false,
          value: null,
          error
        };
      }

      throw error;
    }
  }

  // Returns { numericValue, inputValue, effectiveUnit, hasEmbeddedUnits, isFractionalInput }
  resolveNumericInput({ value, valueType, quantity, unit }) {
    // --- Formula path (starts with =) ---
    if (this.formulaParser.isFormula(value)) {
      return this.resolveFormulaInput({ value, valueType, quantity, unit });
    }

    // --- Strict number path (unchanged behavior) ---
    const strictResult = this.tryStrictNumber(value);

    if (strictResult !== null) {
      return { numericValue: strictResult, inputValue: strictResult, effectiveUnit: unit, hasEmbeddedUnits: false, isFractionalInput: false };
    }

    // --- Fractional inch path ("1 1/4", "1/2", "1-1/4") ---
    if (this.isPotentialFractionalInchInput(value, unit)) {
      const fractionalResult = this.tryFractionalInch(value);

      if (fractionalResult !== null) {
        return { numericValue: fractionalResult, inputValue: value, effectiveUnit: unit, hasEmbeddedUnits: false, isFractionalInput: true };
      }
    }

    // --- Number-with-unit path ("2m", "4000mm", "100 degC") ---
    return this.resolveUnitInput({ value, valueType, quantity, unit });
  }

  /**
   * Checks if the input could be a fractional inch value.
   * Candidates: strings containing "/" (fraction pattern) with unit "in" or no unit.
   */
  isPotentialFractionalInchInput(value, unit) {
    const str = String(value).trim();
    // Must contain a slash (fraction pattern)
    if (!str.includes("/")) {
      return false;
    }
    // Must have unit "in" or no unit (unit coming from context)
    return !unit || unit === UNIT_TOKENS.INCH || unit === QUANTITY_TYPES.NONE;
  }

  tryFractionalInch(value) {
    try {
      return this.fractionalInchParser.parse(value);
    } catch {
      return null;
    }
  }

  tryStrictNumber(value) {
    try {
      return this.numberParser.parse(value);
    } catch {
      return null;
    }
  }

  resolveFormulaInput({ value, valueType, quantity, unit }) {
    let parsed;

    try {
      parsed = this.formulaParser.parseWithUnit(value);
    } catch (error) {
      throw this.normalizeInputError(error, {
        code: DOMAIN.ERROR_CODE_INVALID_FORMULA_EXPRESSION,
        field: DOMAIN.ERROR_FIELD_VALUE,
        value,
        valueType,
        quantity,
        unit,
        fallbackMessage: `${DOMAIN.ERROR_INVALID_FORMULA_EXPRESSION_PREFIX}: ${value}`
      });
    }

    if (parsed.hasEmbeddedUnits) {
      const quantityProfile = this.quantityProfiles.getProfile(quantity);
      const internalUnit = quantityProfile?.getInternalUnit() ?? null;
      let numericValue;

      try {
        numericValue = parsed.mathjsUnit.toNumber(internalUnit);
      } catch {
        throw this.createInputError({
          code: DOMAIN.ERROR_CODE_INVALID_FORMULA_EXPRESSION,
          field: DOMAIN.ERROR_FIELD_VALUE,
          message: `${DOMAIN.ERROR_INVALID_FORMULA_EXPRESSION_PREFIX}: ${value}`,
          value,
          valueType,
          quantity,
          unit
        });
      }

      if (!isFinite(numericValue)) {
        throw this.createInputError({
          code: DOMAIN.ERROR_CODE_INVALID_FORMULA_EXPRESSION,
          field: DOMAIN.ERROR_FIELD_VALUE,
          message: `${DOMAIN.ERROR_INVALID_FORMULA_EXPRESSION_PREFIX}: ${value}`,
          value,
          valueType,
          quantity,
          unit
        });
      }

      return {
        numericValue,
        inputValue: parsed.cleanText,
        effectiveUnit: internalUnit ?? unit,
        hasEmbeddedUnits: true,
        isFractionalInput: false
      };
    }

    // Plain number formula - unit comes from parameter
    return {
      numericValue: parsed.value,
      inputValue: parsed.cleanText,
      effectiveUnit: unit,
      hasEmbeddedUnits: false,
      isFractionalInput: false
    };
  }

  resolveUnitInput({ value, valueType, quantity, unit }) {
    try {
      const parsed = this.unitInputParser.parse(value);
      return { numericValue: parsed.value, inputValue: value, effectiveUnit: parsed.unit, hasEmbeddedUnits: false, isFractionalInput: false };
    } catch (error) {
      throw this.normalizeInputError(error, {
        code: DOMAIN.ERROR_CODE_INVALID_NUMERIC_VALUE,
        field: DOMAIN.ERROR_FIELD_VALUE,
        value,
        valueType,
        quantity,
        unit,
        fallbackMessage: `${DOMAIN.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${value}`
      });
    }
  }

  normalizeNumericValue({ quantityProfile, numericValue, value, valueType, quantity, unit }) {
    try {
      return quantityProfile?.normalizeNumericValue(
        numericValue,
        unit === QUANTITY_TYPES.NONE ? undefined : unit,
        this.converter,
        this.resolutionApplier
      ) ?? { value: numericValue, unit: unit === QUANTITY_TYPES.NONE ? undefined : unit };
    } catch (error) {
      throw this.normalizeUnitError(error, {
        value,
        valueType,
        quantity,
        unit
      });
    }
  }

  assertSupportedUnit({ quantityProfile, value, valueType, quantity, unit }) {
    if (!quantityProfile || !unit || unit === QUANTITY_TYPES.NONE) {
      return;
    }

    const supportedUnits = quantityProfile.getSupportedUnits();

    if (supportedUnits.length === 0 || quantityProfile.supportsUnit(unit)) {
      return;
    }

    const isKnownUnit = this.converter.isKnownUnit(unit);
    const code = isKnownUnit
      ? DOMAIN.ERROR_CODE_UNSUPPORTED_INPUT_UNIT
      : DOMAIN.ERROR_CODE_UNKNOWN_INPUT_UNIT;
    const prefix = isKnownUnit
      ? DOMAIN.ERROR_UNSUPPORTED_INPUT_UNIT_PREFIX
      : DOMAIN.ERROR_UNKNOWN_INPUT_UNIT_PREFIX;

    throw this.createInputError({
      code,
      field: DOMAIN.ERROR_FIELD_UNIT,
      message: `${prefix}: ${unit}`,
      value,
      valueType,
      quantity,
      unit
    });
  }

  normalizeInputError(error, { code, field, value, valueType, quantity, unit, fallbackMessage }) {
    if (error instanceof ValueInputError) {
      return error;
    }

    return this.createInputError({
      code,
      field,
      message: fallbackMessage,
      value,
      valueType,
      quantity,
      unit,
      cause: error
    });
  }

  normalizeUnitError(error, { value, valueType, quantity, unit }) {
    if (error instanceof ValueInputError) {
      return error;
    }

    const message = error instanceof Error ? error.message : `${DOMAIN.ERROR_INCOMPATIBLE_INPUT_UNIT_PREFIX}: ${quantity}`;

    return this.createInputError({
      code: DOMAIN.ERROR_CODE_INCOMPATIBLE_INPUT_UNIT,
      field: DOMAIN.ERROR_FIELD_UNIT,
      message,
      value,
      valueType,
      quantity,
      unit,
      cause: error
    });
  }

  createInputError({ code, field, message, value, valueType, quantity, unit, cause }) {
    return new ValueInputError({
      code,
      field,
      message,
      value,
      valueType,
      quantity,
      unit,
      cause
    });
  }

  resolveOutput({ output, outputId, inputUnit, internalValue }) {
    // Accept any output object that has formatDisplay interface (duck typing)
    // This supports Output, FractionalInchOutput, and other custom output types
    if (output !== undefined && output !== null) {
      // Check for Output class instance or any object with id and formatDisplay
      if (output instanceof Output || (typeof output.formatDisplay === "function" && output.id !== undefined)) {
        return output;
      }
    }

    const outputUnit = inputUnit !== QUANTITY_TYPES.NONE ? inputUnit : (internalValue.unit ?? QUANTITY_TYPES.NONE);

    return new Output({
      id: outputId,
      unit: outputUnit,
      showUnit: outputUnit !== QUANTITY_TYPES.NONE
    });
  }
}

export const valueFactory = new ValueFactory();

export const createValue = (options) => valueFactory.create(options);
export const tryCreateValue = (options) => valueFactory.tryCreate(options);
