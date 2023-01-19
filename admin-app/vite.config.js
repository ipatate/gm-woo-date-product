import { resolve, sep } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import legacy from '@vitejs/plugin-legacy'
import liveReload from "vite-plugin-live-reload";

// find theme plugin name
export function getPluginDir() {
  const _path = process.cwd().split(sep);
  return _path[_path.length - 1];
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    liveReload([
      __dirname + "/**/*.php",
      // __dirname + '/**/*.twig'
    ]),
    // legacy({
    //   targets: ['defaults'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    //   polyfills: [],
    //   modernPolyfills: [],
    // }),
  ],
  base:
    process.env.APP_ENV === "development"
      ? `/wp-content/plugins/${getPluginDir()}/admin-app`
      : `/wp-content/plugins/${getPluginDir()}/admin-app/`,
  root: "",
  build: {
    // output dir for production build
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    manifest: true,
    target: "es6",
    rollupOptions: {
      input: resolve(__dirname, "main.js"),
    },
  },
  optimizeDeps: {
    // exclude: ['vue'],
  },
  server: {
    cors: true,
    strictPort: true,
    port: 3000,
    https: false,
    hmr: {
      protocol: "ws",
      port: 3000,
      // host: 'localhost',
    },
  },
});
