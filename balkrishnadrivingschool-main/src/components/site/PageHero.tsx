import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  breadcrumb,
  children,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-28 pb-16 text-white md:pt-36 md:pb-24">
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(60%_60%_at_70%_30%,rgb(232_35_10/0.6),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {breadcrumb && (
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> <span className="mx-2">/</span> {breadcrumb}
          </div>
        )}
        <h1 className="max-w-3xl font-display text-4xl font-black leading-[1.05] md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-base text-white/75 md:text-lg">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
