import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 5173,
    base: "./dist/",
    allowedHosts: ["172.18.0.3"],
    allowCrossOrigin: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    watch: {
      ignored: [
        "**/dist/**",
        "**/node_modules/**",
        "**/.git/**",
        "**/.vscode/**",
        "**/.pnpm-store/**",
      ],
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/my-element.ts"),
      name: "MyLib",
      // the proper extensions will be added
      fileName: "my-element",
    },

    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["lit"],
      contentBase: ["./dist", "./.hass_dev/"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          lit: "lit",
        },
      },
    },
  },
});
