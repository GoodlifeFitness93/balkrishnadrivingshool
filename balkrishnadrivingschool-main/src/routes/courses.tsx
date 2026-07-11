import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, TrafficCone, ShieldAlert, ParkingSquare, Moon, Route as RouteIcon, AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { waLink } from "@/lib/wa";
import imgTwoWheeler from "@/assets/course-two-wheeler.jpg";
import imgFourWheeler from "@/assets/course-four-wheeler.jpg";
import imgAuto from "@/assets/course-auto.jpg";
import imgTruck from "@/assets/course-truck.jpg";
import imgTempo from "@/assets/course-tempo.jpg";
import imgRefresher from "@/assets/course-refresher.jpg";
import imgLicense from "@/assets/course-license.jpg";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Driving Courses — Two-Wheeler to Heavy Vehicle | Balkrishna" },
      { name: "description", content: "All driving courses in Solapur — Two-wheeler, Car, Auto Rickshaw, Truck, Tempo, Refresher & RTO License Assistance. Enquire now." },
      { property: "og:title", content: "Our Driving Courses" },
      { property: "og:description", content: "7 specialized driving courses + RTO license assistance." },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

const courses = [
  { emoji: "🏍️", title: "Two-Wheeler Training", subtitle: "Scooter & Motorcycle", img: imgTwoWheeler, desc: "Learn to ride both scooters and motorcycles from scratch. Covers vehicle control, balancing, traffic navigation, road safety rules, and ghat/incline riding techniques for complete confidence on any terrain." },
  { emoji: "🚗", title: "Four-Wheeler Car Training", subtitle: "Hatchback, Sedan & SUV", img: imgFourWheeler, desc: "Master car driving with structured lessons covering clutch control, gear shifting, city traffic, parking, lane discipline, and highway driving. Trained on real Solapur roads." },
  { emoji: "🛺", title: "Auto Rickshaw Training", subtitle: "Three-Wheeler License", img: imgAuto, desc: "Professional training for three-wheeler auto rickshaws. Learn manoeuvring in tight city lanes, passenger safety, and everything needed to clear your commercial three-wheeler RTO test." },
  { emoji: "🚛", title: "Heavy Motor Vehicle Training", subtitle: "Truck & Commercial Vehicles", img: imgTruck, desc: "Specialized training for heavy trucks and commercial transport vehicles. Covers wide-vehicle handling, loading zone navigation, highway driving, and Heavy Motor Vehicle (HMV) license preparation." },
  { emoji: "🚐", title: "Tempo & Light Commercial Vehicle", subtitle: "LMV Transport Category", img: imgTempo, desc: "Training for tempos, mini-trucks, and light commercial vehicles. Ideal for those seeking a transport license for small goods delivery or passenger vehicles under the LMV-Transport category." },
  { emoji: "🔁", title: "Refresher & Advanced Course", subtitle: "For Licensed Drivers", img: imgRefresher, desc: "Already have a license but lacking confidence or practicing after a long gap? Our refresher sessions correct bad habits, build road confidence, and prepare you for ghat roads and highway driving." },
  { emoji: "📋", title: "RTO License Assistance", subtitle: "Learner's Permit to Permanent DL", img: imgLicense, desc: "We handle all RTO-related formalities — learner's license, permanent driving license, license renewal, DL upgrades, and documentation for all vehicle categories. No middlemen. No confusion." },
];

const highlights = [
  { icon: TrafficCone, label: "Traffic Signs & Rules" },
  { icon: ShieldAlert, label: "Defensive Driving" },
  { icon: ParkingSquare, label: "Parking Techniques" },
  { icon: Moon, label: "Night Driving Basics" },
  { icon: RouteIcon, label: "Highway Confidence" },
  { icon: AlertTriangle, label: "Emergency Braking" },
];

function CoursesPage() {
  return (
    <>
      <PageHero title="Our Driving Courses" subtitle="Everything You Need — Under One Roof" breadcrumb="Courses" />

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

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red">Curriculum Highlights</span>
            <h2 className="mt-3 font-display text-4xl font-black text-navy md:text-5xl">Everything we cover.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 60}>
                <div className="lift flex items-center gap-4 rounded-xl border border-border bg-white p-5 hover:lift-hover">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-red/10 text-red"><h.icon className="h-5 w-5" /></div>
                  <span className="font-semibold text-navy">{h.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
