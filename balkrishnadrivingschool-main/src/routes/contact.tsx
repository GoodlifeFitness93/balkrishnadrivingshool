import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Clock, MessageCircle, Instagram } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { PHONE, PHONE_TEL, waLink } from "@/lib/wa";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Balkrishna Driving School — Solapur" },
      { name: "description", content: "Get in touch with Balkrishna Driving School in Bhavani Peth, Solapur. Call, WhatsApp, or send an enquiry — we open at 7 AM daily." },
      { property: "og:title", content: "Contact Us — Balkrishna Driving School" },
      { property: "og:description", content: "Visit, call, or WhatsApp us in Solapur." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({
    name: "", phone: "", vehicle: "Four-Wheeler", service: "Driving Course", batch: "Morning", message: "",
  });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const text = `Hi, I'd like to enquire at Balkrishna Driving School.

• Name: ${form.name}
• Phone: ${form.phone}
• Vehicle Type: ${form.vehicle}
• Service Needed: ${form.service}
• Preferred Batch: ${form.batch}
${form.message ? `• Message: ${form.message}` : ""}

Please share details.`;
    window.open(waLink(text), "_blank");
  }

  return (
    <>
      <PageHero title="Get In Touch" subtitle="We're here to answer your questions and help you get started." breadcrumb="Contact Us" />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8">
          {/* LEFT */}
          <Reveal>
            <h2 className="font-display text-3xl font-black text-navy">Contact details</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red/10 text-red"><MapPin className="h-5 w-5" /></span>
                <div><div className="font-semibold text-navy">Address</div><div className="text-muted-foreground">55/36, Homkar Nagar, Bhavani Peth, Solapur, Maharashtra 413002</div></div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red/10 text-red"><Phone className="h-5 w-5" /></span>
                <div><div className="font-semibold text-navy">Phone</div><a href={`tel:${PHONE_TEL}`} className="text-muted-foreground hover:text-red">{PHONE}</a></div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red/10 text-red"><Clock className="h-5 w-5" /></span>
                <div><div className="font-semibold text-navy">Hours</div><div className="text-muted-foreground">Opens 7:00 AM daily</div></div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]"><MessageCircle className="h-5 w-5" /></span>
                <div><div className="font-semibold text-navy">WhatsApp</div><a href={waLink("Hi, I'd like to enquire at Balkrishna Driving School.")} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-red">Chat with us directly</a></div>
              </li>
            </ul>

            <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border shadow">
              <iframe
                title="Balkrishna Driving School Location"
                src="https://www.google.com/maps?q=17.686823,75.9089396&hl=en&z=16&output=embed"
                className="h-full w-full" loading="lazy"
              />
            </div>
          </Reveal>

          {/* RIGHT */}
          <Reveal delay={120}>
            <form onSubmit={submit} className="rounded-3xl border border-border bg-cream p-8 shadow-[0_20px_60px_-30px_rgb(10_22_40/0.3)] md:p-10">
              <h2 className="font-display text-3xl font-black text-navy">Send an enquiry</h2>
              <p className="mt-2 text-sm text-muted-foreground">We'll continue the conversation on WhatsApp.</p>

              <div className="mt-6 grid gap-4">
                <Field label="Full Name">
                  <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="Your name" />
                </Field>
                <Field label="Phone Number">
                  <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} placeholder="10-digit mobile" />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Vehicle Type">
                    <select value={form.vehicle} onChange={(e) => update("vehicle", e.target.value)} className={inputCls}>
                      <option>Two-Wheeler</option><option>Four-Wheeler</option>
                    </select>
                  </Field>
                  <Field label="Service Needed">
                    <select value={form.service} onChange={(e) => update("service", e.target.value)} className={inputCls}>
                      <option>Driving Course</option><option>License Assistance</option><option>Both</option>
                    </select>
                  </Field>
                </div>
                <Field label="Preferred Batch">
                  <select value={form.batch} onChange={(e) => update("batch", e.target.value)} className={inputCls}>
                    <option>Morning</option><option>Evening</option>
                  </select>
                </Field>
                <Field label="Message (optional)">
                  <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={3} className={inputCls} placeholder="Anything we should know" />
                </Field>
              </div>

              <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-4 text-sm font-bold text-white hover:-translate-y-0.5 transition-transform">
                <MessageCircle className="h-4 w-4" /> Send via WhatsApp
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <Reveal>
            <Instagram className="mx-auto h-8 w-8 text-red" />
            <h3 className="mt-3 font-display text-2xl font-black text-navy">Follow us on Instagram</h3>
            <p className="mt-2 text-muted-foreground">Tips, student stories, and behind-the-scenes from Solapur's roads.</p>
            <a href="#" className="mt-5 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-6 py-3 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors">
              @balkrishnadrivingschool
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal outline-none ring-red/30 transition focus:border-red focus:ring-2";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-navy/70">{label}</span>
      {children}
    </label>
  );
}
