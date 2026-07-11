import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, ArrowRight, GraduationCap, Car, ClipboardCheck, MapPin, Star, MessageCircle, ShieldCheck, Check } from "lucide-react";
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
import { supabase } from "@/lib/supabase";

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
  interface Offer {
    id: string;
    title: string;
    description: string;
    discount_text: string;
    banner_image_url?: string;
    urgency_text?: string;
    cta_text?: string;
    start_at: string;
    end_at: string;
    is_enabled: boolean;
  }

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    async function loadActiveOffer() {
      try {
        const nowIso = new Date().toISOString();
        const { data, error } = await supabase
          .from("offers")
          .select("*")
          .eq("is_enabled", true)
          .lte("start_at", nowIso)
          .gte("end_at", nowIso)
          .order("created_at", { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          setActiveOffer(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch offers banner:", err);
      }
    }
    loadActiveOffer();
  }, []);

  useEffect(() => {
    if (!activeOffer) return;

    const endTime = new Date(activeOffer.end_at).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(timer);
        setActiveOffer(null);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeOffer]);

  // Try to parse dynamic campaign JSON metadata from description
  let offerDetails = {
    course_name: "Premium Driving Course Package",
    original_fee: "7500",
    discount_val: "1500",
    savings: "1500",
    benefits: [
      "20 Days Comprehensive Practical Sessions",
      "Dedicated Personal Trainer & Dual-Control Car",
      "Full RTO Learners Permit & License Preparatory Support",
      "Wet Weather & Defensive Driving Session"
    ],
    marketing_text: activeOffer ? activeOffer.description : "",
    why_us_badge: "RTO Approved Training Academy"
  };

  if (activeOffer) {
    try {
      if (activeOffer.description && activeOffer.description.trim().startsWith("{")) {
        const parsed = JSON.parse(activeOffer.description);
        offerDetails = { ...offerDetails, ...parsed };
      }
    } catch (e) {
      console.warn("Could not parse campaign JSON, using fallback rendering:", e);
    }
  }

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
            {/* Countdown timer above H1 when offer is active */}
            {activeOffer && (
              <div className="mb-6 inline-flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">LIMITED TIME OFFER</span>
                <div className="flex items-center gap-2 text-xl font-bold">
                  <div className="flex flex-col items-center bg-black/40 rounded-lg px-2.5 py-1 min-w-[48px]"><span className="font-mono text-lg">{String(timeLeft.days).padStart(2, "0")}</span><span className="text-[8px] uppercase tracking-wider text-white/60">Days</span></div>
                  <span className="text-white/40 font-mono">:</span>
                  <div className="flex flex-col items-center bg-black/40 rounded-lg px-2.5 py-1 min-w-[48px]"><span className="font-mono text-lg">{String(timeLeft.hours).padStart(2, "0")}</span><span className="text-[8px] uppercase tracking-wider text-white/60">Hours</span></div>
                  <span className="text-white/40 font-mono">:</span>
                  <div className="flex flex-col items-center bg-black/40 rounded-lg px-2.5 py-1 min-w-[48px]"><span className="font-mono text-lg">{String(timeLeft.minutes).padStart(2, "0")}</span><span className="text-[8px] uppercase tracking-wider text-white/60">Mins</span></div>
                  <span className="text-white/40 font-mono">:</span>
                  <div className="flex flex-col items-center bg-black/40 rounded-lg px-2.5 py-1 min-w-[48px]"><span className="font-mono text-lg">{String(timeLeft.seconds).padStart(2, "0")}</span><span className="text-[8px] uppercase tracking-wider text-white/60">Secs</span></div>
                </div>
              </div>
            )}

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
              <Link to={activeOffer ? "/contact" : "/contact"} search={activeOffer ? { offer: activeOffer.id } : undefined}
                 className="inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-sm font-semibold shadow-[0_18px_36px_-12px_rgb(232_35_10/0.7)] transition-transform hover:-translate-y-0.5 text-white">
                Book a Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
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

      {/* DYNAMIC ACTIVE OFFER BANNER SECTION */}
      {activeOffer && (() => {
        const originalFeeNum = parseInt(offerDetails.original_fee.replace(/,/g, "")) || 7500;
        const discountValNum = parseInt(offerDetails.discount_val.replace(/,/g, "")) || 1500;
        const finalFee = originalFeeNum - discountValNum;

        return (
          <section className="bg-[#090E1A] py-24 border-y border-white/10 text-white relative overflow-hidden">
            {/* Ambient gold glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.05),transparent_50%)] pointer-events-none" />
            
            <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
              <div className="grid gap-12 lg:grid-cols-12 items-center">
                
                {/* Left Column: Compelling copy and benefits checklist */}
                <div className="space-y-8 lg:col-span-7">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs font-black text-amber-400 uppercase tracking-widest">
                      ⭐ {offerDetails.why_us_badge || "Premium Promotion"}
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                      {activeOffer.title}
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-2xl pt-2">
                      {offerDetails.marketing_text || activeOffer.description}
                    </p>
                  </div>

                  {/* Checklist of features/benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                    {offerDetails.benefits && offerDetails.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 text-slate-300">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm font-semibold leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quality indicators / trust badges */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-slate-400 font-semibold">
                    <span className="flex items-center gap-1.5">✓ Certified RTO Instructors</span>
                    <span className="flex items-center gap-1.5">✓ Flexible Driving Slots</span>
                    <span className="flex items-center gap-1.5">✓ Dual-Control Safety Cars</span>
                  </div>
                </div>

                {/* Right Column: Stripe-like pricing & booking card */}
                <div className="lg:col-span-5">
                  <div className="bg-white text-navy rounded-3xl p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-100 relative overflow-hidden">
                    {/* Glowing highlight stripe at top */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-red to-amber-500" />
                    
                    {/* Header: Course Category */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red">Course Assigned</span>
                        <h4 className="text-xl font-black text-navy mt-0.5 tracking-tight leading-tight">
                          {offerDetails.course_name}
                        </h4>
                      </div>
                      <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-black text-amber-800 shrink-0">
                        {activeOffer.discount_text}
                      </span>
                    </div>

                    {/* Price Breakdown */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-baseline justify-between">
                      <div className="space-y-1">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Special Enrollment Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-black text-navy tracking-tight font-display">
                            ₹{finalFee.toLocaleString("en-IN")}
                          </span>
                          <span className="text-slate-400 line-through text-base font-bold">
                            ₹{originalFeeNum.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-[#E8F8F0] border border-[#A7F3D0] text-[#065F46] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                          Save ₹{discountValNum.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Expiry Countdown Timer */}
                    <div className="mt-8 bg-slate-50 border border-slate-100 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-red animate-ping" />
                          Time Remaining
                        </span>
                        <span className="text-[10px] font-extrabold text-red uppercase tracking-widest">
                          {activeOffer.urgency_text || "Limited Slots"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-center font-mono">
                        <div className="bg-white rounded-xl border border-slate-100 py-2.5">
                          <span className="text-xl font-black text-navy block leading-none">{String(timeLeft.days).padStart(2, "0")}</span>
                          <span className="text-[8px] text-slate-400 font-extrabold uppercase mt-1 block">Days</span>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-100 py-2.5">
                          <span className="text-xl font-black text-navy block leading-none">{String(timeLeft.hours).padStart(2, "0")}</span>
                          <span className="text-[8px] text-slate-400 font-extrabold uppercase mt-1 block">Hours</span>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-100 py-2.5">
                          <span className="text-xl font-black text-navy block leading-none">{String(timeLeft.minutes).padStart(2, "0")}</span>
                          <span className="text-[8px] text-slate-400 font-extrabold uppercase mt-1 block">Mins</span>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-100 py-2.5">
                          <span className="text-xl font-black text-navy block leading-none">{String(timeLeft.seconds).padStart(2, "0")}</span>
                          <span className="text-[8px] text-slate-400 font-extrabold uppercase mt-1 block">Secs</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Call to Action */}
                    <div className="mt-8">
                      <Link
                        to="/contact"
                        search={{ offer: activeOffer.id }}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red hover:bg-red/95 text-white font-extrabold py-4 px-6 shadow-xl shadow-red/20 transition-all duration-200 text-sm hover:-translate-y-0.5"
                      >
                        {activeOffer.cta_text || "Secure My Spot Now"} <ArrowRight className="h-4 w-4" />
                      </Link>
                      <span className="text-[10px] text-center text-slate-400 font-semibold block mt-3">
                        ⚡ Quick Booking: Instantly redirects to our WhatsApp enrollment line.
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })()}

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
                    <Link to="/contact" search={{ course: c.title }}
                       className="mt-5 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 transition-transform">
                      Enquire Now <ArrowRight className="h-4 w-4" />
                    </Link>
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
              <Link to="/contact" search={{ course: "Trial Lesson" }}
                 className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-red shadow-xl hover:-translate-y-0.5 transition-transform">
                <MessageCircle className="h-4 w-4" /> Book a Trial Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
