import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import autoPreprocess from "svelte-preprocess";

export default defineConfig({
    base: "./",
    server: {
        port: 8080,
    },
    build: {
        outDir: "public",
        assetsDir: "build",
        emptyOutDir: false,
        rollupOptions: {
            output: {
                entryFileNames: `build/[name].js`,
                chunkFileNames: `build/[name].js`,
                assetFileNames: `build/[name].[ext]`,
            },
        },
    },
    plugins: [
        svelte({
            preprocess: autoPreprocess(),
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
