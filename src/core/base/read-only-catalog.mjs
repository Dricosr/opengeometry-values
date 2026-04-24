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

  keys() {
    return Object.keys(this.#entries);
  }
}