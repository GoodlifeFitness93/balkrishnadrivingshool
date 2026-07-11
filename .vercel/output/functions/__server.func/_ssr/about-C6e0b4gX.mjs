import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHero } from "./PageHero-BXH8hMTx.mjs";
import { R as Reveal } from "./Reveal-FT3bKCny.mjs";
import { P as PHONE, a as PHONE_TEL } from "./router-CenrB29T.mjs";
import "../_libs/sonner.mjs";
import { m as CircleCheck, g as ShieldCheck, G as GraduationCap, H as HeartHandshake, b as MapPin, P as Phone, C as Clock } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "node:fs";
import "node:path";
const instructor = "/assets/instructor-DQTk1vBe.jpg";
const points = ["Certified and experienced driving instructors", "Structured lesson plans tailored to your pace", "Training on real Solapur city roads and traffic", "Full RTO license assistance — no middlemen", "Flexible morning and evening batches", "Two-wheeler and four-wheeler training available"];
const values = [{
  icon: ShieldCheck,
  title: "Safety First",
  text: "Every lesson is built around safe road habits and defensive driving."
}, {
  icon: GraduationCap,
  title: "Student-Centered Learning",
  text: "Lessons paced to your comfort — no rushing, no judgement."
}, {
  icon: HeartHandshake,
  title: "Integrity & Transparency",
  text: "Clear pricing, honest guidance, zero shortcuts on RTO procedures."
}];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { title: "About Balkrishna Driving School", subtitle: "A cornerstone of driver education in Solapur.", breadcrumb: "About Us" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "Our Story" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-black text-navy md:text-5xl", children: "Trusted by Solapur for years." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg leading-relaxed text-muted-foreground", children: "Balkrishna Driving School has been a cornerstone of driver education in Solapur for years. Located in the heart of Bhavani Peth, we have trained over a thousand students — from nervous first-timers to experienced drivers seeking to upgrade their license category." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg leading-relaxed text-muted-foreground", children: "Our mission is simple: make every student a safe, confident, and responsible driver on Indian roads." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl border border-border shadow-[0_20px_60px_-30px_rgb(10_22_40/0.4)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: instructor, alt: "Driving instructor with student", loading: "lazy", className: "h-full w-full object-cover" }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "What Sets Us Apart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-black text-navy md:text-5xl", children: "The Balkrishna difference." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4 md:grid-cols-2", children: points.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 rounded-xl border border-border bg-white p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-6 w-6 shrink-0 text-red" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-charcoal", children: p })
      ] }) }, p)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "Our Values" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-black text-navy md:text-5xl", children: "What we stand for." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-3", children: values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lift h-full rounded-2xl bg-navy p-8 text-white hover:lift-hover", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-xl font-bold", children: v.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/75", children: v.text })
      ] }) }, v.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-black text-navy", children: "Visit us in Bhavani Peth." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-4 text-charcoal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-1 h-5 w-5 text-red" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "55/36, Homkar Nagar, Bhavani Peth, Solapur, Maharashtra 413002" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mt-1 h-5 w-5 text-red" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${PHONE_TEL}`, className: "hover:text-red", children: PHONE })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mt-1 h-5 w-5 text-red" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Opens 7:00 AM daily" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video overflow-hidden rounded-2xl border border-border shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Balkrishna Driving School location", src: "https://www.google.com/maps?q=17.686823,75.9089396&hl=en&z=16&output=embed", className: "h-full w-full", loading: "lazy" }) }) })
    ] }) })
  ] });
}
export {
  AboutPage as component
};
