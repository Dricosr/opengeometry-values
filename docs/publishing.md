# Publishing to npm

This document describes how to publish a new version of `@dricosr/opengeometry-values` to the npm registry from the command line.

## Requirements

- Node.js 24+
- npm account with maintainer access to `@dricosr/opengeometry-values`
- 2FA enabled on the npm account (security key or authenticator app)

---

## Step 1 - Login

Run from PowerShell (not `cmd.exe`):

```powershell
npm login
```

npm will print a URL. Open it in the browser and authenticate with your security key or authenticator app. The terminal completes automatically after browser confirmation.

Verify the session:

```powershell
npm whoami
# Expected output: dricosr
```

---

## Step 2 - Bump the version

Choose the appropriate bump for the release:

```powershell
# Prerelease (0.2.1-alpha.0 → 0.2.1-alpha.1)
npm version prerelease --preid=alpha --no-git-tag-version

# Patch (0.2.1 → 0.2.2)
npm version patch --no-git-tag-version

# Minor (0.2.1 → 0.3.0)
npm version minor --no-git-tag-version
```

`--no-git-tag-version` prevents npm from creating a git commit and tag automatically, leaving that control to you.

---

## Step 3 - Publish

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

## Step 4 - Move the `latest` tag

After publishing, point `latest` to the new version:

```powershell
npm dist-tag add @dricosr/opengeometry-values@<version> latest
```

Example:

```powershell
npm dist-tag add @dricosr/opengeometry-values@0.2.1-alpha.1 latest
```

Verify:

```powershell
npm dist-tag ls @dricosr/opengeometry-values
# Expected: alpha: 0.2.1-alpha.1
#           latest: 0.2.1-alpha.1
```

---

## Full example - publishing 0.2.1-alpha.1

```powershell
cd "e:\Cloud\Git\og\opengeometry-values"

npm login
npm whoami                                          # dricosr

npm version prerelease --preid=alpha --no-git-tag-version  # → 0.2.1-alpha.1
npm publish --access public --tag alpha
npm dist-tag add @dricosr/opengeometry-values@0.2.1-alpha.1 latest

npm dist-tag ls @dricosr/opengeometry-values        # confirm tags
```

---

## Notes

- Always use **PowerShell** - `cmd.exe` has known incompatibilities with the Vite/Vitest build pipeline used in `prepublishOnly`
- The `dist/` folder is generated at publish time and is not committed to git
- For automated publishing from CI, use an npm **Automation token** with IP restriction and store it as the `NPM_TOKEN` secret in GitHub Actions - see `.github/workflows/release.yml`
- Never commit npm tokens to the repository
