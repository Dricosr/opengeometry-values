import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const input = "src/index.mjs";
const name = "OpenGeometryValues";

// mathjs is a peer dependency — kept external in ESM and CJS builds
// so consumers don't get a duplicate copy when they already have it.
const external = ["mathjs"];

export default [
  // ESM — tree-shakeable, for bundlers (Vite, webpack, Rollup, esbuild)
  {
    input,
    external,
    output: {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true
    }
  },

  // CJS — for Node.js and CommonJS environments
  {
    input,
    external,
    output: {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named",
      sourcemap: true
    }
  },

  // IIFE — self-contained, minified, for CDN / direct <script> use.
  // mathjs is bundled here because there is no bundler to resolve it.
  // Approximate size: ~500 KB minified (mathjs accounts for most of it).
  {
    input,
    plugins: [resolve(), commonjs()],
    output: {
      file: "dist/index.iife.min.js",
      format: "iife",
      name,
      sourcemap: true,
      plugins: [terser()]
    }
  }
];
