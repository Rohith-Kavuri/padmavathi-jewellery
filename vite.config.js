import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { writeSharePages } from "./scripts/share-pages.js";

// The site's own web address, used in index.html for the WhatsApp / social
// link preview (the preview picture must be a full https address).
// Netlify tells the build which address it's deploying to: the live site
// (URL — this follows a custom domain automatically once one is connected)
// or a preview link (DEPLOY_PRIME_URL), so previews show their own card.
const SITE_URL = (
  (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL || process.env.URL) ||
  "https://padmavathijewellers.com"
).replace(/\/$/, "");

let outDir = "dist";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "site-url",
      transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", SITE_URL),
    },
    {
      // one small page per product, so a shared piece shows its own photo and
      // name in WhatsApp (see scripts/share-pages.js)
      name: "share-pages",
      apply: "build",
      configResolved: (config) => {
        outDir = path.resolve(config.root, config.build.outDir);
      },
      closeBundle: () => {
        const n = writeSharePages({ outDir, siteUrl: SITE_URL });
        console.log(`share pages: ${n} written to ${path.relative(process.cwd(), outDir)}/p/`);
      },
    },
  ],
});
