import { createFileRoute, Link } from "@tanstack/react-router";
import { FileCheck2, FileText, Building2, ClipboardCheck, IdCard, MessageCircle, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { waLink } from "@/lib/wa";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/license")({
  head: () => ({
    meta: [
      { title: "RTO License Assistance — Solapur | Balkrishna Driving School" },
      { name: "description", content: "Complete RTO license assistance in Solapur — Learner's Permit, Permanent DL, renewal, upgrades. Documentation, slot booking, mock tests handled end to end." },
      { property: "og:title", content: "Complete RTO License Assistance" },
      { property: "og:description", content: "From Learner's Permit to Permanent License — handled end to end." },
      { property: "og:url", content: "/license" },
    ],
    links: [{ rel: "canonical", href: "/license" }],
  }),
  component: LicensePage,
});

const steps = [
  { icon: FileCheck2, t: "Document Collection & Verification" },
  { icon: FileText, t: "Learner's License Application (Form 1 & 2)" },
  { icon: Building2, t: "RTO Submission & Slot Booking" },
  { icon: ClipboardCheck, t: "Test Preparation & Mock Practice" },
  { icon: IdCard, t: "Permanent Driving License in Your Hands" },
];

const services = [
  ["📄", "Learner's License (LLR) Assistance", "Two-Wheeler & Four-Wheeler"],
  ["🪪", "Permanent Driving License Application", "End-to-end RTO support"],
  ["🔄", "License Renewal Support", "Quick, hassle-free renewals"],
  ["📋", "DL Upgrade", "Add a new vehicle category"],
  ["🗂️", "RTO Documentation Guidance", "We get the paperwork right"],
  ["✅", "Mock RTO Test Preparation", "Practice till you're ready"],
];

function LicensePage() {
  return (
    <>
      <PageHero
        title="Complete RTO License Assistance"
        subtitle="From Learner's Permit to Permanent License — We Handle It All."
        breadcrumb="License Services"
      />

      {/* Stepper */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">What We Do</span>
            <h2 className="mt-3 font-display text-4xl font-black text-navy md:text-5xl">A clear, guided process.</h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <div className="lift relative h-full rounded-2xl border border-border bg-white p-6 hover:lift-hover">
                  <div className="absolute -top-3 left-6 inline-flex h-7 items-center rounded-full bg-red px-3 text-xs font-bold text-white">Step {i + 1}</div>
                  <div className="mt-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-red"><s.icon className="h-6 w-6" /></div>
                  <p className="mt-4 text-sm font-semibold text-navy">{s.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Services</span>
            <h2 className="mt-3 font-display text-4xl font-black text-navy md:text-5xl">All your RTO needs, one place.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map(([emoji, title, sub], i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="lift flex items-start gap-4 rounded-2xl border border-border bg-white p-6 hover:lift-hover">
                  <div className="text-3xl">{emoji}</div>
                  <div>
                    <h3 className="font-bold text-navy">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Documents Required</span>
            <h2 className="mt-3 font-display text-4xl font-black text-navy md:text-5xl">What you need to bring.</h2>
          </Reveal>
          <Reveal delay={120}>
            <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-border bg-white px-2">
              <AccordionItem value="llr">
                <AccordionTrigger className="px-4 text-left text-base font-semibold text-navy">For Learner's License</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  Aadhaar / PAN / Passport • Passport-size photos • Form 1 (Medical) • Form 2 (Application)
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="dl">
                <AccordionTrigger className="px-4 text-left text-base font-semibold text-navy">For Permanent License</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  Valid LLR (minimum 30 days old) • Driving test appointment • Original documents
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Banner + CTA */}
      <section className="bg-cream pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-5 rounded-3xl border border-navy/10 bg-navy p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-10 w-10 shrink-0 text-red" />
                <p className="max-w-2xl text-white/85">
                  All RTO procedures are handled in compliance with Maharashtra Motor Vehicle Rules. We guide you — the license is legitimately yours.
                </p>
              </div>
              <Link to="/contact" search={{ course: "RTO License Assistance" }}
                 className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-red px-6 py-3 text-sm font-bold hover:-translate-y-0.5 transition-transform">
                <MessageCircle className="h-4 w-4" /> Start Your License Process
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
