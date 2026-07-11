import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHero } from "./PageHero-BXH8hMTx.mjs";
import { R as Reveal } from "./Reveal-FT3bKCny.mjs";
import { S as Star, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
const reviews = [{
  stars: 5,
  t: "Excellent training, very patient instructors. Highly recommend for anyone in Solapur.",
  n: "Student 1"
}, {
  stars: 5,
  t: "Got my car license with their help. The license services saved me so much time.",
  n: "Student 2"
}, {
  stars: 5,
  t: "Best driving school near Bhavani Peth. Proper training sessions and good guidance.",
  n: "Student 3"
}, {
  stars: 4,
  t: "Very cooperative staff. They explained everything clearly about RTO procedures.",
  n: "Student 4"
}, {
  stars: 5,
  t: "Learned two-wheeler and four-wheeler both here. Value for money.",
  n: "Student 5"
}, {
  stars: 5,
  t: "The mock RTO test practice was incredibly helpful. Cleared my DL test on first try.",
  n: "Student 6"
}];
const breakdown = [{
  stars: 5,
  pct: 78
}, {
  stars: 4,
  pct: 16
}, {
  stars: 3,
  pct: 4
}, {
  stars: 2,
  pct: 1
}, {
  stars: 1,
  pct: 1
}];
function ReviewsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { title: "What Our Students Say", subtitle: "Real reviews from drivers we've trained across Solapur.", breadcrumb: "Reviews", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-red text-red" }),
      " 4.7 / 5 — Google Reviews"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 rounded-3xl bg-white p-8 shadow md:grid-cols-[auto_1fr] md:items-center md:gap-12 md:p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-7xl font-black text-navy", children: "4.7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex justify-center gap-0.5", children: Array.from({
            length: 5
          }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 fill-red text-red" }, k)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Based on Google Reviews" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: breakdown.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-6 font-semibold text-navy", children: [
            b.stars,
            "★"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 flex-1 overflow-hidden rounded-full bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-red transition-all duration-1000", style: {
            width: `${b.pct}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-10 text-right text-muted-foreground", children: [
            b.pct,
            "%"
          ] })
        ] }, b.stars)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: reviews.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "lift h-full rounded-2xl bg-white p-7 shadow-[0_8px_28px_-18px_rgb(10_22_40/0.18)] hover:lift-hover", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({
          length: r.stars
        }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-red text-red" }, k)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "mt-4 text-[15px] leading-relaxed text-charcoal", children: [
          '"',
          r.t,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-5 text-sm font-semibold text-navy", children: [
          "— ",
          r.n
        ] })
      ] }) }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "mt-14 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-sm font-bold text-white hover:-translate-y-0.5 transition-transform", children: [
        "Become Our Next Success Story — Book Now ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) })
    ] }) })
  ] });
}
export {
  ReviewsPage as component
};
