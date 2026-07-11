import { createFileRoute } from "@tanstack/react-router";
// @ts-ignore
import htmlContent from "../../../public/admin/index.html?raw";

export const Route = createFileRoute("/admin/")({
  server: {
    handlers: {
      GET: async () => {
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
