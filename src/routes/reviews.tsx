import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What Our Students Say | Balkrishna Driving School" },
      { name: "description", content: "Read reviews from Balkrishna Driving School students in Solapur. ⭐ 4.7/5 on Google. Real experiences from real learners." },
      { property: "og:title", content: "Student Reviews — Balkrishna Driving School" },
      { property: "og:description", content: "⭐ 4.7/5 — Loved by Solapur drivers." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

const reviews = [
  { stars: 5, t: "Excellent training, very patient instructors. Highly recommend for anyone in Solapur.", n: "Student 1" },
  { stars: 5, t: "Got my car license with their help. The license services saved me so much time.", n: "Student 2" },
  { stars: 5, t: "Best driving school near Bhavani Peth. Proper training sessions and good guidance.", n: "Student 3" },
  { stars: 4, t: "Very cooperative staff. They explained everything clearly about RTO procedures.", n: "Student 4" },
  { stars: 5, t: "Learned two-wheeler and four-wheeler both here. Value for money.", n: "Student 5" },
  { stars: 5, t: "The mock RTO test practice was incredibly helpful. Cleared my DL test on first try.", n: "Student 6" },
];

const breakdown = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 16 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

function ReviewsPage() {
  return (
    <>
      <PageHero title="What Our Students Say" subtitle="Real reviews from drivers we've trained across Solapur." breadcrumb="Reviews">
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy shadow">
          <Star className="h-4 w-4 fill-red text-red" /> 4.7 / 5 — Google Reviews
        </div>
      </PageHero>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <div className="grid gap-8 rounded-3xl bg-white p-8 shadow md:grid-cols-[auto_1fr] md:items-center md:gap-12 md:p-12">
              <div className="text-center">
                <div className="font-display text-7xl font-black text-navy">4.7</div>
                <div className="mt-2 flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-5 w-5 fill-red text-red" />)}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Based on Google Reviews</div>
              </div>
              <div className="space-y-2.5">
                {breakdown.map((b) => (
                  <div key={b.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-6 font-semibold text-navy">{b.stars}★</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream">
                      <div className="h-full bg-red transition-all duration-1000" style={{ width: `${b.pct}%` }} />
                    </div>
                    <span className="w-10 text-right text-muted-foreground">{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <figure className="lift h-full rounded-2xl bg-white p-7 shadow-[0_8px_28px_-18px_rgb(10_22_40/0.18)] hover:lift-hover">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.stars }).map((_, k) => <Star key={k} className="h-4 w-4 fill-red text-red" />)}
                  </div>
                  <blockquote className="mt-4 text-[15px] leading-relaxed text-charcoal">"{r.t}"</blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-navy">— {r.n}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-sm font-bold text-white hover:-translate-y-0.5 transition-transform">
              Become Our Next Success Story — Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
