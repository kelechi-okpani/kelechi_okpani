import { Code2, Globe2, Rocket } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "What I do",
    body:
      "I build production frontends with React, Next.js and TypeScript — focused on performance, accessibility and developer experience. I care about the whole system, from API contracts to the last pixel.",
  },
  {
    icon: Rocket,
    title: "Problems I solve",
    body:
      "Shipping complex dashboards, fintech onboarding flows and high-traffic marketing sites that load fast, convert well, and stay maintainable as teams scale.",
  },
  {
    icon: Globe2,
    title: "What I'm looking for",
    body:
      "A Senior / Mid Frontend Engineer role at a product-led company in Germany, Ireland or Finland with relocation sponsorship. Open to hybrid or remote-first teams.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            About
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
             Designing experiences. Engineering products.
          </h2>
          <p className="mt-4 text-muted-foreground">
            I'm Kelechi — a Design Engineer with 5+ years of experience transforming
            ideas into intuitive, production-ready digital experiences. I bridge the gap
            between design and engineering, crafting scalable interfaces, design systems,
            and high-performance products for fintech and SaaS companies.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-surface-elevated"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
