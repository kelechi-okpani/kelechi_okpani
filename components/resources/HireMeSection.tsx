"use client";

import {
    ArrowRight,
    BriefcaseBusiness,
    CheckCircle2,
    Code2,
    Layers3,
    MessageSquare,
    Rocket,
    Sparkles,
    Users,
} from "lucide-react";

import { profile } from "@/data/project-data";

const services = [
    {
        icon: Code2,
        title: "Full-Stack Development",
        description:
            "Build production-ready web applications from frontend architecture to APIs, databases, authentication, and deployment.",
    },
    {
        icon: Rocket,
        title: "Product Development",
        description:
            "Turn an idea, design, or existing product into a scalable digital experience with a strong focus on performance and usability.",
    },
    {
        icon: Layers3,
        title: "Frontend Engineering",
        description:
            "Build polished React and Next.js interfaces with reusable components, responsive design, accessibility, and strong Core Web Vitals.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Contract Engineering",
        description:
            "Join an existing team temporarily to ship features, improve a product, modernize code, or help meet an important deadline.",
    },
];

const engagementTypes = [
    "Freelance projects",
    "Short-term contracts",
    "Long-term contracts",
    "Product development",
    "Frontend / full-stack roles",
    "Technical consulting",
];

export function HireMeSection() {
    return (
        <section
            id="hire-me"
            className="relative overflow-hidden border-t border-border/50 bg-background py-24 sm:py-32"
        >
            {/* Ambient background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-[5%] top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl" />

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
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur-xl">
                        <Sparkles className="h-3.5 w-3.5" />
                        Hire Me
                    </div>

                    <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                        Need a software engineer
                        <span className="text-primary"> for your next project?</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        I work with startups, businesses, agencies, and product teams to
                        build, improve, and scale modern digital products.
                    </p>
                </div>

                {/* Main glass card */}
                <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-[0_25px_100px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-white/[0.08]">
                    {/* Card glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
                    />

                    <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
                        {/* Left */}
                        <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r dark:border-white/[0.08]">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_30px_rgba(var(--primary),0.08)]">
                                    <BriefcaseBusiness className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                                        Available for work
                                    </p>

                                    <h3 className="mt-2 text-xl font-semibold">
                                        Flexible engineering support
                                    </h3>
                                </div>
                            </div>

                            <p className="mt-6 text-sm leading-7 text-muted-foreground">
                                Whether you need someone to build a product from scratch,
                                improve an existing application, or join your engineering team
                                for a specific period, I can help.
                            </p>

                            {/* Engagement types */}
                            <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                {engagementTypes.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3 backdrop-blur-md"
                                    >
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                                        <span className="text-xs font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Availability */}
                            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.035] p-4">
                                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(34,197,94,0.7)]" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Open to new opportunities
                                    </p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        Remote projects and international teams
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="p-7 sm:p-10">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                                What I can help with
                            </p>

                            <div className="mt-6 space-y-3">
                                {services.map((service) => {
                                    const Icon = service.icon;

                                    return (
                                        <div
                                            key={service.title}
                                            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white/[0.045]"
                                        >
                                            <div className="flex gap-4">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                                                    <Icon className="h-4.5 w-4.5" />
                                                </div>

                                                <div>
                                                    <h4 className="text-sm font-semibold">
                                                        {service.title}
                                                    </h4>

                                                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                                                        {service.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="relative border-t border-white/10 bg-white/[0.02] p-6 dark:border-white/[0.08] sm:px-10 sm:py-7">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <MessageSquare className="h-4 w-4" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Have a project or contract opportunity?
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Tell me what you're building and what you need help with.
                                    </p>
                                </div>
                            </div>

                            <a
                                href={`mailto:${profile.email}?subject=Project%20or%20Contract%20Opportunity`}
                                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20 focus:outline-none focus:ring-4 focus:ring-primary/20"
                            >
                                Let's work together
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Small supporting line */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                    <span>React</span>
                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                    <span>Next.js</span>
                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                    <span>TypeScript</span>
                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                    <span>Node.js</span>
                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                    <span>Full-Stack Engineering</span>
                </div>
            </div>
        </section>
    );
}