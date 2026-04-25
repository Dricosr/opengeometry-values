---
name: Code and file conventions
description: User's coding standards for the opengeometry-values project
type: feedback
---

Always use `.mjs` files and ES6+ syntax (import/export, arrow functions, const/let, optional chaining). No CommonJS, no TypeScript, no build step.

All code, comments, variable names, and documentation must be in English (en-US).

Commit messages, PR descriptions, issue templates, and changelog entries must be in English (en-US), and commit messages must not include `Co-Authored-By:` trailers or other co-author metadata unless the user explicitly asks for it.

Pin exact dependency versions in package.json - no `^` or `~`. Node.js minimum version must track the current stable release.

**Why:** Supply chain security and predictability. The user explicitly called out ^ prefixes as a risk.

**How to apply:** Any time a package.json is created or updated, use exact versions. Look up the latest published version before writing it.
