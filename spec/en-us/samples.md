# Samples

> Run any sample with `node samples/length/<file>.mjs` from the project root.

Every sample in `samples/` is a standalone executable that demonstrates a specific library feature. Samples must always use catalog constants (`UNIT_TOKENS`, `QUANTITY_TYPES`, `VALUE_TYPES`, `OUTPUT_SUFFIX_MODES`, `SEPARATORS`, etc.) instead of raw string literals.

## Documentation language

All sample code documentation (JSDoc comments, console.log labels, variable names) **must be in English (en-US)**. This ensures consistency across the codebase and makes samples accessible to all contributors regardless of their native language.

## Length samples

| File | What it shows |
|------|---------------|
| `input-mm-to-output-mm.mjs` | Basic: same input and output unit (125 mm → 125 mm) |
| `input-mm-to-output-cm.mjs` | mm → cm conversion (125 mm → 12.5 cm) |
| `input-mm-to-output-m.mjs` | mm → m conversion (125 mm → 0.125 m) |
| `input-mm-to-output-in.mjs` | mm → decimal inches (125 mm → 4.921 in) |
| `input-mm-to-output-fractional-in.mjs` | mm → fractional inches with all suffix modes and separators (31.75 mm → 1 1/4", 3.175 mm → 1/8 in, 63.5 mm → 2 1/2, 31.75 mm → 1-1/4") |
| `input-cm-to-output-m.mjs` | cm → m conversion (600 cm → 6.00 m) |
| `input-m-to-output-mm.mjs` | m → mm conversion (7.2 m → 7200 mm) |
| `input-in-to-output-mm.mjs` | decimal inches → mm (2.5 in → 63.5 mm) |
| `input-fractional-in-to-output-mm.mjs` | fractional inch input → mm ("1 1/4" in → 31.8 mm) |
| `input-formula-to-output.mjs` | formula with embedded units ("=4 m + 200 cm" → 600 cm) |
| `input-inline-unit-to-output.mjs` | inline unit input ("4000mm" → 400 cm) |
| `input-integer-to-output.mjs` | integer value type (3000 mm → 3000 mm) |
| `output-precision.mjs` | precision control (125 mm → m with precision 0–4) |
| `output-prefix-suffix.mjs` | custom prefix (⌀) and suffix modes for decimal and fractional inches |
| `output-fractional-in-suffix-modes.mjs` | suffix modes for fractional inches (SYMBOL, CODE, NONE) |

## Adding a new sample

1. Create the file under `samples/<quantity>/<descriptive-name>.mjs`
2. Use catalog constants (`UNIT_TOKENS`, `QUANTITY_TYPES`, `VALUE_TYPES`, `OUTPUT_SUFFIX_MODES`, `SEPARATORS`) — never raw strings
3. Add a JSDoc comment at the top explaining the use case — **always in English (en-US)**
4. Use English for all console.log labels and variable names
5. Add the entry to this table
6. Verify it runs: `node samples/<quantity>/<file>.mjs`
