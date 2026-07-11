import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import fs from "node:fs";
import path from "node:path";
import { P as Phone, X, M as Menu, I as Instagram, F as Facebook, a as MessageCircle, b as MapPin, C as Clock } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-DcnWbCkk.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const logo = "/assets/logo-CemzGOKk.png";
const PHONE = "094223 70787";
const PHONE_TEL = "+919422370787";
const WA_NUMBER = "919422370787";
function waLink(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
const defaultWAMessage = (topic = "your courses") => `Hi, I'm interested in ${topic} at Balkrishna Driving School. Please share details.`;
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/courses", label: "Courses" },
  { to: "/license", label: "License Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact Us" }
];
function Header() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-navy text-white shadow-[0_6px_24px_-8px_rgb(10_22_40/0.35)]" : "bg-transparent text-white"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", onClick: () => setOpen(false), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Balkrishna Driving School logo", className: "h-10 w-10 rounded-md bg-white p-1", width: 40, height: 40 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-extrabold tracking-tight md:text-lg", children: "Balkrishna" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] opacity-80 md:text-xs", children: "Driving School" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-7 lg:flex", children: [
            links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: l.to,
                className: "text-sm font-medium text-white/85 transition-colors hover:text-white",
                activeProps: { className: "text-white" },
                activeOptions: { exact: l.to === "/" },
                children: l.label
              },
              l.to
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/contact",
                search: { course: "Trial Lesson" },
                className: "inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgb(232_35_10/0.7)] transition-transform hover:-translate-y-0.5",
                children: "Book a Trial"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 lg:hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `tel:${PHONE_TEL}`,
                "aria-label": "Call us",
                className: "rounded-full bg-white/10 p-2 text-white",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setOpen((o) => !o),
                "aria-label": "Toggle menu",
                className: "rounded-full bg-white/10 p-2 text-white",
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
              }
            )
          ] })
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10 bg-navy lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4", children: [
          links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.to,
              onClick: () => setOpen(false),
              className: "rounded-md px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-white",
              children: l.label
            },
            l.to
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contact",
              search: { course: "Trial Lesson" },
              onClick: () => setOpen(false),
              className: "mt-2 inline-flex items-center justify-center rounded-full bg-red px-5 py-3 text-sm font-semibold text-white",
              children: "Book a Trial"
            }
          )
        ] }) })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-navy text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "", className: "h-12 w-12 rounded-md bg-white p-1.5", width: 48, height: 48 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-extrabold", children: "Balkrishna" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-white/70", children: "Driving School" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xs text-sm text-white/70", children: "Driving Solapur Forward Since Day One." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Instagram", className: "rounded-full bg-white/10 p-2 hover:bg-red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Facebook", className: "rounded-full bg-white/10 p-2 hover:bg-red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: waLink(defaultWAMessage()), target: "_blank", rel: "noreferrer", "aria-label": "WhatsApp", className: "rounded-full bg-white/10 p-2 hover:bg-red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-[0.18em] text-white/60", children: "Quick Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 grid grid-cols-2 gap-2 text-sm", children: [
          ["/", "Home"],
          ["/about", "About"],
          ["/courses", "Courses"],
          ["/license", "License Services"],
          ["/reviews", "Reviews"],
          ["/contact", "Contact"]
        ].map(([to, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "text-white/80 transition-colors hover:text-red", children: label }) }, to)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-[0.18em] text-white/60", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-3 text-sm text-white/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-red" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "55/36, Homkar Nagar, Bhavani Peth, Solapur, Maharashtra 413002" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mt-0.5 h-4 w-4 shrink-0 text-red" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${PHONE_TEL}`, className: "hover:text-white", children: PHONE })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mt-0.5 h-4 w-4 shrink-0 text-red" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Opens 7:00 AM daily" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "mt-5 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " Enquire Now"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/60 md:px-8", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Balkrishna Driving School, Solapur. All Rights Reserved."
    ] }) })
  ] });
}
function FloatingWA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: waLink(defaultWAMessage()),
      target: "_blank",
      rel: "noreferrer",
      "aria-label": "Chat on WhatsApp",
      className: "pulse-ring fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-7 w-7" })
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Go home" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. Try refreshing." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        router2.invalidate();
        reset();
      }, className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Try again" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent", children: "Go home" })
    ] })
  ] }) });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Balkrishna Driving School — Solapur's Trusted Driving & RTO License Experts" },
      { name: "description", content: "Learn to drive with Solapur's most trusted driving school. Two-wheeler, car & refresher courses plus complete RTO license assistance. Bhavani Peth, Solapur." },
      { name: "author", content: "Balkrishna Driving School" },
      { property: "og:title", content: "Balkrishna Driving School — Solapur's Trusted Driving & RTO License Experts" },
      { property: "og:description", content: "Learn to drive with Solapur's most trusted driving school. Two-wheeler, car & refresher courses plus complete RTO license assistance. Bhavani Peth, Solapur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Balkrishna Driving School — Solapur's Trusted Driving & RTO License Experts" },
      { name: "twitter:description", content: "Learn to drive with Solapur's most trusted driving school. Two-wheeler, car & refresher courses plus complete RTO license assistance. Bhavani Peth, Solapur." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e57dfb5c-dceb-430c-9b4e-6f393f1d19a7/id-preview-334568f0--3f4f7aca-9d71-442b-b146-9cf1e6c00659.lovable.app-1781014384193.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e57dfb5c-dceb-430c-9b4e-6f393f1d19a7/id-preview-334568f0--3f4f7aca-9d71-442b-b146-9cf1e6c00659.lovable.app-1781014384193.png" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800;900&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWA, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right", closeButton: true })
  ] });
}
const BASE_URL = "";
const Route$9 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", "/about", "/courses", "/license", "/reviews", "/contact"];
        const urls = paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
        });
      }
    }
  }
});
const $$splitComponentImporter$5 = () => import("./reviews-DSXshWOV.mjs");
const Route$8 = createFileRoute("/reviews")({
  head: () => ({
    meta: [{
      title: "Reviews — What Our Students Say | Balkrishna Driving School"
    }, {
      name: "description",
      content: "Read reviews from Balkrishna Driving School students in Solapur. ⭐ 4.7/5 on Google. Real experiences from real learners."
    }, {
      property: "og:title",
      content: "Student Reviews — Balkrishna Driving School"
    }, {
      property: "og:description",
      content: "⭐ 4.7/5 — Loved by Solapur drivers."
    }, {
      property: "og:url",
      content: "/reviews"
    }],
    links: [{
      rel: "canonical",
      href: "/reviews"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./license-ChAHLu_g.mjs");
const Route$7 = createFileRoute("/license")({
  head: () => ({
    meta: [{
      title: "RTO License Assistance — Solapur | Balkrishna Driving School"
    }, {
      name: "description",
      content: "Complete RTO license assistance in Solapur — Learner's Permit, Permanent DL, renewal, upgrades. Documentation, slot booking, mock tests handled end to end."
    }, {
      property: "og:title",
      content: "Complete RTO License Assistance"
    }, {
      property: "og:description",
      content: "From Learner's Permit to Permanent License — handled end to end."
    }, {
      property: "og:url",
      content: "/license"
    }],
    links: [{
      rel: "canonical",
      href: "/license"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./courses-C2moTGdP.mjs");
const Route$6 = createFileRoute("/courses")({
  head: () => ({
    meta: [{
      title: "Driving Courses — Two-Wheeler to Heavy Vehicle | Balkrishna"
    }, {
      name: "description",
      content: "All driving courses in Solapur — Two-wheeler, Car, Auto Rickshaw, Truck, Tempo, Refresher & RTO License Assistance. Enquire now."
    }, {
      property: "og:title",
      content: "Our Driving Courses"
    }, {
      property: "og:description",
      content: "7 specialized driving courses + RTO license assistance."
    }, {
      property: "og:url",
      content: "/courses"
    }],
    links: [{
      rel: "canonical",
      href: "/courses"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./contact-CoWEJ4dk.mjs");
const Route$5 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact Balkrishna Driving School — Solapur"
    }, {
      name: "description",
      content: "Get in touch with Balkrishna Driving School in Bhavani Peth, Solapur. Call, WhatsApp, or send an enquiry — we open at 7 AM daily."
    }, {
      property: "og:title",
      content: "Contact Us — Balkrishna Driving School"
    }, {
      property: "og:description",
      content: "Visit, call, or WhatsApp us in Solapur."
    }, {
      property: "og:url",
      content: "/contact"
    }],
    links: [{
      rel: "canonical",
      href: "/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about-C6e0b4gX.mjs");
const Route$4 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About Us — Balkrishna Driving School, Solapur"
    }, {
      name: "description",
      content: "Cornerstone of driver education in Solapur. Certified instructors, structured lessons, and complete RTO license assistance in Bhavani Peth."
    }, {
      property: "og:title",
      content: "About Balkrishna Driving School"
    }, {
      property: "og:description",
      content: "Years of trusted driver education in Solapur."
    }, {
      property: "og:url",
      content: "/about"
    }],
    links: [{
      rel: "canonical",
      href: "/about"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-C-z41Dkq.mjs");
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Balkrishna Driving School — Learn to Drive in Solapur"
    }, {
      name: "description",
      content: "Solapur's most trusted driving school. Two-wheeler, four-wheeler & refresher training + complete RTO license assistance. ⭐ 4.7 rated. Book a free trial."
    }, {
      property: "og:title",
      content: "Balkrishna Driving School — Solapur"
    }, {
      property: "og:description",
      content: "Professional training + RTO license assistance. Bhavani Peth, Solapur."
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route$2 = createFileRoute("/admin/")({
  server: {
    handlers: {
      GET: async () => {
        const htmlPath = path.resolve(process.cwd(), "public/admin/index.html");
        const htmlContent = await fs.promises.readFile(htmlPath, "utf-8");
        return new Response(htmlContent, {
          headers: {
            "Content-Type": "text/html",
            "Cache-Control": "no-store, max-age=0"
          }
        });
      }
    }
  }
});
const Route$1 = createFileRoute("/api/admin-config.js")({
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
          }
        });
      }
    }
  }
});
const Route = createFileRoute("/admin/login")({
  server: {
    handlers: {
      GET: async () => {
        const htmlPath = path.resolve(process.cwd(), "public/admin/login.html");
        const htmlContent = await fs.promises.readFile(htmlPath, "utf-8");
        return new Response(htmlContent, {
          headers: {
            "Content-Type": "text/html",
            "Cache-Control": "no-store, max-age=0"
          }
        });
      }
    }
  }
});
const SitemapDotxmlRoute = Route$9.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$a
});
const ReviewsRoute = Route$8.update({
  id: "/reviews",
  path: "/reviews",
  getParentRoute: () => Route$a
});
const LicenseRoute = Route$7.update({
  id: "/license",
  path: "/license",
  getParentRoute: () => Route$a
});
const CoursesRoute = Route$6.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => Route$a
});
const ContactRoute = Route$5.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$a
});
const AboutRoute = Route$4.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const AdminIndexRoute = Route$2.update({
  id: "/admin/",
  path: "/admin/",
  getParentRoute: () => Route$a
});
const ApiAdminConfigDotjsRoute = Route$1.update({
  id: "/api/admin-config.js",
  path: "/api/admin-config.js",
  getParentRoute: () => Route$a
});
const AdminLoginRoute = Route.update({
  id: "/admin/login",
  path: "/admin/login",
  getParentRoute: () => Route$a
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ContactRoute,
  CoursesRoute,
  LicenseRoute,
  ReviewsRoute,
  SitemapDotxmlRoute,
  AdminLoginRoute,
  ApiAdminConfigDotjsRoute,
  AdminIndexRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  PHONE as P,
  PHONE_TEL as a,
  router as r,
  waLink as w
};
