// @ts-check
import { defineConfig } from "astro/config";

// pulled from: https://github.com/shot-codes/alabaster-variant-theme
// technically these are VSCode, but Shiki seems to parse them just fine
import alabasterLight from "./src/themes/alabaster-light.json";
import alabasterDark from "./src/themes/alabaster-dark.json";

// https://astro.build/config
export default defineConfig({
  site: "https://sdufresne.info",
  markdown: {
    shikiConfig: {
      // themes: {
      //   light: "github-light",
      //   dark: "github-dark",
      // },
      themes: {
        // @ts-ignore this actually works
        light: alabasterLight,
        // @ts-ignore this actually works
        dark: alabasterDark,
      },
    },
  },
});
