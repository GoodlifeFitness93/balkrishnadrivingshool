import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ArrowRight, GraduationCap, Car, ClipboardCheck, MapPin, Star, MessageCircle, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero-road.jpg";
import imgTwoWheeler from "@/assets/course-two-wheeler.jpg";
import imgFourWheeler from "@/assets/course-four-wheeler.jpg";
import imgAuto from "@/assets/course-auto.jpg";
import imgTruck from "@/assets/course-truck.jpg";
import imgTempo from "@/assets/course-tempo.jpg";
import imgRefresher from "@/assets/course-refresher.jpg";
import imgLicense from "@/assets/course-license.jpg";
import license from "@/assets/license.jpg";
import { PHONE, PHONE_TEL, waLink, defaultWAMessage } from "@/lib/wa";
import { Reveal, Counter } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Balkrishna Driving School — Learn to Drive in Solapur" },
      { name: "description", content: "Solapur's most trusted driving school. Two-wheeler, four-wheeler & refresher training + complete RTO license assistance. ⭐ 4.7 rated. Book a free trial." },
      { property: "og:title", content: "Balkrishna Driving School — Solapur" },
      { property: "og:description", content: "Professional training + RTO license assistance. Bhavani Peth, Solapur." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const features = [
  { icon: GraduationCap, title: "Expert Certified Instructors", text: "Patient, professional, trained to guide beginners to confident drivers." },
  { icon: Car, title: "All Vehicle Types", text: "Training for Two-Wheelers, Cars (Hatchback/Sedan/SUV), and Light Motor Vehicles." },
  { icon: ClipboardCheck, title: "End-to-End License Help", text: "Learner's permit, RTO paperwork, test preparation, and final license — all under one roof." },
  { icon: MapPin, title: "Convenient Solapur Location", text: "Easily accessible from Bhavani Peth and surrounding areas." },
];

const courses = [
  { emoji: "🏍️", title: "Two-Wheeler Training", subtitle: "Scooter & Motorcycle", img: imgTwoWheeler, desc: "Learn to ride both scooters and motorcycles from scratch. Covers vehicle control, balancing, traffic navigation, road safety rules, and ghat/incline riding techniques for complete confidence on any terrain." },
  { emoji: "🚗", title: "Four-Wheeler Car Training", subtitle: "Hatchback, Sedan & SUV", img: imgFourWheeler, desc: "Master car driving with structured lessons covering clutch control, gear shifting, city traffic, parking, lane discipline, and highway driving. Trained on real Solapur roads." },
  { emoji: "🛺", title: "Auto Rickshaw Training", subtitle: "Three-Wheeler License", img: imgAuto, desc: "Professional training for three-wheeler auto rickshaws. Learn manoeuvring in tight city lanes, passenger safety, and everything needed to clear your commercial three-wheeler RTO test." },
  { emoji: "🚛", title: "Heavy Motor Vehicle Training", subtitle: "Truck & Commercial Vehicles", img: imgTruck, desc: "Specialized training for heavy trucks and commercial transport vehicles. Covers wide-vehicle handling, loading zone navigation, highway driving, and Heavy Motor Vehicle (HMV) license preparation." },
  { emoji: "🚐", title: "Tempo & Light Commercial Vehicle", subtitle: "LMV Transport Category", img: imgTempo, desc: "Training for tempos, mini-trucks, and light commercial vehicles. Ideal for those seeking a transport license for small goods delivery or passenger vehicles under the LMV-Transport category." },
  { emoji: "🔁", title: "Refresher & Advanced Course", subtitle: "For Licensed Drivers", img: imgRefresher, desc: "Already have a license but lacking confidence or practicing after a long gap? Our refresher sessions correct bad habits, build road confidence, and prepare you for ghat roads and highway driving." },
  { emoji: "📋", title: "RTO License Assistance", subtitle: "Learner's Permit to Permanent DL", img: imgLicense, desc: "We handle all RTO-related formalities — learner's license, permanent driving license, license renewal, DL upgrades, and documentation for all vehicle categories. No middlemen. No confusion." },
];

const reviews = [
  { stars: 5, text: "Best driving school in Solapur. The instructors are calm and very patient. Got my license on the first attempt!", name: "Solapur resident" },
  { stars: 5, text: "Not only did I learn driving here, they handled all my RTO paperwork too. Highly recommended.", name: "Satisfied student" },
  { stars: 4, text: "Professional staff, proper training schedule, and flexible timings. Great experience overall.", name: "Local learner" },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-navy/70" />
        </div>
        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-32 pb-20 text-white md:px-8 md:pt-40">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-red" /> Solapur • Since Day One
            </span>
            <h1 className="mt-6 font-display text-5xl font-black leading-[0.98] tracking-tight md:text-7xl">
              Learn to Drive. <br />
              <span className="text-red">Earn Your Freedom.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80 md:text-xl">
              Solapur's Most Trusted Driving School — Professional Training + RTO License Assistance.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={waLink(defaultWAMessage("a free trial lesson"))} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-sm font-semibold shadow-[0_18px_36px_-12px_rgb(232_35_10/0.7)] transition-transform hover:-translate-y-0.5">
                Book a Free Trial <ArrowRight className="h-4 w-4" />
              </a>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold backdrop-blur hover:bg-white/10">
                <Phone className="h-4 w-4" /> Call Now: {PHONE}
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 text-xs text-white/80 md:grid-cols-4 md:text-sm">
              {[
                ["⭐", "4.7 Google Rating"],
                ["🚗", "1000+ Drivers Trained"],
                ["📋", "RTO License Assistance"],
                ["📍", "Bhavani Peth, Solapur"],
              ].map(([e, t]) => (
                <div key={t} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur">
                  <span>{e}</span><span className="font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Why Choose Us</span>
            <h2 className="mt-3 font-display text-4xl font-black text-navy md:text-5xl">A driving school built around your confidence.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="lift h-full rounded-2xl border border-border bg-white p-7 shadow-[0_8px_28px_-18px_rgb(10_22_40/0.18)] hover:lift-hover">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-red">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-navy py-14 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-4 md:px-8">
          {[
            { n: 1000, s: "+", l: "Students Trained" },
            { n: 47, s: "/10", l: "Google Rating" },
            { n: 15, s: "+", l: "Years Experience" },
            { n: 100, s: "%", l: "RTO Compliant" },
          ].map((x) => (
            <Reveal key={x.l}>
              <div className="text-4xl font-black md:text-5xl">
                <Counter to={x.n} suffix={x.s} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/65">{x.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Our Courses</span>
            <h2 className="mt-3 font-display text-4xl font-black text-navy md:text-5xl">Everything You Need — Under One Roof</h2>
            <p className="mt-4 text-muted-foreground">From two-wheelers to heavy trucks, and from your first lesson to your final license — Balkrishna Driving School covers it all.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <article className="lift group h-full overflow-hidden rounded-2xl border border-border bg-white shadow-[0_8px_28px_-18px_rgb(10_22_40/0.18)] hover:lift-hover">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={c.img} alt={c.title} loading="lazy" width={1024} height={576} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red text-lg text-white shadow-sm">
                      {c.emoji}
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-navy">{c.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-red">{c.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                    <a href={waLink(`Hi, I'm interested in ${c.title} at Balkrishna Driving School. Please share more details.`)} target="_blank" rel="noreferrer"
                       className="mt-5 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 transition-transform">
                      Enquire on WhatsApp <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LICENSE BANNER */}
      <section className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(50%_50%_at_85%_30%,rgb(232_35_10/0.45),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">License Services</span>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight md:text-5xl">
              We Don't Just Teach You to Drive — <span className="text-red">We Help You Get Licensed.</span>
            </h2>
            <p className="mt-5 max-w-xl text-white/75">
              Balkrishna Driving School provides complete RTO license assistance for learner's permits and permanent driving licenses. Skip the confusion — we handle the paperwork, guide you through the process, and prepare you for the RTO test.
            </p>
            <Link to="/license" className="mt-7 inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-sm font-semibold shadow-[0_18px_36px_-12px_rgb(232_35_10/0.6)] hover:-translate-y-0.5 transition-transform">
              Explore License Services <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img src={license} alt="RTO Driving License" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/95 p-4 text-navy backdrop-blur">
                <ShieldCheck className="h-8 w-8 text-red" />
                <div className="text-sm">
                  <div className="font-bold">100% Compliant</div>
                  <div className="text-xs text-muted-foreground">Maharashtra Motor Vehicle Rules</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Testimonials</span>
              <h2 className="mt-3 font-display text-4xl font-black text-navy md:text-5xl">Loved by drivers across Solapur.</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow">
              <Star className="h-4 w-4 fill-red text-red" /> 4.7 / 5 — Google Reviews
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <figure className="lift h-full rounded-2xl bg-white p-7 shadow-[0_8px_28px_-18px_rgb(10_22_40/0.18)] hover:lift-hover">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.stars }).map((_, k) => <Star key={k} className="h-4 w-4 fill-red text-red" />)}
                  </div>
                  <blockquote className="mt-4 text-[15px] leading-relaxed text-charcoal">"{r.text}"</blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-navy">— {r.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING STRIP */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-red p-8 text-white md:p-12">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/10" />
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-3xl font-black md:text-4xl">Ready to Start?</h3>
                <p className="mt-2 text-white/90">Book your trial lesson today — we'll get you behind the wheel.</p>
              </div>
              <a href={waLink(defaultWAMessage("a trial lesson"))} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-red shadow-xl hover:-translate-y-0.5 transition-transform">
                <MessageCircle className="h-4 w-4" /> Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
