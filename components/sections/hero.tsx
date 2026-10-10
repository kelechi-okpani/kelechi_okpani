
import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Sparkles,
  Code2,
} from "lucide-react";

import { profile } from "@/data/project-data";

const trust = [
  "5+ years experience",
  "Remote / Hybrid",
  "Available immediately",
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:min-h-screen lg:flex lg:items-center"
    >
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* Ambient Glassmorphism Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">

          {/* =====================================================
              LEFT — INTRODUCTION
          ====================================================== */}
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-7 lg:items-start lg:text-left">

            {/* Availability Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>

              Open to Remote / Hybrid Roles
            </div>

            {/* Small Intro */}
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
              <Code2 className="h-4 w-4" />
              <span>Frontend / Backend / Full-stack Engineer</span>
            </div>

            {/* Main Heading */}
            <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-3xl lg:text-[2.5rem]">
              <span className="text-gradient">
                {profile.headline}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-sm sm:leading-8">
              {profile.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

              {/* Primary CTA */}
              <a
                href="#projects"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-xl hover:shadow-primary/25 sm:w-auto"
              >
                View Projects

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA */}
              <a
                href="/Kelechi_Okpani_Resume.pdf"
                download="Kelechi_Okpani_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/40 px-6 py-3.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-accent/60 sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>

              {/* Contact */}
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-muted-foreground lg:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Based in {profile.location}
              </span>

              {trust.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* =====================================================
              RIGHT — GLASSMORPHIC PROFILE CARD
          ====================================================== */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5">

            <div className="relative">

              {/* Decorative glow behind card */}
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/20 opacity-60 blur-3xl" />

              {/* Floating "Available" Card */}
              <div className="absolute -left-6 top-10 z-20 hidden rounded-2xl border border-border/50 bg-background/50 px-4 py-3 shadow-xl backdrop-blur-xl sm:block lg:-left-12">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <span className="h-2.5 w-2.5 rounded-full bg-success shadow-[0_0_10px_currentColor]" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Available
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      For remote / Hybrid work
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Glass Card */}
              <div className="group relative w-72 rounded-[2rem] border border-white/20 bg-white/10 p-2 shadow-2xl shadow-black/10 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:w-80 lg:w-[390px]">

                {/* Inner glass highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />

                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-muted">

                  <img
                    src="/headshot.jpeg"
                    alt="Kelechi Okpani - Software Engineer"
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                  {/* Bottom Glass Info */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-black/20 p-4 text-white backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">
                          Kelechi Okpani
                        </p>
                        <p className="mt-0.5 text-xs text-white/70">
                          Software Engineer
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                        <ArrowRight className="h-4 w-4 -rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Experience Card */}
              <div className="absolute -bottom-6 -right-5 z-20 rounded-2xl border border-border/50 bg-background/60 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-foreground">
                      5+ Years
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Building for the web
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
