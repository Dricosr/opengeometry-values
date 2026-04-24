export class ValueInputError extends Error {
  constructor({ code, field, message, value, valueType, quantity, unit, cause }) {
    super(message, cause ? { cause } : undefined);

    this.name = "ValueInputError";
    this.code = code;
    this.field = field;
    this.value = value;
    this.valueType = valueType;
    this.quantity = quantity;
    this.unit = unit;

    Object.freeze(this);
  }

  toJSON() {
    return {
      code: this.code,
      field: this.field,
      message: this.message,
      value: this.value,
      valueType: this.valueType,
      quantity: this.quantity,
      unit: this.unit
    };
  }
}