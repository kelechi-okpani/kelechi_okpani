import { CheckCircle2, Plane } from "lucide-react";

const points = [

   {
    title: "Visa-Sponsorship Ready",
    body: "I am fully prepared and willing to relocate immediately. I am highly eligible for express tech visa pathways, including the EU Blue Card, Germany IT Specialist Visa, Ireland Critical Skills Employment Permit, and the Finland Specialist Permit, as well as the UK Global Talent",
  },
  {
    title: "Available immediately",
    body: "Can start within 1- 2 weeks of offer. No notice-period blockers.",
  },
  {
    title: "Open to onsite",
    body: "Willing to relocate immediately for the right team. Hybrid or onsite both work.",
  },
  {
    title: "Remote-fluent",
    body: "5+ years working remotely with distributed teams across multiple time zones.",
  },
];

const countries = [
  { name: "Germany", flag: "🇩🇪" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Finland", flag: "🇫🇮" },
];

export function RelocationSection() {
  return (
    <section id="relocation" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Relocation
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Open to relocation opportunities
            </h2>
            <p className="mt-4 text-muted-foreground">
              I'm based in Nigeria and actively seeking a frontend role with relocation
              sponsorship. I have a clean background, valid international passport, and
              I'm prepared to move quickly for the right team.
            </p>

            {/* <div className="mt-8 flex flex-wrap gap-2">
              {countries.map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium"
                >
                  <span className="text-base leading-none">{c.flag}</span> {c.name}
                </span>
              ))}
            </div> */}

            <div className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
              <Plane className="h-4 w-4" />
              Willing to relocate immediately if hired
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <ul className="grid gap-5 sm:grid-cols-1">
              {points.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-display text-sm font-semibold">{p.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Work authorization:</span>{" "}
              Currently in Nigeria as a remote contributor. Requires standard
              employer-sponsored work visa for EU relocation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
