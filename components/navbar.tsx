"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <nav
            className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-300 ${
                scrolled
                    ? "border-border/60 bg-background/70 shadow-lg shadow-black/5 backdrop-blur-xl"
                    : "border-border/30 bg-background/30 backdrop-blur-md"
            }`}
        >
          <div className="flex h-16 items-center justify-between px-4 md:px-5">
            {/* Logo */}
            <a
                href="/"
                className="group flex items-center gap-2.5"
                onClick={() => setOpen(false)}
            >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
              K
              <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>

              <span className="font-display text-sm font-semibold tracking-tight sm:text-base">
              Kelechi Okpani
            </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {links.map((link) => (
                  <a
                      key={link.href}
                      href={link.href}
                      className="group relative rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-accent/60 hover:text-foreground"
                  >
                    {link.label}

                    <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 group-hover:w-4" />
                  </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Hire Me */}
              <a
                  href="#hire-me"
                  className="group hidden items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md md:inline-flex"
              >
                Hire Me
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                  href="/blog"
                  className="group hidden items-center gap-1.5 rounded-lg border border-border/60 bg-muted/50 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:shadow-md md:inline-flex"
              >
                Blog
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Mobile Menu Button */}
              <button
                  type="button"
                  onClick={() => setOpen((value) => !value)}
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 text-foreground backdrop-blur-sm transition-all hover:bg-accent md:hidden"
              >
                {open ? (
                    <X className="h-4 w-4" />
                ) : (
                    <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
              className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
                  open
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
              }`}
          >
            <div className="border-t border-border/40 px-4 pb-4 pt-3">
              <div className="rounded-xl border border-border/40 bg-background/30 p-2 backdrop-blur-md">
                {links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                ))}

                <a
                    href="#hire-me"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Hire Me
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                    href="/blog"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                >
                  Blog
                  <ArrowUpRight className="h-4 w-4" />
                </a>

              </div>
            </div>
          </div>
        </nav>
      </header>
  );
}