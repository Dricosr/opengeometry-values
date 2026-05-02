# Security Policy

## Supported Versions

Only the latest release receives security fixes.

| Version | Supported |
| ------- | --------- |
| latest  | yes       |
| older   | no        |

## Usage Risks

This library depends on [Math.js](https://mathjs.org/) for unit conversion and numeric formatting. Math.js contains an expression parser that, when evaluating user-supplied formulas, may expose the application to:

- **Arbitrary code execution**: user-supplied formulas pass through `math.evaluate()`, which can execute arbitrary JavaScript expressions if input is not properly sanitized. See the [Math.js security docs](https://mathjs.org/docs/expressions/security.html).
- **CPU or memory exhaustion**: complex or deeply nested expressions can result in heavy computation or large memory allocation.

**Recommendations for consumers:**

- Never pass unsanitized user input directly to formula-based value creation.
- Validate and sanitize all user-supplied formulas before evaluation.
- Consider disabling formula support if your application does not require it.
- Be aware that floating-point arithmetic has inherent precision limitations; the library caps display precision by internal resolution, but internal values are stored as IEEE 754 doubles.

## Reporting a Vulnerability

Please **do not** open a public issue for security vulnerabilities.

Report privately by emailing **dricosr@gmail.com** with:

- A clear description of the vulnerability
- Steps to reproduce or a minimal proof-of-concept
- The potential impact

You will receive an acknowledgement within **72 hours**. If the issue is confirmed, a fix will be released as soon as possible and you will be credited in the release notes unless you prefer to remain anonymous.
