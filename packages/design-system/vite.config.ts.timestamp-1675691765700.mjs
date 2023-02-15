// vite.config.ts
import react from "file:///home/sero/TheGame/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///home/sero/TheGame/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/home/sero/TheGame/packages/design-system";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "ds",
      fileName: "ds"
    },
    minify: false,
    rollupOptions: {
      external: ["react", "@emotion/react"],
      output: {
        globals: {
          react: "React",
          "@emotion/react": "@emotion/react"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};

