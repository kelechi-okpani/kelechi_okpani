import { projects } from "@/lib/data/project-data";
import {
  ArrowUpRight,
  ExternalLink,
  // Github,
  Sparkles,
} from "lucide-react";

export function ProjectsSection() {
  return (
      <section
          id="projects"
          className="relative overflow-hidden border-t border-border/50 bg-background py-24 sm:py-32"
      >
        {/* Ambient background */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

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
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Selected Work
            </div>

            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Real products. Real impact.
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              A selection of production systems I've designed and shipped across
              fintech, SaaS, healthtech, e-commerce, and content platforms.
            </p>
          </div>

          {/* Projects */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
                <article
                    key={project.name}
                    className="
                group relative flex flex-col overflow-hidden rounded-3xl
                border border-white/10
                bg-white/[0.035]
                p-6
                shadow-[0_8px_40px_rgba(0,0,0,0.08)]
                backdrop-blur-xl
                transition-all duration-500
                hover:-translate-y-1
                hover:border-primary/25
                hover:bg-white/[0.055]
                hover:shadow-[0_24px_70px_rgba(0,0,0,0.14)]
                dark:border-white/[0.08]
                sm:p-8
              "
                >
                  {/* Glow */}
                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top highlight */}
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col">
                    {/* Project header */}
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-start gap-4">
                        {/* Number */}
                        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-background/40 font-mono text-xs text-muted-foreground backdrop-blur-md sm:flex">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div>
                      <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                        {project.category}
                      </span>

                          <h3 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                            {project.name}
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {project.role}
                          </p>
                        </div>
                      </div>

                      {/* Quick links */}
                      <div className="flex shrink-0 gap-2">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`GitHub repository for ${project.name}`}
                                className="
                          inline-flex h-9 w-9 items-center justify-center
                          rounded-xl
                          border border-white/10
                          bg-background/40
                          text-muted-foreground
                          backdrop-blur-md
                          transition-all duration-300
                          hover:border-primary/30
                          hover:bg-primary/10
                          hover:text-primary
                        "
                            >
                              {/*<Github className="h-4 w-4" />*/}
                            </a>
                        )}

                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Visit ${project.name}`}
                                className="
                          inline-flex h-9 w-9 items-center justify-center
                          rounded-xl
                          border border-white/10
                          bg-background/40
                          text-muted-foreground
                          backdrop-blur-md
                          transition-all duration-300
                          hover:border-primary/30
                          hover:bg-primary/10
                          hover:text-primary
                        "
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-6 h-px bg-gradient-to-r from-border/80 via-border/30 to-transparent" />

                    {/* Problem */}
                    <div>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {project.problem}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className="mt-6">
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Impact
                      </p>

                      <ul className="space-y-3">
                        {project.impact.map((item) => (
                            <li
                                key={item}
                                className="flex gap-3 text-sm leading-6 text-foreground/85"
                            >
                              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                              <span>{item}</span>
                            </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom section */}
                    <div className="mt-auto pt-7">
                      <div className="border-t border-border/60 pt-5">
                        <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                          Built with
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((technology) => (
                              <span
                                  key={technology}
                                  className="
                            rounded-lg
                            border border-white/10
                            bg-background/40
                            px-2.5 py-1.5
                            text-[11px] font-medium
                            text-muted-foreground
                            backdrop-blur-md
                            transition-all duration-300
                            hover:border-primary/30
                            hover:bg-primary/10
                            hover:text-primary
                          "
                              >
                          {technology}
                        </span>
                          ))}
                        </div>

                        {/* Main CTA */}
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="
                          mt-6 inline-flex items-center gap-2
                          text-sm font-semibold
                          text-primary
                          transition-all duration-300
                          hover:gap-3
                        "
                            >
                              View live project
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
            ))}
          </div>

          {/* Bottom statement */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              More projects and technical work are available on request.
            </p>
          </div>
        </div>
      </section>
  );
}