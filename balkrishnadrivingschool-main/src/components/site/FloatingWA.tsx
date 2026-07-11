import { MessageCircle } from "lucide-react";
import { waLink, defaultWAMessage } from "@/lib/wa";

export function FloatingWA() {
  return (
    <a
      href={waLink(defaultWAMessage())}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="pulse-ring fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
