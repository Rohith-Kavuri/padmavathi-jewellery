import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site's own web address, used in index.html for the WhatsApp / social
// link preview (the preview picture must be a full https address).
// Netlify tells the build which address it's deploying to: the live site
// (URL — this follows a custom domain automatically once one is connected)
// or a preview link (DEPLOY_PRIME_URL), so previews show their own card.
const SITE_URL = (
  (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL || process.env.URL) ||
  "https://padmavathijewellery.netlify.app"
).replace(/\/$/, "");

export default defineConfig({
  plugins: [
    react(),
    {
      name: "site-url",
      transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", SITE_URL),
    },
  ],
});
