import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { PHONE, PHONE_TEL, waLink, defaultWAMessage } from "@/lib/wa";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-md bg-white p-1.5" width={48} height={48} />
            <div>
              <div className="font-display text-lg font-extrabold">Balkrishna</div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/70">Driving School</div>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm text-white/70">Driving Solapur Forward Since Day One.</p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-red"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-red"><Facebook className="h-4 w-4" /></a>
            <a href={waLink(defaultWAMessage())} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="rounded-full bg-white/10 p-2 hover:bg-red"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Quick Links</h4>
          <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/courses", "Courses"],
              ["/license", "License Services"],
              ["/reviews", "Reviews"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-white/80 transition-colors hover:text-red">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red" /><span>55/36, Homkar Nagar, Bhavani Peth, Solapur, Maharashtra 413002</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-red" /><a href={`tel:${PHONE_TEL}`} className="hover:text-white">{PHONE}</a></li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-red" /><span>Opens 7:00 AM daily</span></li>
          </ul>
          <a href={waLink(defaultWAMessage())} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold">
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/60 md:px-8">
          © {new Date().getFullYear()} Balkrishna Driving School, Solapur. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
