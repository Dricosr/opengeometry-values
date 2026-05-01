# Publishing to npm

This document describes how to publish a new version of `@dricosr/iforge-edp-values` to the npm registry from the command line.

> **Current state:** the package was renamed from `@dricosr/opengeometry-values` (last published: `0.3.0`) to `@dricosr/iforge-edp-values`. Latest published version: `0.4.1`.



## Requirements

- Node.js 24+
- npm account with maintainer access to `@dricosr/iforge-edp-values`

---

## Authentication

Two methods are available:

### Option A - Local access token (recommended for manual CLI publish)

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

### Option B - Interactive login (requires 2FA OTP)

```powershell
npm login
```

npm will print a URL. Open it in the browser and authenticate with your security key or authenticator app.

---

## Step 1 - Bump the version

```powershell
cd "e:\Cloud\Git\iforge_edp\values"

# Show current version
node -p "require('./package.json').version"

# Patch (e.g. 0.3.1 → 0.3.2)
npm version patch --no-git-tag-version

# Minor (e.g. 0.3.1 → 0.4.0)
npm version minor --no-git-tag-version

# Major (e.g. 0.3.1 → 1.0.0)
npm version major --no-git-tag-version
```

`--no-git-tag-version` prevents npm from creating a git commit and tag automatically, leaving that control to you.

---

## Step 2 - Publish

```powershell
npm publish --access public
```

The `prepublishOnly` script runs automatically before publishing: it executes `npm test` and `npm run build`, so the dist files are always fresh and all tests must pass.

---

## Step 3 - Confirm

```powershell
npm dist-tag ls @dricosr/iforge-edp-values
```

---

## Full example

```powershell
cd "e:\Cloud\Git\iforge_edp\values"

# 1. Verify auth
npm whoami                                          # dricosr

# 2. Bump version - must run from project root, NOT from home (~)
#    Running from the wrong directory creates a spurious package.json
#    with version 0.0.1 in that location.
npm version patch --no-git-tag-version

# 3. Publish
npm publish --access public

# 4. Confirm
npm dist-tag ls @dricosr/iforge-edp-values
```


---

## Notes

- Always use **PowerShell** - `cmd.exe` has known incompatibilities with the Vite/Vitest build pipeline used in `prepublishOnly`
- The `dist/` folder is generated at publish time and is not committed to git
- For automated publishing from CI, use an npm **Automation token** with IP restriction and store it as the `NPM_TOKEN` secret in GitHub Actions - see `.github/workflows/release.yml`
- Never commit npm tokens to the repository
