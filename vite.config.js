import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    root: "src/",
    base: process.env.NODE_ENV === "production" ? "/apple-iphone15-clone" : "",
    publicDir: "../public/",
    plugins: [react(), tailwindcss(), sentryVitePlugin({
        org: "chris-toribio",
        project: "javascript-react"
    })],
    server: {
        host: true, // Open to local network and display URL
        open: !(
            "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env
        ), // Open if it's not a CodeSandbox
    },
    build: {
        sourcemap: true
    }
});