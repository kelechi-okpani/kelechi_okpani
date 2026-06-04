'use client'
import { useState } from "react";
import {  Mail, Send } from "lucide-react";
import { profile } from "@/lib/data/project-data";



export function ContactSection() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${data.get("name") || "recruiter"}`,
    );
    const body = encodeURIComponent(
      `${data.get("message") || ""}\n\n— ${data.get("name") || ""} (${data.get("email") || ""})`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Let's build something impactful together
          </h2>
          <p className="mt-4 text-muted-foreground">
            Recruiting for a senior or mid frontend role with relocation sponsorship?
            I'd love to hear from you.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-elevated"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{profile.email}</p>
              </div>
            </a> 
            
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-elevated"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="text-sm font-medium">https://github.com/Kelechiokpani</p>
              </div>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-elevated"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {/* <Linkedin className="h-5 w-5" /> */}
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</p>
                <p className="text-sm font-medium">https://www.linkedin.com/in/kelechi-okpani/</p>
              </div>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-elevated"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {/* <Github className="h-5 w-5" /> */}
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">GitHub</p>
                <p className="text-sm font-medium">https://github.com/Kelechi-okpani</p>
              </div>
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-xl border border-border bg-surface p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="jane@company.com"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Tell me about the role, team and location…"
              />
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 glow-primary"
            >
              <Send className="h-4 w-4" />
              {sent ? "Opening your mail client…" : "Send message"}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Or email me directly at{" "}
              <a href={`mailto:${profile.email}`} className="text-primary hover:underline">
                {profile.email}
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
