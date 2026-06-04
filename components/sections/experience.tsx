import { experience } from "@/lib/data/project-data";
import { Briefcase } from "lucide-react";


export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Experience
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Impact across teams I've built with
          </h2>
        </div>

        <div className="mt-14 space-y-5">
          {experience.map((job) => (
            <div
              key={job.company + job.period}
              className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-surface-elevated sm:p-8"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{job.role}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                  {job.period}
                </span>
              </div>

              <ul className="mt-5 space-y-2">
                {job.achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-sm text-foreground/90">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {a}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
