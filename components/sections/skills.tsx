import { skills } from "@/lib/data/project-data";



export function SkillsSection() {
  const entries = Object.entries(skills);

  return (
    <section id="skills" className="border-t border-border bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Skills
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            The stack I ship with
          </h2>
          <p className="mt-4 text-muted-foreground">
            Battle-tested in production across fintech dashboards, SaaS platforms and
            high-traffic marketing sites.
          </p>
        </div>

     <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
  {entries.map(([group, items], index) => (
    <div
      key={group}
      className={`rounded-xl border border-border bg-surface p-6 ${
        index === 0
          ? "lg:col-span-12"
          : "lg:col-span-6"
      }`}
    >
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {group}
      </h3>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
          >
            {skill}
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
