---
name: "Review Naming"
description: "Review and standardize naming conventions across a file or folder in src/: file names, exported functions, constants, and internal identifiers."
agent: "naming-reviewer"
argument-hint: "Path to the file or folder to review (e.g. src/core). Leave blank to use the active file."
---

Review and standardize naming for the file or folder specified.

If no path is given, use the currently open file in the editor.

Follow the naming-reviewer workflow:

1. Read the file or folder in full before proposing anything.
2. Evaluate file names and internal identifiers (functions, constants, variables) for clarity, consistency, and semantic accuracy.
3. Apply project conventions: `kebab-case.mjs` for files, `camelCase` for functions, `UPPER_SNAKE_CASE` for constants.
4. Rename only when the current name is unclear, inconsistent, or outside convention.
5. Update every reference: imports in `src/`, exports in `src/index.mjs`, examples in `README.md`, and any agent or instruction file that mentions the old name.
6. Verify no broken references remain.

If the blast radius of a rename is ambiguous or high-risk, state the concern and ask for confirmation before proceeding.
