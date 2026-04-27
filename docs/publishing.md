# Publishing to npm

This document describes how to publish a new version of `@dricosr/opengeometry-values` to the npm registry from the command line.

## Requirements

- Node.js 24+
- npm account with maintainer access to `@dricosr/opengeometry-values`

---

## Authentication

Two methods are available:

### Option A — Local access token (recommended for manual CLI publish)

Create an npm **Granular Access Token** (classic read-and-publish is also fine) at:

https://www.npmjs.com/settings/dricosr/tokens

Then store it in your local `.npmrc`:

```powershell
notepad "$env:USERPROFILE\.npmrc"
```

Add the line:

```
//registry.npmjs.org/:_authToken=npm_YOUR_TOKEN_HERE
```

Verify:

```powershell
npm whoami
# Expected output: dricosr
```

### Option B — Interactive login (requires 2FA OTP)

```powershell
npm login
```

npm will print a URL. Open it in the browser and authenticate with your security key or authenticator app.

---

## Step 1 — Bump the version

```powershell
cd "e:\Cloud\Git\og\opengeometry-values"

# Show current version
node -p "require('./package.json').version"

# Prerelease (e.g. 0.2.1-alpha.0 → 0.2.1-alpha.1)
npm version prerelease --preid=alpha --no-git-tag-version

# Patch (e.g. 0.2.1 → 0.2.2)
npm version patch --no-git-tag-version

# Minor (e.g. 0.2.1 → 0.3.0)
npm version minor --no-git-tag-version
```

`--no-git-tag-version` prevents npm from creating a git commit and tag automatically, leaving that control to you.

---

## Step 2 — Publish

### Prerelease version (alpha, beta, rc)

Prerelease versions **must** include `--tag` to avoid accidentally updating `latest`:

```powershell
npm publish --access public --tag alpha
```

### Stable version

```powershell
npm publish --access public
```

The `prepublishOnly` script runs automatically before publishing: it executes `npm test` and `npm run build`, so the dist files are always fresh and all tests must pass.

---

## Step 3 — Move the `latest` tag

After publishing, point `latest` to the new version:

```powershell
npm dist-tag add @dricosr/opengeometry-values@<version> latest
```

Verify:

```powershell
npm dist-tag ls @dricosr/opengeometry-values
```

---

## Full example

```powershell
cd "e:\Cloud\Git\og\opengeometry-values"

# 1. Verify auth
npm whoami                                          # dricosr

# 2. Bump version
npm version prerelease --preid=alpha --no-git-tag-version

# 3. Publish
npm publish --access public --tag alpha

# 4. Update latest tag (replace <version> with the bumped version)
npm dist-tag add @dricosr/opengeometry-values@<version> latest

# 5. Confirm tags
npm dist-tag ls @dricosr/opengeometry-values
```

---

## Notes

- Always use **PowerShell** — `cmd.exe` has known incompatibilities with the Vite/Vitest build pipeline used in `prepublishOnly`
- The `dist/` folder is generated at publish time and is not committed to git
- For automated publishing from CI, use an npm **Automation token** with IP restriction and store it as the `NPM_TOKEN` secret in GitHub Actions — see `.github/workflows/release.yml`
- Never commit npm tokens to the repository
