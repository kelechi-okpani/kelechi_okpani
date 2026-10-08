"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

import { profile } from "@/lib/data/project-data";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "Recruiter");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(
        `Portfolio inquiry from ${name}`,
    );

    const body = encodeURIComponent(
        `${message}\n\n— ${name} (${email})`,
    );

    window.location.href =
        `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setSent(true);
  };

  const contactLinks = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      description: "Best for job opportunities and inquiries",
    },
    {
      label: "LinkedIn",
      value: "Connect with me",
      href: profile.linkedin,
      icon: FaLinkedinIn,
      description: "Professional network and career opportunities",
    },
    {
      label: "GitHub",
      value: "View my repositories",
      href: profile.github,
      icon: FaGithub,
      description: "Projects, experiments, and technical work",
    },
  ];

  return (
      <section
          id="contact"
          className="relative overflow-hidden border-t border-border/50 bg-background py-24 sm:py-32"
      >
        {/* Ambient background */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
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
              Get In Touch
            </div>

            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Let's build something impactful
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              Looking for a Software Engineer to build, improve, or scale your
              product? I'd love to hear about the role, team, and opportunity.
            </p>
          </div>

          {/* Contact content */}
          <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Contact information */}
            <div className="space-y-4">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                    <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={
                          item.href.startsWith("mailto:")
                              ? undefined
                              : "noreferrer"
                        }
                        className="
                    group relative flex items-center gap-4
                    overflow-hidden rounded-2xl
                    border border-white/10
                    bg-white/[0.035]
                    p-5
                    backdrop-blur-xl
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:border-primary/25
                    hover:bg-white/[0.055]
                    hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)]
                    dark:border-white/[0.08]
                  "
                    >
                      {/* Hover glow */}
                      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>

                      <div className="relative min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {item.label}
                        </p>

                        <p className="mt-1 truncate text-sm font-medium">
                          {item.value}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>
                );
              })}

              {/* Availability card */}
              <div
                  className="
                relative overflow-hidden rounded-2xl
                border border-white/10
                bg-white/[0.025]
                p-5
                backdrop-blur-xl
                dark:border-white/[0.08]
              "
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(34,197,94,0.7)]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Open to opportunities
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Remote, hybrid, and relocation opportunities
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Available for international teams
                </div>
              </div>
            </div>

            {/* Contact form */}
            <form
                onSubmit={onSubmit}
                className="
              relative overflow-hidden rounded-3xl
              border border-white/10
              bg-white/[0.035]
              p-6
              shadow-[0_8px_50px_rgba(0,0,0,0.08)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              sm:p-8
            "
            >
              {/* Form glow */}
              <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <div className="mb-7">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                    Start a conversation
                  </p>

                  <h3 className="mt-2 font-display text-xl font-semibold">
                    Tell me about the opportunity
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Share a few details and I'll get back to you as soon as
                    possible.
                  </p>
                </div>

                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                        htmlFor="name"
                        className="text-xs font-medium text-muted-foreground"
                    >
                      Your name
                    </label>

                    <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className="
                      mt-2 w-full rounded-xl
                      border border-white/10
                      bg-background/40
                      px-4 py-3
                      text-sm
                      outline-none
                      backdrop-blur-md
                      transition-all
                      placeholder:text-muted-foreground/50
                      focus:border-primary/40
                      focus:bg-background/60
                      focus:ring-4
                      focus:ring-primary/10
                    "
                        placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                        htmlFor="email"
                        className="text-xs font-medium text-muted-foreground"
                    >
                      Work email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="
                      mt-2 w-full rounded-xl
                      border border-white/10
                      bg-background/40
                      px-4 py-3
                      text-sm
                      outline-none
                      backdrop-blur-md
                      transition-all
                      placeholder:text-muted-foreground/50
                      focus:border-primary/40
                      focus:bg-background/60
                      focus:ring-4
                      focus:ring-primary/10
                    "
                        placeholder="you@company.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mt-5">
                  <label
                      htmlFor="message"
                      className="text-xs font-medium text-muted-foreground"
                  >
                    Message
                  </label>

                  <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="
                    mt-2 w-full resize-none rounded-xl
                    border border-white/10
                    bg-background/40
                    px-4 py-3
                    text-sm
                    leading-6
                    outline-none
                    backdrop-blur-md
                    transition-all
                    placeholder:text-muted-foreground/50
                    focus:border-primary/40
                    focus:bg-background/60
                    focus:ring-4
                    focus:ring-primary/10
                  "
                      placeholder="Tell me about the role, team, project, or opportunity..."
                  />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="
                  group mt-6 inline-flex w-full
                  items-center justify-center gap-2
                  rounded-xl
                  border border-primary/20
                  bg-primary
                  px-5 py-3.5
                  text-sm font-semibold
                  text-primary-foreground
                  shadow-lg shadow-primary/10
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl hover:shadow-primary/20
                  hover:opacity-95
                  focus:outline-none
                  focus:ring-4
                  focus:ring-primary/20
                "
                >
                  {sent ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Opening your mail client...
                      </>
                  ) : (
                      <>
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        Send message
                      </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Or email me directly at{" "}
                  <a
                      href={`mailto:${profile.email}`}
                      className="font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
                  >
                    {profile.email}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
  );
}