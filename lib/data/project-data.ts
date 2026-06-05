export const profile = {
  name: "Kelechi Okpani",
  role: "Design Engineer",
  location: "Abuja, Nigeria",
  email: "kelechiokpani.ko@gmail.com",
  github: "https://github.com/kelechiokpani",
  linkedin: "https://linkedin.com/in/kelechiokpani",
  cv: "/Kelechi_Okpani_Resume.pdf",

  headline:
    "Design Engineer crafting intuitive digital experiences with React, Next.js & TypeScript",

  subheadline:
    "5+ years designing and building production-ready interfaces, design systems, and scalable web applications for fintech and SaaS products. Bridging the gap between design and engineering to create fast, accessible, and user-centered experiences. Open to relocation across Europe.",

  targets: ["Germany", "Ireland", "Finland", "United Kingdom", "European Union"],
};

export const skills = {
  Core: ["React", "Next.js", "TypeScript", "JavaScript"],
  Frontend: ["Tailwind CSS", "Zustand", "Redux Toolkit", "Framer Motion", "shadcn/ui"],
  Backend: ["Node.js", "Express", "REST APIs", "GraphQL"],
  Tooling: ["GitHub Actions", "CI/CD", "Vercel", "Jest", "Playwright", "Figma"],
};

export type Project = {
  name: string;
  url: string;
  github?: string;
  problem: string;
  role: string;
  stack: string[];
  impact: string[];
  category: string;
};

export const projects: Project[] = [
  {
    name: "Jamasoft (Jama Concept)",
    url: "https://www.jamaconcept.com/",
    problem:
      "Marketing site for a software studio needed to convert enterprise leads with credibility and clarity.",
    role: "Lead Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    impact: [
      "Cut LCP from 4.2s to 1.3s with route-level code splitting and image optimization",
      "Implemented modular section system that lets marketing ship pages 3× faster",
      "Lifted contact form conversion 38% with redesigned CTA flow",
    ],
    category: "SaaS Marketing",
  },
  {
    name: "Theragist",
    url: "https://www.theragist.com/",
    problem:
      "Therapist–patient matching platform needed an accessible booking flow and HIPAA-aligned UX.",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    impact: [
      "Shipped end-to-end booking funnel with 92% completion rate",
      "Built reusable form primitives with full keyboard + screen reader support (WCAG AA)",
      "Reduced API round trips 45% via React Query caching and request collapsing",
    ],
    category: "Healthtech",
  },
  {
    name: "Cinstance",
    url: "https://cinstance.com",
    problem:
      "Cloud infra dashboard needed a fast control plane for managing compute instances at scale.",
    role: "Senior Frontend Engineer",
    stack: ["React", "TypeScript", "Zustand", "Tailwind CSS", "WebSockets"],
    impact: [
      "Built real-time instance dashboard handling 10k+ concurrent updates via WebSockets",
      "Reduced bundle size 41% (820kb → 480kb) through dynamic imports",
      "Designed RBAC-aware UI layer used by 30+ enterprise teams",
    ],
    category: "DevOps / Cloud",
  },
  {
    name: "Dominion City Abuja",
    url: "https://dominioncityabuja.com/",
    problem:
      "Large congregation needed a fast, content-heavy site with live streaming and event registration.",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
    impact: [
      "Scored 98 Lighthouse Performance, 100 Accessibility on mobile",
      "Integrated headless CMS so non-technical editors publish in under 2 minutes",
      "Handled 12k+ peak concurrent viewers during live streams with zero downtime",
    ],
    category: "Content / Streaming",
  },
  {
    name: "Vantapp",
    url: "https://vantapp.com/",
    problem:
      "Fintech card-issuing platform needed a polished onboarding and dashboard experience.",
    role: "Senior Frontend Engineer",
    stack: ["React", "Next.js", "TypeScript", "Redux Toolkit", "REST APIs"],
    impact: [
      "Owned KYC and card-issuance flows used by 50k+ users",
      "Integrated 4 third-party payment APIs behind a single typed client",
      "Cut onboarding drop-off 27% through progressive disclosure and inline validation",
    ],
    category: "Fintech",
  },
  {
    name: "Very Deep Tech",
    url: "https://www.verydeeptech.com",
    problem:
      "Tech consultancy needed a brand site that signaled depth across AI, data and engineering services.",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    impact: [
      "Delivered interactive case-study pages with scroll-driven motion",
      "Hit 95+ Lighthouse Performance on every public route",
      "Built a typed CMS schema so the team ships new case studies in hours, not days",
    ],
    category: "Agency / Marketing",
  },
  {
    name: "Colycia Couture",
    url: "https://colyciacouture.com/",
    problem:
      "Luxury fashion brand needed a refined storefront with smooth product browsing and checkout.",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    impact: [
      "Built product gallery with image-CDN driven responsive loading (avg LCP 1.1s)",
      "Integrated Stripe checkout with 3DS, raising checkout completion 22%",
      "Implemented client-side cart state with optimistic updates and persistence",
    ],
    category: "E-commerce",
  },
  {
    name: "HX Africa",
    url: "https://hxafrica.com/",
    problem:
      "Design-led product studio needed a portfolio platform that loaded instantly across emerging markets.",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    impact: [
      "Pre-rendered all marketing routes, achieving sub-second TTFB globally",
      "Built reusable motion primitives reused across 5 client projects",
      "Reduced CLS to 0 across all pages via image and font preloading strategy",
    ],
    category: "Portfolio / Studio",
  },
  {
    name: "Cloudnotte",
    url: "https://cloudnotte.com/",
    problem:
      "School management SaaS needed a unified dashboard for admins, teachers and parents.",
    role: "Senior Frontend Engineer",
    stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "REST APIs"],
    impact: [
      "Architected multi-role dashboard serving 200+ schools and 80k students",
      "Built reusable data-table layer used in 30+ screens, cutting feature delivery time 50%",
      "Improved Time-to-Interactive 60% through virtualization and code splitting",
    ],
    category: "EdTech SaaS",
  },
  {
    name: "Truemark ISO",
    url: "https://truemark-iso.vercel.app/",
    problem:
      "ISO certification provider needed a credibility-driven site to convert enterprise inquiries.",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    impact: [
      "Shipped fully responsive marketing site in under 2 weeks",
      "Built typed content layer making 40+ certification pages trivial to maintain",
      "Lifted qualified lead submissions 60% with restructured CTAs",
    ],
    category: "B2B Marketing",
  },
];

export const experience = [
  {
    company: "Vantapp",
    role: "Senior Frontend Engineer",
    period: "2023 — Present",
    stack: ["Next.js", "TypeScript", "Redux Toolkit", "REST APIs"],
    achievements: [
      "Lead frontend for card-issuing fintech serving 50k+ active users",
      "Integrated 4 payment processors behind a unified typed API client",
      "Cut onboarding drop-off 27% and improved dashboard TTI by 48%",
    ],
  },
  {
    company: "Cloudnotte",
    role: "Senior Frontend Engineer",
    period: "2021 — 2023",
    stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS"],
    achievements: [
      "Architected multi-role SaaS dashboard used by 200+ schools and 80k+ students",
      "Built reusable component system that halved feature delivery time",
      "Owned performance budget — improved Time-to-Interactive by 60%",
    ],
  },
  {
    company: "Freelance / Agency Work",
    role: "Frontend Engineer",
    period: "2019 — 2021",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    achievements: [
      "Delivered 10+ production sites across fintech, healthtech and e-commerce",
      "Maintained 95+ Lighthouse scores across all shipped projects",
      "Integrated Stripe, Paystack and Flutterwave across multiple storefronts",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Kelechi shipped our card-issuance flow in half the time we budgeted — clean, accessible, and observably faster than the previous version.",
    author: "Engineering Manager",
    role: "Fintech (Vantapp)",
  },
  {
    quote:
      "One of the most reliable frontend engineers I have worked with. Owns problems end-to-end and ships polished UI without hand-holding.",
    author: "Product Lead",
    role: "SaaS (Cloudnotte)",
  },
  {
    quote:
      "Pixel-perfect implementation, strong opinions on performance, and a great collaborator with design.",
    author: "Design Director",
    role: "Studio (HX Africa)",
  },
];
