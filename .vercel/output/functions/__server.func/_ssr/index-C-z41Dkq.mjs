import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { i as imgTwoWheeler, a as imgFourWheeler, b as imgAuto, c as imgTruck, d as imgTempo, e as imgRefresher, f as imgLicense } from "./course-license-Cm7FAnJF.mjs";
import { P as PHONE, a as PHONE_TEL } from "./router-CenrB29T.mjs";
import { R as Reveal, C as Counter } from "./Reveal-FT3bKCny.mjs";
import { s as supabase } from "./supabase-DPGoTFqb.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowRight, P as Phone, n as Check, G as GraduationCap, o as Car, e as ClipboardCheck, b as MapPin, g as ShieldCheck, S as Star, a as MessageCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const hero = "/assets/hero-road-Dr7N7bf5.jpg";
const license = "/assets/license-DRCyeAdH.jpg";
const features = [{
  icon: GraduationCap,
  title: "Expert Certified Instructors",
  text: "Patient, professional, trained to guide beginners to confident drivers."
}, {
  icon: Car,
  title: "All Vehicle Types",
  text: "Training for Two-Wheelers, Cars (Hatchback/Sedan/SUV), and Light Motor Vehicles."
}, {
  icon: ClipboardCheck,
  title: "End-to-End License Help",
  text: "Learner's permit, RTO paperwork, test preparation, and final license — all under one roof."
}, {
  icon: MapPin,
  title: "Convenient Solapur Location",
  text: "Easily accessible from Bhavani Peth and surrounding areas."
}];
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
const reviews = [{
  stars: 5,
  text: "Best driving school in Solapur. The instructors are calm and very patient. Got my license on the first attempt!",
  name: "Solapur resident"
}, {
  stars: 5,
  text: "Not only did I learn driving here, they handled all my RTO paperwork too. Highly recommended.",
  name: "Satisfied student"
}, {
  stars: 4,
  text: "Professional staff, proper training schedule, and flexible timings. Great experience overall.",
  name: "Local learner"
}];
function HomePage() {
  const [activeOffer, setActiveOffer] = reactExports.useState(null);
  const [timeLeft, setTimeLeft] = reactExports.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  reactExports.useEffect(() => {
    async function loadActiveOffer() {
      try {
        const nowIso = (/* @__PURE__ */ new Date()).toISOString();
        const {
          data,
          error
        } = await supabase.from("offers").select("*").eq("is_enabled", true).lte("start_at", nowIso).gte("end_at", nowIso).order("created_at", {
          ascending: false
        }).limit(1);
        if (!error && data && data.length > 0) {
          setActiveOffer(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch offers banner:", err);
      }
    }
    loadActiveOffer();
  }, []);
  reactExports.useEffect(() => {
    if (!activeOffer) return;
    const endTime = new Date(activeOffer.end_at).getTime();
    const timer = setInterval(() => {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const distance = endTime - now;
      if (distance < 0) {
        clearInterval(timer);
        setActiveOffer(null);
        return;
      }
      const days = Math.floor(distance / (1e3 * 60 * 60 * 24));
      const hours = Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
      const minutes = Math.floor(distance % (1e3 * 60 * 60) / (1e3 * 60));
      const seconds = Math.floor(distance % (1e3 * 60) / 1e3);
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, [activeOffer]);
  let offerDetails = {
    course_name: "Premium Driving Course Package",
    original_fee: "7500",
    discount_val: "1500",
    savings: "1500",
    benefits: ["20 Days Comprehensive Practical Sessions", "Dedicated Personal Trainer & Dual-Control Car", "Full RTO Learners Permit & License Preparatory Support", "Wet Weather & Defensive Driving Session"],
    marketing_text: activeOffer ? activeOffer.description : "",
    why_us_badge: "RTO Approved Training Academy"
  };
  if (activeOffer) {
    try {
      if (activeOffer.description && activeOffer.description.trim().startsWith("{")) {
        const parsed = JSON.parse(activeOffer.description);
        offerDetails = {
          ...offerDetails,
          ...parsed
        };
      }
    } catch (e) {
      console.warn("Could not parse campaign JSON, using fallback rendering:", e);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hero, alt: "", width: 1920, height: 1080, className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-navy/70" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-32 pb-20 text-white md:px-8 md:pt-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
        activeOffer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 inline-flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-red-500", children: "LIMITED TIME OFFER" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xl font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-black/40 rounded-lg px-2.5 py-1 min-w-[48px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg", children: String(timeLeft.days).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] uppercase tracking-wider text-white/60", children: "Days" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 font-mono", children: ":" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-black/40 rounded-lg px-2.5 py-1 min-w-[48px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg", children: String(timeLeft.hours).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] uppercase tracking-wider text-white/60", children: "Hours" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 font-mono", children: ":" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-black/40 rounded-lg px-2.5 py-1 min-w-[48px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg", children: String(timeLeft.minutes).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] uppercase tracking-wider text-white/60", children: "Mins" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 font-mono", children: ":" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-black/40 rounded-lg px-2.5 py-1 min-w-[48px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg", children: String(timeLeft.seconds).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] uppercase tracking-wider text-white/60", children: "Secs" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/85 backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-red" }),
          " Solapur • Since Day One"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 font-display text-5xl font-black leading-[0.98] tracking-tight md:text-7xl", children: [
          "Learn to Drive. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red", children: "Earn Your Freedom." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-lg text-white/80 md:text-xl", children: "Solapur's Most Trusted Driving School — Professional Training + RTO License Assistance." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-9 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: activeOffer ? "/contact" : "/contact", search: activeOffer ? {
            offer: activeOffer.id
          } : void 0, className: "inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-sm font-semibold shadow-[0_18px_36px_-12px_rgb(232_35_10/0.7)] transition-transform hover:-translate-y-0.5 text-white", children: [
            "Book a Free Trial ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${PHONE_TEL}`, className: "inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold backdrop-blur hover:bg-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
            " Call Now: ",
            PHONE
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid max-w-2xl grid-cols-2 gap-3 text-xs text-white/80 md:grid-cols-4 md:text-sm", children: [["⭐", "4.7 Google Rating"], ["🚗", "1000+ Drivers Trained"], ["📋", "RTO License Assistance"], ["📍", "Bhavani Peth, Solapur"]].map(([e, t]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: e }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: t })
        ] }, t)) })
      ] }) })
    ] }),
    activeOffer && (() => {
      const originalFeeNum = parseInt(offerDetails.original_fee.replace(/,/g, "")) || 7500;
      const discountValNum = parseInt(offerDetails.discount_val.replace(/,/g, "")) || 1500;
      const finalFee = originalFeeNum - discountValNum;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#090E1A] py-24 border-y border-white/10 text-white relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.05),transparent_50%)] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 md:px-8 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 lg:grid-cols-12 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 lg:col-span-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs font-black text-amber-400 uppercase tracking-widest", children: [
                "⭐ ",
                offerDetails.why_us_badge || "Premium Promotion"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-none", children: activeOffer.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-lg leading-relaxed max-w-2xl pt-2", children: offerDetails.marketing_text || activeOffer.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10", children: offerDetails.benefits && offerDetails.benefits.map((benefit, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold leading-snug", children: benefit })
            ] }, index)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-slate-400 font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5", children: "✓ Certified RTO Instructors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5", children: "✓ Flexible Driving Slots" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5", children: "✓ Dual-Control Safety Cars" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white text-navy rounded-3xl p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-100 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-red to-amber-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-red", children: "Course Assigned" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-black text-navy mt-0.5 tracking-tight leading-tight", children: offerDetails.course_name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-black text-amber-800 shrink-0", children: activeOffer.discount_text })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-6 border-t border-slate-100 flex items-baseline justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs font-bold uppercase tracking-wider block", children: "Special Enrollment Price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-4xl sm:text-5xl font-black text-navy tracking-tight font-display", children: [
                    "₹",
                    finalFee.toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 line-through text-base font-bold", children: [
                    "₹",
                    originalFeeNum.toLocaleString("en-IN")
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-block bg-[#E8F8F0] border border-[#A7F3D0] text-[#065F46] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider", children: [
                "Save ₹",
                discountValNum.toLocaleString("en-IN")
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-slate-50 border border-slate-100 rounded-2xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-red animate-ping" }),
                  "Time Remaining"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold text-red uppercase tracking-widest", children: activeOffer.urgency_text || "Limited Slots" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2 text-center font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-100 py-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black text-navy block leading-none", children: String(timeLeft.days).padStart(2, "0") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-slate-400 font-extrabold uppercase mt-1 block", children: "Days" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-100 py-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black text-navy block leading-none", children: String(timeLeft.hours).padStart(2, "0") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-slate-400 font-extrabold uppercase mt-1 block", children: "Hours" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-100 py-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black text-navy block leading-none", children: String(timeLeft.minutes).padStart(2, "0") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-slate-400 font-extrabold uppercase mt-1 block", children: "Mins" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-slate-100 py-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black text-navy block leading-none", children: String(timeLeft.seconds).padStart(2, "0") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-slate-400 font-extrabold uppercase mt-1 block", children: "Secs" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", search: {
                offer: activeOffer.id
              }, className: "w-full flex items-center justify-center gap-2 rounded-2xl bg-red hover:bg-red/95 text-white font-extrabold py-4 px-6 shadow-xl shadow-red/20 transition-all duration-200 text-sm hover:-translate-y-0.5", children: [
                activeOffer.cta_text || "Secure My Spot Now",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-center text-slate-400 font-semibold block mt-3", children: "⚡ Quick Booking: Instantly redirects to our WhatsApp enrollment line." })
            ] })
          ] }) })
        ] }) })
      ] });
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "Why Choose Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-black text-navy md:text-5xl", children: "A driving school built around your confidence." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lift h-full rounded-2xl border border-border bg-white p-7 shadow-[0_8px_28px_-18px_rgb(10_22_40/0.18)] hover:lift-hover", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-bold text-navy", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: f.text })
      ] }) }, f.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-navy py-14 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-4 md:px-8", children: [{
      n: 1e3,
      s: "+",
      l: "Students Trained"
    }, {
      n: 47,
      s: "/10",
      l: "Google Rating"
    }, {
      n: 15,
      s: "+",
      l: "Years Experience"
    }, {
      n: 100,
      s: "%",
      l: "RTO Compliant"
    }].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-black md:text-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: x.n, suffix: x.s }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs uppercase tracking-[0.2em] text-white/65", children: x.l })
    ] }, x.l)) }) }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-navy py-20 text-white md:py-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-40 [background:radial-gradient(50%_50%_at_85%_30%,rgb(232_35_10/0.45),transparent_60%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "License Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl font-black leading-tight md:text-5xl", children: [
            "We Don't Just Teach You to Drive — ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red", children: "We Help You Get Licensed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-white/75", children: "Balkrishna Driving School provides complete RTO license assistance for learner's permits and permanent driving licenses. Skip the confusion — we handle the paperwork, guide you through the process, and prepare you for the RTO test." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/license", className: "mt-7 inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-sm font-semibold shadow-[0_18px_36px_-12px_rgb(232_35_10/0.6)] hover:-translate-y-0.5 transition-transform", children: [
            "Explore License Services ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: license, alt: "RTO Driving License", loading: "lazy", className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/95 p-4 text-navy backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-8 w-8 text-red" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: "100% Compliant" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Maharashtra Motor Vehicle Rules" })
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "flex flex-wrap items-end justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "Testimonials" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-black text-navy md:text-5xl", children: "Loved by drivers across Solapur." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-red text-red" }),
          " 4.7 / 5 — Google Reviews"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: reviews.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "lift h-full rounded-2xl bg-white p-7 shadow-[0_8px_28px_-18px_rgb(10_22_40/0.18)] hover:lift-hover", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({
          length: r.stars
        }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-red text-red" }, k)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "mt-4 text-[15px] leading-relaxed text-charcoal", children: [
          '"',
          r.text,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-5 text-sm font-semibold text-navy", children: [
          "— ",
          r.name
        ] })
      ] }) }, i)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-red p-8 text-white md:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-wrap items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-black md:text-4xl", children: "Ready to Start?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-white/90", children: "Book your trial lesson today — we'll get you behind the wheel." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", search: {
          course: "Trial Lesson"
        }, className: "inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-red shadow-xl hover:-translate-y-0.5 transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " Book a Trial Now"
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  HomePage as component
};
