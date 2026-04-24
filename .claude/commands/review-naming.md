Review and standardize naming for the file or folder specified in $ARGUMENTS.

If no path is provided, use the active file.

Delegate the work to the `naming-reviewer` agent and follow this workflow:

1. Read the file or folder in full before proposing anything.
2. Evaluate file names and internal identifiers for clarity, consistency, and semantic accuracy.
3. Apply project conventions: `kebab-case.mjs` for files, `camelCase` for functions, `UPPER_SNAKE_CASE` for constants.
4. Rename only when the current name is unclear, inconsistent, or outside convention.
5. Update every reference: imports in `src/`, exports in `src/index.mjs`, examples in `README.md`, and any agent or instruction file that mentions the old name.
6. Verify no broken references remain.

If the blast radius of a rename is ambiguous or high-risk, stop and ask for confirmation.