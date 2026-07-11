import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs";
import path from "node:path";

export const Route = createFileRoute("/admin/")({
  server: {
    handlers: {
      GET: async () => {
        const htmlPath = path.resolve(process.cwd(), "public/admin/index.html");
        const htmlContent = await fs.promises.readFile(htmlPath, "utf-8");
        return new Response(htmlContent, {
          headers: { 
            "Content-Type": "text/html",
            "Cache-Control": "no-store, max-age=0"
          },
        });
      },
    },
  },
});
