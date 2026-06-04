import { projects } from "@/lib/data/project-data";
import { ArrowUpRight } from "lucide-react";



export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Selected Work
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Real products. Real impact.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A selection of production systems I've shipped — across fintech, SaaS,
            healthtech, e-commerce and content platforms.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/40 hover:bg-surface-elevated sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                    {p.category}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.role}</p>
                </div>
                <div className="flex gap-1">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${p.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`GitHub for ${p.name}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {/* <Github className="h-4 w-4" /> */}
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.problem}
              </p>

              <ul className="mt-5 space-y-2">
                {p.impact.map((i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground/90">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {i}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-4">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
              >
                View live site
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
