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
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide on scroll down, reappear on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled || open
            ? "bg-navy text-white shadow-[0_6px_24px_-8px_rgb(10_22_40/0.35)]"
            : "bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8 md:py-4">
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
            <Link
              to="/contact"
              search={{ course: "Trial Lesson" }}
              className="inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgb(232_35_10/0.7)] transition-transform hover:-translate-y-0.5"
            >
              Book a Trial
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${PHONE_TEL}`}
              aria-label="Call us"
              className="rounded-full bg-white/10 p-2 text-white active:scale-95 transition-transform"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="rounded-full bg-white/10 p-2 text-white active:scale-95 transition-transform"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[290px] bg-navy p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img src={logo} alt="logo" className="h-8 w-8 rounded-md bg-white p-0.5" />
            <div className="leading-tight text-left">
              <div className="font-display text-sm font-bold text-white">Balkrishna</div>
              <div className="text-[8px] uppercase tracking-wider text-white/70">Driving School</div>
            </div>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-full bg-white/10 p-2 text-white active:scale-95 transition-transform"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-white/80 transition-all hover:bg-white/5 hover:text-white"
              activeProps={{ className: "bg-white/10 text-white" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            search={{ course: "Trial Lesson" }}
            onClick={() => setOpen(false)}
            className="mt-6 flex items-center justify-center rounded-xl bg-red py-3.5 text-base font-bold text-white shadow-lg shadow-red/20 active:scale-95 transition-all"
          >
            Book a Trial
          </Link>
        </nav>
      </div>
    </>
  );
}
