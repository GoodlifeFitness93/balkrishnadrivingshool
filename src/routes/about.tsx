import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, HeartHandshake, GraduationCap, Phone, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { PHONE, PHONE_TEL } from "@/lib/wa";
import instructor from "@/assets/instructor.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Balkrishna Driving School, Solapur" },
      { name: "description", content: "Cornerstone of driver education in Solapur. Certified instructors, structured lessons, and complete RTO license assistance in Bhavani Peth." },
      { property: "og:title", content: "About Balkrishna Driving School" },
      { property: "og:description", content: "Years of trusted driver education in Solapur." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const points = [
  "Certified and experienced driving instructors",
  "Structured lesson plans tailored to your pace",
  "Training on real Solapur city roads and traffic",
  "Full RTO license assistance — no middlemen",
  "Flexible morning and evening batches",
  "Two-wheeler and four-wheeler training available",
];

const values = [
  { icon: ShieldCheck, title: "Safety First", text: "Every lesson is built around safe road habits and defensive driving." },
  { icon: GraduationCap, title: "Student-Centered Learning", text: "Lessons paced to your comfort — no rushing, no judgement." },
  { icon: HeartHandshake, title: "Integrity & Transparency", text: "Clear pricing, honest guidance, zero shortcuts on RTO procedures." },
];

function AboutPage() {
  return (
    <>
      <PageHero title="About Balkrishna Driving School" subtitle="A cornerstone of driver education in Solapur." breadcrumb="About Us" />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Our Story</span>
            <h2 className="mt-3 font-display text-4xl font-black text-navy md:text-5xl">Trusted by Solapur for years.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Balkrishna Driving School has been a cornerstone of driver education in Solapur for years. Located in the heart of Bhavani Peth, we have trained over a thousand students — from nervous first-timers to experienced drivers seeking to upgrade their license category.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Our mission is simple: make every student a safe, confident, and responsible driver on Indian roads.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl border border-border shadow-[0_20px_60px_-30px_rgb(10_22_40/0.4)]">
              <img src={instructor} alt="Driving instructor with student" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">What Sets Us Apart</span>
            <h2 className="mt-3 font-display text-4xl font-black text-navy md:text-5xl">The Balkrishna difference.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {points.map((p, i) => (
              <Reveal key={p} delay={i * 60}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-5">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-red" />
                  <p className="text-charcoal">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Our Values</span>
            <h2 className="mt-3 font-display text-4xl font-black text-navy md:text-5xl">What we stand for.</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="lift h-full rounded-2xl bg-navy p-8 text-white hover:lift-hover">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red"><v.icon className="h-6 w-6" /></div>
                  <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-8">
          <Reveal>
            <h3 className="font-display text-3xl font-black text-navy">Visit us in Bhavani Peth.</h3>
            <ul className="mt-6 space-y-4 text-charcoal">
              <li className="flex gap-3"><MapPin className="mt-1 h-5 w-5 text-red" /><span>55/36, Homkar Nagar, Bhavani Peth, Solapur, Maharashtra 413002</span></li>
              <li className="flex gap-3"><Phone className="mt-1 h-5 w-5 text-red" /><a href={`tel:${PHONE_TEL}`} className="hover:text-red">{PHONE}</a></li>
              <li className="flex gap-3"><Clock className="mt-1 h-5 w-5 text-red" /><span>Opens 7:00 AM daily</span></li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="aspect-video overflow-hidden rounded-2xl border border-border shadow-lg">
              <iframe
                title="Balkrishna Driving School location"
                src="https://www.google.com/maps?q=17.686823,75.9089396&hl=en&z=16&output=embed"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
