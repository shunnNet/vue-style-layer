import { defineBuildConfig } from "unbuild"

export default defineBuildConfig([
  {
    entries: [
      {
        input: "./src/index.ts",
        name: "index",
        outDir: "dist",
      },
      {
        input: "./src/vite.ts",
        name: "vite",
        outDir: "dist",
      },
      {
        input: "./src/webpack.ts",
        name: "webpack",
        outDir: "dist",
      },
    ],
    externals: ["vite"], // include vite will cause build error in pnpm monorepo with vite dependency, why ?
    declaration: true,
    rollup: {
      emitCJS: true,
    },
  },
])
