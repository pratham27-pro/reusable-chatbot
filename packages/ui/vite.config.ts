import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Custom plugin: takes compiled style.css and injects it into index.js as a self-executing style injector
function injectCssPlugin(): Plugin {
  let cssContent = "";

  return {
    name: "inject-css-as-string",
    apply: "build",
    generateBundle(_, bundle) {
      // Find the compiled CSS file in the bundle
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.endsWith(".css") && chunk.type === "asset") {
          cssContent = chunk.source as string;
          // Remove the standalone CSS file from bundle — we don't want dist/style.css
          delete bundle[fileName];
        }
      }

      // Inject CSS string into the ES module output
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === "chunk" && fileName === "index.js") {
          const escaped = cssContent
            .replace(/`/g, "\\`")
            .replace(/\\/g, "\\\\")
            .replace(/\$\{/g, "\\${");
          const injectionCode = `
;(function(){
  if(typeof document==='undefined')return;
  if(document.querySelector('style[data-chatbot-rag]'))return;
  var s=document.createElement('style');
  s.setAttribute('data-chatbot-rag','');
  s.textContent=\`${escaped}\`;
  document.head.appendChild(s);
})();
`;
          chunk.code = injectionCode + chunk.code;
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      include: ["src"],
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
    injectCssPlugin(), // ← runs after CSS is compiled
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
