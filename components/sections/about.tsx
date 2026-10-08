
import {
  Code2,
  Globe2,
  Rocket,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const pillars = [
    { icon: Code2, title: "What I build", body: "I build production-grade web applications across the full stack using JavaScript, TypeScript, React, Next.js, Vue.js, Node.js, and modern databases. I take ownership from architecture and API integration to testing, deployment, and continuous improvement.", },
  { icon: Rocket, title: "What I solve", body: "I turn complex business requirements into scalable, reliable products while improving performance and user experience. My work includes fintech applications, SaaS platforms, dashboards, secure APIs, data workflows, and high-performance interfaces.", },
  { icon: Globe2, title: "How I work", body: "I collaborate closely with product managers, designers, and engineers to turn ideas into measurable outcomes. I contribute to architecture decisions, code reviews, mentoring, Agile delivery, and building engineering practices that help teams ship with confidence.", }, ];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-border/40 py-24 sm:py-32"
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            About Me
          </div>

          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Designing experiences.
            <span className="block text-gradient">
              Engineering products.
            </span>
          </h2>


          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I'm Kelechi — a Software Engineer with 5+ years of experience
            designing, building, and scaling production-grade web applications
            across fintech, SaaS, and enterprise environments.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground/80 sm:text-base">
            I specialize in JavaScript and TypeScript development across React,
            Next.js, Vue.js, Node.js, and modern API and database technologies.
            I enjoy taking ownership from system architecture and frontend
            development to API integration, performance optimization, testing,
            and cloud deployment — turning business requirements into reliable
            products that are built to scale.
          </p>


        </div>

        {/* =====================================================
            GLASS CARDS
        ====================================================== */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">

          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/[0.07] hover:shadow-2xl"
              >
                {/* Card Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Glass Highlight */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />

                <div className="relative">

                  {/* Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-medium text-muted-foreground/40">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="mt-7 font-display text-lg font-semibold">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {pillar.body}
                  </p>

                  {/* Bottom Accent */}
                  <div className="mt-6 flex items-center gap-2 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    <span>Learn more</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM GLASS STATS
        ====================================================== */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
          <div className="grid divide-y divide-border/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

            <div className="p-6 text-center sm:p-7">
              <p className="font-display text-2xl font-semibold text-foreground">
                5+
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Years of Experience
              </p>
            </div>

            <div className="p-6 text-center sm:p-7">
              <p className="font-display text-2xl font-semibold text-foreground">
                Full-Stack
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Frontend + Backend
              </p>
            </div>

            <div className="p-6 text-center sm:p-7">
              <p className="font-display text-2xl font-semibold text-foreground">
                Remote / Hybrid
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Distributed Team Ready
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
