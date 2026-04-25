---
name: "Document Module"
description: "Use when documenting a JavaScript module in src/ or improving JSDoc with @fileoverview, @typedef, @param, @returns, or @throws without changing runtime behavior."
agent: "jsdoc-documentor"
argument-hint: "Path to the .mjs file to document (e.g. src/core/create-value.mjs). Leave blank to use the active file."
---

Document the JavaScript module specified.

If no file is given, document the currently open file in the editor.

Follow the jsdoc-documentor workflow:

1. Read the entire file before writing anything.
2. Add `@fileoverview` when absent or weak.
3. Add `@typedef` for object shapes that appear more than once or are non-obvious.
4. Document exported functions with `@param`, `@returns`, and `@throws` when the contract is non-trivial.
5. Use inline comments only to explain non-obvious intent, a constraint, or a workaround - never to narrate the code.
6. Check `src/index.mjs`, `README.md`, and agent files for stale references and update if needed.

Never alter runtime behavior. Never rename anything. Never add noise to simple code.
