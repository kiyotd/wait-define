import { build } from "esbuild";

const shared = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "neutral",
  target: ["es2021"],
  minify: true,
  sourcemap: false,
};

await Promise.all([
  build({ ...shared, format: "cjs", outfile: "dist/index.cjs" }),
  build({ ...shared, format: "esm", outfile: "dist/index.mjs" }),
]);
