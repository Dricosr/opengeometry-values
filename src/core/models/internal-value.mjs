export class InternalValue {
  constructor({ value, unit }) {
    this.value = value;

    if (unit !== undefined) {
      this.unit = unit;
    }

    Object.freeze(this);
  }
}