import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHero } from "./PageHero-BXH8hMTx.mjs";
import { R as Reveal } from "./Reveal-FT3bKCny.mjs";
import { i as imgTwoWheeler, a as imgFourWheeler, b as imgAuto, c as imgTruck, d as imgTempo, e as imgRefresher, f as imgLicense } from "./course-license-Cm7FAnJF.mjs";
import { A as ArrowRight, T as TrafficCone, i as ShieldAlert, j as SquareParking, k as Moon, R as Route, l as TriangleAlert } from "../_libs/lucide-react.mjs";
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
const courses = [{
  emoji: "🏍️",
  title: "Two-Wheeler Training",
  subtitle: "Scooter & Motorcycle",
  img: imgTwoWheeler,
  desc: "Learn to ride both scooters and motorcycles from scratch. Covers vehicle control, balancing, traffic navigation, road safety rules, and ghat/incline riding techniques for complete confidence on any terrain."
}, {
  emoji: "🚗",
  title: "Four-Wheeler Car Training",
  subtitle: "Hatchback, Sedan & SUV",
  img: imgFourWheeler,
  desc: "Master car driving with structured lessons covering clutch control, gear shifting, city traffic, parking, lane discipline, and highway driving. Trained on real Solapur roads."
}, {
  emoji: "🛺",
  title: "Auto Rickshaw Training",
  subtitle: "Three-Wheeler License",
  img: imgAuto,
  desc: "Professional training for three-wheeler auto rickshaws. Learn manoeuvring in tight city lanes, passenger safety, and everything needed to clear your commercial three-wheeler RTO test."
}, {
  emoji: "🚛",
  title: "Heavy Motor Vehicle Training",
  subtitle: "Truck & Commercial Vehicles",
  img: imgTruck,
  desc: "Specialized training for heavy trucks and commercial transport vehicles. Covers wide-vehicle handling, loading zone navigation, highway driving, and Heavy Motor Vehicle (HMV) license preparation."
}, {
  emoji: "🚐",
  title: "Tempo & Light Commercial Vehicle",
  subtitle: "LMV Transport Category",
  img: imgTempo,
  desc: "Training for tempos, mini-trucks, and light commercial vehicles. Ideal for those seeking a transport license for small goods delivery or passenger vehicles under the LMV-Transport category."
}, {
  emoji: "🔁",
  title: "Refresher & Advanced Course",
  subtitle: "For Licensed Drivers",
  img: imgRefresher,
  desc: "Already have a license but lacking confidence or practicing after a long gap? Our refresher sessions correct bad habits, build road confidence, and prepare you for ghat roads and highway driving."
}, {
  emoji: "📋",
  title: "RTO License Assistance",
  subtitle: "Learner's Permit to Permanent DL",
  img: imgLicense,
  desc: "We handle all RTO-related formalities — learner's license, permanent driving license, license renewal, DL upgrades, and documentation for all vehicle categories. No middlemen. No confusion."
}];
const highlights = [{
  icon: TrafficCone,
  label: "Traffic Signs & Rules"
}, {
  icon: ShieldAlert,
  label: "Defensive Driving"
}, {
  icon: SquareParking,
  label: "Parking Techniques"
}, {
  icon: Moon,
  label: "Night Driving Basics"
}, {
  icon: Route,
  label: "Highway Confidence"
}, {
  icon: TriangleAlert,
  label: "Emergency Braking"
}];
function CoursesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { title: "Our Driving Courses", subtitle: "Everything You Need — Under One Roof", breadcrumb: "Courses" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "Our Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-black text-navy md:text-5xl", children: "Everything You Need — Under One Roof" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "From two-wheelers to heavy trucks, and from your first lesson to your final license — Balkrishna Driving School covers it all." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: courses.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "lift group h-full overflow-hidden rounded-2xl border border-border bg-white shadow-[0_8px_28px_-18px_rgb(10_22_40/0.18)] hover:lift-hover", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.img, alt: c.title, loading: "lazy", width: 1024, height: 576, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red text-lg text-white shadow-sm", children: c.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-xl font-bold text-navy", children: c.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-semibold text-red", children: c.subtitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: c.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", search: {
            course: c.title
          }, className: "mt-5 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 transition-transform", children: [
            "Enquire Now ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }) }, c.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "Curriculum Highlights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-black text-navy md:text-5xl", children: "Everything we cover." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3", children: highlights.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lift flex items-center gap-4 rounded-xl border border-border bg-white p-5 hover:lift-hover", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-11 w-11 items-center justify-center rounded-lg bg-red/10 text-red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(h.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-navy", children: h.label })
      ] }) }, h.label)) })
    ] }) })
  ] });
}
export {
  CoursesPage as component
};
