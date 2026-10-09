import {
    Code2,
    Database,
    GitBranch,
    Globe2,
    Layers3,
    Server,
    ShieldCheck,
    TestTube2,
    Wrench,
    Zap,
} from "lucide-react";

import { skills } from "@/data/project-data";

const categoryConfig: Record<
    string,
    {
        label: string;
        description: string;
        icon: React.ElementType;
        featured?: boolean;
    }
> = {
    core: {
        label: "Core Technologies",
        description: "The languages and frameworks I use to build modern web products.",
        icon: Code2,
        featured: true,
    },

    frontend: {
        label: "Frontend Engineering",
        description: "Responsive interfaces, reusable components, and scalable UI architecture.",
        icon: Layers3,
    },

    backend: {
        label: "Backend & APIs",
        description: "Reliable services, APIs, authentication, and real-time communication.",
        icon: Server,
    },

    databases: {
        label: "Databases",
        description: "Working with relational, NoSQL, and in-memory data systems.",
        icon: Database,
    },

    testing: {
        label: "Testing",
        description: "Writing reliable, maintainable, and production-ready code.",
        icon: TestTube2,
    },

    devops: {
        label: "DevOps & Cloud",
        description: "Version control, containers, CI/CD, deployment, and cloud platforms.",
        icon: GitBranch,
    },

    practices: {
        label: "Engineering Practices",
        description: "Performance, security, collaboration, and modern development workflows.",
        icon: Wrench,
    },
};

export function SkillsSection() {
    const entries = Object.entries(skills);

    return (
        <section
            id="skills"
            className="relative overflow-hidden border-t border-border/50 bg-background py-24 sm:py-32"
        >
            {/* Ambient background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
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
                        <Zap className="h-3.5 w-3.5" />
                        Skills & Technologies
                    </div>

                    <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                        The stack I build with
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                        A modern full-stack toolkit I use to design, build, test, optimize,
                        and deploy production-ready web applications.
                    </p>
                </div>

                {/* Skills grid */}
                <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
                    {entries.map(([group, items], index) => {
                        const config = categoryConfig[group];

                        if (!config) return null;

                        const Icon = config.icon;

                        return (
                            <div
                                key={group}
                                className={`
                  group relative overflow-hidden rounded-2xl
                  border border-white/10
                  bg-white/[0.035]
                  p-6
                  shadow-[0_8px_40px_rgba(0,0,0,0.08)]
                  backdrop-blur-xl
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-primary/25
                  hover:bg-white/[0.055]
                  hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)]
                  dark:border-white/[0.08]
                  ${
                                    config.featured || index === 0
                                        ? "md:col-span-2 lg:col-span-12"
                                        : "lg:col-span-6"
                                }
                `}
                            >
                                {/* Hover glow */}
                                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                                {/* Top highlight */}
                                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative">
                                    {/* Category heading */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h3 className="font-display text-base font-semibold tracking-tight">
                                                {config.label}
                                            </h3>

                                            <p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">
                                                {config.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="
                          inline-flex items-center
                          rounded-lg
                          border border-white/10
                          bg-background/40
                          px-3 py-1.5
                          text-xs font-medium
                          text-foreground/85
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
                        );
                    })}
                </div>

                {/* Bottom summary */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                        {
                            icon: Globe2,
                            value: "Full-Stack",
                            label: "Frontend + Backend",
                        },
                        {
                            icon: ShieldCheck,
                            value: "Production",
                            label: "Secure & Reliable Systems",
                        },
                        {
                            icon: Zap,
                            value: "Performance",
                            label: "Optimized User Experiences",
                        },
                    ].map(({ icon: Icon, value, label }) => (
                        <div
                            key={value}
                            className="
                group flex items-center gap-4
                rounded-2xl
                border border-white/10
                bg-white/[0.025]
                px-5 py-4
                backdrop-blur-xl
                transition-all duration-300
                hover:border-primary/20
                hover:bg-white/[0.045]
              "
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold">{value}</p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    {label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}