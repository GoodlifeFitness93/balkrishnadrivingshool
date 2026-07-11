import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { PHONE_TEL, waLink, defaultWAMessage } from "@/lib/wa";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/courses", label: "Courses" },
  { to: "/license", label: "License Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-navy text-white shadow-[0_6px_24px_-8px_rgb(10_22_40/0.35)]"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="Balkrishna Driving School logo" className="h-10 w-10 rounded-md bg-white p-1" width={40} height={40} />
          <div className="leading-tight">
            <div className="font-display text-base font-extrabold tracking-tight md:text-lg">Balkrishna</div>
            <div className="text-[10px] uppercase tracking-[0.18em] opacity-80 md:text-xs">Driving School</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
              activeProps={{ className: "text-white" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={waLink(defaultWAMessage("a trial lesson"))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgb(232_35_10/0.7)] transition-transform hover:-translate-y-0.5"
          >
            Book a Trial
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label="Call us"
            className="rounded-full bg-white/10 p-2 text-white"
          >
            <Phone className="h-5 w-5" />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-full bg-white/10 p-2 text-white"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={waLink(defaultWAMessage("a trial lesson"))}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-red px-5 py-3 text-sm font-semibold text-white"
            >
              Book a Trial
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
