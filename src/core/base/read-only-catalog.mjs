/**
 * Small reusable base for immutable specialist catalogs.
 */
export class ReadOnlyCatalog {
  #entries;

  constructor(entries) {
    this.#entries = Object.freeze({ ...entries });
  }

  all() {
    return this.#entries;
  }

  get(name) {
    return this.#entries[name];
  }

  has(name) {
    return Object.hasOwn(this.#entries, name);
  }

  hasValue(value) {
    return Object.values(this.#entries).includes(value);
  }

  keys() {
    return Object.keys(this.#entries);
  }
}