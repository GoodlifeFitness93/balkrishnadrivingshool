import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHero } from "./PageHero-BXH8hMTx.mjs";
import { R as Reveal } from "./Reveal-FT3bKCny.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { c as FileCheckCorner, d as FileText, B as Building2, e as ClipboardCheck, f as IdCard, g as ShieldCheck, a as MessageCircle, h as ChevronDown } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-direction.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
const steps = [{
  icon: FileCheckCorner,
  t: "Document Collection & Verification"
}, {
  icon: FileText,
  t: "Learner's License Application (Form 1 & 2)"
}, {
  icon: Building2,
  t: "RTO Submission & Slot Booking"
}, {
  icon: ClipboardCheck,
  t: "Test Preparation & Mock Practice"
}, {
  icon: IdCard,
  t: "Permanent Driving License in Your Hands"
}];
const services = [["📄", "Learner's License (LLR) Assistance", "Two-Wheeler & Four-Wheeler"], ["🪪", "Permanent Driving License Application", "End-to-end RTO support"], ["🔄", "License Renewal Support", "Quick, hassle-free renewals"], ["📋", "DL Upgrade", "Add a new vehicle category"], ["🗂️", "RTO Documentation Guidance", "We get the paperwork right"], ["✅", "Mock RTO Test Preparation", "Practice till you're ready"]];
function LicensePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { title: "Complete RTO License Assistance", subtitle: "From Learner's Permit to Permanent License — We Handle It All.", breadcrumb: "License Services" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "What We Do" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-black text-navy md:text-5xl", children: "A clear, guided process." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-4 md:grid-cols-5", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lift relative h-full rounded-2xl border border-border bg-white p-6 hover:lift-hover", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-3 left-6 inline-flex h-7 items-center rounded-full bg-red px-3 text-xs font-bold text-white", children: [
          "Step ",
          i + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-red", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-semibold text-navy", children: s.t })
      ] }) }, s.t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-black text-navy md:text-5xl", children: "All your RTO needs, one place." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-2", children: services.map(([emoji, title, sub], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lift flex items-start gap-4 rounded-2xl border border-border bg-white p-6 hover:lift-hover", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-navy", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: sub })
        ] })
      ] }) }, title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-red", children: "Documents Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-black text-navy md:text-5xl", children: "What you need to bring." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Accordion, { type: "single", collapsible: true, className: "mt-8 rounded-2xl border border-border bg-white px-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "llr", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "px-4 text-left text-base font-semibold text-navy", children: "For Learner's License" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "px-4 text-muted-foreground", children: "Aadhaar / PAN / Passport • Passport-size photos • Form 1 (Medical) • Form 2 (Application)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "dl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "px-4 text-left text-base font-semibold text-navy", children: "For Permanent License" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "px-4 text-muted-foreground", children: "Valid LLR (minimum 30 days old) • Driving test appointment • Original documents" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-5 rounded-3xl border border-navy/10 bg-navy p-8 text-white md:flex-row md:items-center md:justify-between md:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-10 w-10 shrink-0 text-red" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-white/85", children: "All RTO procedures are handled in compliance with Maharashtra Motor Vehicle Rules. We guide you — the license is legitimately yours." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", search: {
        course: "RTO License Assistance"
      }, className: "inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-red px-6 py-3 text-sm font-bold hover:-translate-y-0.5 transition-transform", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
        " Start Your License Process"
      ] })
    ] }) }) }) })
  ] });
}
export {
  LicensePage as component
};
