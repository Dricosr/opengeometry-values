# Browser and Backend Usage

opengeometry-values is designed to work in both Node.js and the browser from the same source files, with no build step and no double maintenance.

---

## Required mathjs exports

The library uses exactly four named exports from mathjs. These are the only symbols a shim or import map needs to expose:

| Symbol | Used in |
| ------ | ------- |
| `unit` | unit conversion, precision, input parsing |
| `format` | numeric display formatting |
| `evaluate` | formula evaluation |
| `typeOf` | formula result type detection |

The canonical source of truth is [`src/core/mathjs-api.mjs`](../../src/core/mathjs-api.mjs) — it re-exports all four and nothing else. When a new mathjs symbol is needed anywhere in the library, it must be added there first, making the change visible in diffs.

Consumers can also import the contract directly at runtime:

```js
import { mathjsApi } from "@dricosr/opengeometry-values";
// mathjsApi: { evaluate, format, typeOf, unit }
```

---

## The problem

`import { unit, format, evaluate, typeOf } from "mathjs"` uses bare specifiers. They resolve correctly in Node.js via `node_modules`, but the browser module loader cannot resolve them without additional configuration.

---

## The solution: Import Maps + Express static serving

The library source stays untouched. The consuming application handles environment-specific resolution by serving dependencies as static files and declaring an import map in HTML.

### Node.js

Import the library directly. No configuration needed.

```js
import { createValue } from "opengeometry-values"
```

Node.js resolves `"mathjs"` and `"opengeometry-values"` through its standard module resolution from `node_modules`.

### Browser

**Express setup:**

```js
app.use("/mathjs", express.static("node_modules/mathjs/lib/esm"))
app.use("/opengeometry-values", express.static("node_modules/opengeometry-values/src"))
```

**HTML:**

```html
<script type="importmap">
{
  "imports": {
    "mathjs": "/mathjs/index.js",
    "opengeometry-values": "/opengeometry-values/index.mjs"
  }
}
</script>

<script type="module">
  import { createValue } from "opengeometry-values"
</script>
```

The browser loads `/mathjs/index.js`. All of mathjs's internal relative imports (e.g. `./utils/is.js`) resolve against `/mathjs/` automatically. No CDN, no bundler.

---

## Why this approach

| Concern | Decision |
| --- | --- |
| No build step | Source files served directly as-is |
| No CDN dependency | mathjs served from local `node_modules` via Express |
| Single version source | `package.json` controls mathjs for both environments |
| No double maintenance | One codebase in `src/` works in both environments |
| Supply chain | No third-party runtime dependency beyond `node_modules` |

---

## The one authoring rule that makes it work

Every file in `src/` must import dependencies using bare specifiers - never relative paths into `node_modules`:

```js
// correct
import { unit, format, evaluate, typeOf } from "mathjs"

// wrong - breaks the browser path
import { unit } from "../../node_modules/mathjs/lib/esm/index.js"
```

This single rule is what keeps both environments compatible from the same source.

---

## Version management

mathjs version is defined once in `package.json`. After `npm install`, both Node.js and the browser consume the same files from `node_modules`. No synchronization needed between environments.

---

## Browser support

Import maps are supported natively in all modern browsers:

- Chrome 89+
- Firefox 108+
- Safari 16.4+

This project targets Node.js >=24 and modern browsers, so import maps are a safe baseline.
