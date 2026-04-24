export class OpenGeometryValue {
  constructor({ valueType, quantity, input, internal }) {
    this.valueType = valueType;
    this.quantity = quantity;
    this.input = input;
    this.internal = internal;

    Object.freeze(this);
  }
}