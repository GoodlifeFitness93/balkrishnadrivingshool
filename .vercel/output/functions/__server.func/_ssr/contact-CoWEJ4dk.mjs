import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHero } from "./PageHero-BXH8hMTx.mjs";
import { R as Reveal } from "./Reveal-FT3bKCny.mjs";
import { P as PHONE, a as PHONE_TEL, w as waLink } from "./router-CenrB29T.mjs";
import { s as supabase } from "./supabase-DPGoTFqb.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as MapPin, P as Phone, C as Clock, a as MessageCircle, I as Instagram } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function ContactPage() {
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    vehicle: "Four-Wheeler",
    service: "Driving Course",
    batch: "Morning",
    message: ""
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const courseParam = urlParams.get("course");
      const offerParam = urlParams.get("offer");
      if (courseParam || offerParam) {
        let detectedVehicle = "Four-Wheeler";
        if (courseParam) {
          const cp = courseParam.toLowerCase();
          if (cp.includes("two-wheeler") || cp.includes("scooter") || cp.includes("motorcycle")) {
            detectedVehicle = "Two-Wheeler";
          } else if (cp.includes("auto") || cp.includes("rickshaw")) {
            detectedVehicle = "Auto-Rickshaw";
          } else if (cp.includes("heavy") || cp.includes("truck") || cp.includes("hmv")) {
            detectedVehicle = "Heavy Motor Vehicle";
          } else if (cp.includes("tempo") || cp.includes("lcv")) {
            detectedVehicle = "Tempo/LCV";
          }
        }
        let detectedService = "Driving Course";
        if (courseParam && (courseParam.toLowerCase().includes("license") || courseParam.toLowerCase().includes("rto"))) {
          detectedService = "License Assistance";
        }
        setForm((f) => ({
          ...f,
          vehicle: detectedVehicle,
          service: detectedService,
          message: f.message || (courseParam ? `Hi, I am interested in enrolling for the "${courseParam}" course.` : "")
        }));
        setTimeout(() => {
          const formEl = document.getElementById("enquiry-form");
          if (formEl) {
            formEl.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }, 150);
      }
    }
  }, []);
  function update(k, v) {
    setForm((f) => ({
      ...f,
      [k]: v
    }));
  }
  async function submit(e) {
    e.preventDefault();
    const fullName = form.name.trim();
    const phone = form.phone.trim();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setSubmitting(true);
    const urlParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const courseParam = urlParams.get("course");
    const offerParam = urlParams.get("offer");
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const validOfferId = offerParam && uuidRegex.test(offerParam) ? offerParam : null;
    try {
      const {
        error
      } = await supabase.from("enquiries").insert([{
        full_name: fullName,
        phone,
        course: form.vehicle,
        preferred_batch: form.batch,
        message: `Service: ${form.service}. ${form.message}`.trim() || null,
        course_source: courseParam || "direct",
        offer_id: validOfferId,
        status: "new"
      }]);
      if (error) {
        throw new Error(error.message);
      }
      const text = `Hi, I'd like to enquire at Balkrishna Driving School.

• Name: ${fullName}
• Phone: ${phone}
• Vehicle Type: ${form.vehicle}
• Service Needed: ${form.service}
• Preferred Batch: ${form.batch}
${form.message ? `• Message: ${form.message}` : ""}

Please share details.`;
      const waUrl = waLink(text);
      try {
        window.open(waUrl, "_blank");
      } catch (waErr) {
        console.error("WhatsApp tab popup blocked:", waErr);
      }
      toast.success("Enquiry received successfully! Opening WhatsApp...");
      setSubmitted(true);
    } catch (err) {
      console.error("Supabase enquiry insert failed:", err);
      toast.error("Failed to submit enquiry: " + (err.message || "Database connection error. Please try again."));
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { title: "Get In Touch", subtitle: "We're here to answer your questions and help you get started.", breadcrumb: "Contact Us" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-black text-navy", children: "Contact details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red/10 text-red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-navy", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "55/36, Homkar Nagar, Bhavani Peth, Solapur, Maharashtra 413002" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red/10 text-red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-navy", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${PHONE_TEL}`, className: "text-muted-foreground hover:text-red", children: PHONE })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red/10 text-red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-navy", children: "Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Opens 7:00 AM daily" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-navy", children: "WhatsApp" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: waLink("Hi, I'd like to enquire at Balkrishna Driving School."), target: "_blank", rel: "noreferrer", className: "text-muted-foreground hover:text-red", children: "Chat with us directly" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 aspect-video overflow-hidden rounded-2xl border border-border shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Balkrishna Driving School Location", src: "https://www.google.com/maps?q=17.686823,75.9089396&hl=en&z=16&output=embed", className: "h-full w-full", loading: "lazy" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-cream p-8 shadow-[0_20px_60px_-30px_rgb(10_22_40/0.3)] md:p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-black text-navy mb-4", children: "Thank You!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-charcoal mb-6", children: "Your enquiry has been processed. We have opened WhatsApp to connect with you directly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink(`Hi, I'd like to follow up on my enquiry. Name: ${form.name}`), target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-full bg-red px-6 py-4.5 text-sm font-bold text-white shadow-lg hover:-translate-y-0.5 transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
          " Message us on WhatsApp"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSubmitted(false), className: "mt-6 block w-full text-xs text-navy/70 hover:underline font-semibold", children: "Send another enquiry" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "enquiry-form", onSubmit: submit, className: "rounded-3xl border border-border bg-cream p-8 shadow-[0_20px_60px_-30px_rgb(10_22_40/0.3)] md:p-10 scroll-mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-black text-navy", children: "Send an enquiry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "We'll continue the conversation on WhatsApp." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name, onChange: (e) => update("name", e.target.value), className: inputCls, placeholder: "Your name" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone Number", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "tel", value: form.phone, onChange: (e) => update("phone", e.target.value), className: inputCls, placeholder: "10-digit mobile" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Vehicle Type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.vehicle, onChange: (e) => update("vehicle", e.target.value), className: inputCls, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Two-Wheeler" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Four-Wheeler" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Auto-Rickshaw" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Heavy Motor Vehicle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Tempo/LCV" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Service Needed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.service, onChange: (e) => update("service", e.target.value), className: inputCls, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Driving Course" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "License Assistance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Both" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Preferred Batch", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.batch, onChange: (e) => update("batch", e.target.value), className: inputCls, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Morning" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Evening" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Message (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.message, onChange: (e) => update("message", e.target.value), rows: 3, className: inputCls, placeholder: "Anything we should know" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-4 text-sm font-bold text-white hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed", children: submitting ? "Processing..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " Send via WhatsApp"
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 text-center md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "mx-auto h-8 w-8 text-red" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-2xl font-black text-navy", children: "Follow us on Instagram" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Tips, student stories, and behind-the-scenes from Solapur's roads." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "mt-5 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-6 py-3 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors", children: "@balkrishnadrivingschool" })
    ] }) }) })
  ] });
}
const inputCls = "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal outline-none ring-red/30 transition focus:border-red focus:ring-2";
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-navy/70", children: label }),
    children
  ] });
}
export {
  ContactPage as component
};
