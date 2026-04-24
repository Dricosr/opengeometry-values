Document the JavaScript module specified in $ARGUMENTS.

If no file path is provided, use the active file.

Delegate the work to the `jsdoc-documentor` agent and follow this workflow:

1. Read the entire file before writing anything.
2. Add `@fileoverview` when absent or weak.
3. Add `@typedef` for object shapes that appear more than once or are non-obvious.
4. Document exported functions with `@param`, `@returns`, and `@throws` when the contract is non-trivial.
5. Use inline comments only to explain non-obvious intent, a constraint, or a workaround.
6. Check `src/index.mjs`, `README.md`, and agent files for stale references and update if needed.

Never alter runtime behavior. Never rename anything. Never add noise to simple code.