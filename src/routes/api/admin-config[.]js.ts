import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin-config.js")({
  server: {
    handlers: {
      GET: async () => {
        const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
        const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";
        const script = `
          window.SUPABASE_URL = ${JSON.stringify(supabaseUrl)};
          window.SUPABASE_ANON_KEY = ${JSON.stringify(supabaseAnonKey)};
          window.WHATSAPP_NUMBER = "919422370787";
        `;
        return new Response(script, {
          headers: { 
            "Content-Type": "application/javascript",
            "Cache-Control": "no-store, max-age=0"
          },
        });
      },
    },
  },
});
