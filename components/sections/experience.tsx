import { experience } from "@/data/project-data";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  Sparkles,
} from "lucide-react";

export function ExperienceSection() {
  return (
      <section
          id="experience"
          className="relative overflow-hidden border-t border-border/50 bg-background py-24 sm:py-32"
      >
        {/* Ambient background */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-0 top-1/4 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

          <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                    "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur-md">
              <Briefcase className="h-3.5 w-3.5" />
              Experience
            </div>

            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Building products that create impact
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              Over 5 years of experience building and shipping production-grade
              software across fintech, SaaS, and enterprise environments.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-16">
            {/* Timeline line */}
            <div className="absolute bottom-0 left-[19px] top-0 hidden w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:block" />

            <div className="space-y-8">
              {experience.map((job, index) => (
                  <article
                      key={job.company + job.period}
                      className="group relative md:pl-16"
                  >
                    {/* Timeline node */}
                    <div className="absolute left-0 top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-background/80 text-primary shadow-lg shadow-primary/5 backdrop-blur-xl md:flex">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_currentColor]" />
                    </div>

                    {/* Experience card */}
                    <div
                        className="
                    relative overflow-hidden rounded-2xl
                    border border-white/10
                    bg-white/[0.035]
                    p-6
                    shadow-[0_8px_40px_rgba(0,0,0,0.08)]
                    backdrop-blur-xl
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:border-primary/25
                    hover:bg-white/[0.055]
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                    dark:border-white/[0.08]
                    sm:p-8
                  "
                    >
                      {/* Card glow */}
                      <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Top border highlight */}
                      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative">
                        {/* Header */}
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex gap-4">
                            {/* Mobile icon */}
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary backdrop-blur-md md:hidden">
                              <Briefcase className="h-5 w-5" />
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                                  {job.role}
                                </h3>

                                {index === 0 && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                                <Sparkles className="h-3 w-3" />
                                Latest
                              </span>
                                )}
                              </div>

                              <p className="mt-1 text-sm font-medium text-primary">
                                {job.company}
                              </p>
                            </div>
                          </div>

                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-background/30 px-3 py-1.5 backdrop-blur-md">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {job.period}
                        </span>

                            {job.location && (
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-background/30 px-3 py-1.5 backdrop-blur-md">
                            <MapPin className="h-3.5 w-3.5" />
                                  {job.location}
                          </span>
                            )}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="my-6 h-px bg-gradient-to-r from-border/80 via-border/40 to-transparent" />

                        {/* Achievements */}
                        <div>
                          <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            Key Contributions
                          </p>

                          <ul className="space-y-3">
                            {job.achievements.map((achievement) => (
                                <li
                                    key={achievement}
                                    className="flex gap-3 text-sm leading-7 text-foreground/80"
                                >
                                  <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80 shadow-[0_0_8px_currentColor]" />
                                  <span>{achievement}</span>
                                </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technology stack */}
                        <div className="mt-7">
                          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            Technologies
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {job.stack.map((skill) => (
                                <span
                                    key={skill}
                                    className="
                              rounded-lg
                              border border-white/10
                              bg-background/40
                              px-3 py-1.5
                              text-xs font-medium
                              text-muted-foreground
                              backdrop-blur-md
                              transition-all duration-300
                              hover:border-primary/30
                              hover:bg-primary/10
                              hover:text-primary
                            "
                                >
                            {skill}
                          </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
              ))}
            </div>
          </div>

          {/* Bottom summary */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-center backdrop-blur-xl sm:p-8">
            <p className="text-sm leading-7 text-muted-foreground">
              From frontend interfaces to backend services and cloud deployment,
              I enjoy taking ownership across the full software development
              lifecycle and working with teams to turn ideas into reliable
              products.
            </p>
          </div>
        </div>
      </section>
  );
}