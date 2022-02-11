import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "default"
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      exports: "default"
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...["path"]
  ],
  plugins: [
    typescript({
      typescript: require("typescript")
    })
  ]
};
