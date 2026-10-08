export const profile = {
  name: "Kelechi Okpani",
  role: "Software Engineer",
  location: "Nigeria",
  email: "kelechiokpani.ko@gmail.com",
  github: "https://github.com/Kelechi-okpani/",
  linkedin: "https://linkedin.com/in/kelechiokpani",
  cv: "/Kelechi_Okpani_Resume.pdf",

headline:
    "Software Engineer building scalable, user-centric web applications",

  subheadline:
"Software Engineer with 5+ years of experience building scalable, secure, and high-performance web applications across frontend and backend environments. Strong expertise in JavaScript and TypeScript, with hands-on experience using React.js, Next.js, Vue.js, Node.js, Express.js, NestJS, REST APIs, GraphQL, and modern database technologies including MongoDB, PostgreSQL, and Redis. Experienced in developing production-ready SaaS, fintech, and enterprise applications, with a focus on performance, clean architecture, API integration, authentication, testing, and reliable cloud deployment. Comfortable working across the full software development lifecycle, from building responsive user interfaces to developing backend services, integrating APIs, and deploying applications to cloud platforms.\n",
  targets: ["Germany", "Ireland", "Finland", "United Kingdom", "European Union"],
};


export const skills = {
  core: [
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Vue.js",
  ],

  frontend: [
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Redux Toolkit",
    "Responsive Design",
    "CSS Grid",
    "Flexbox",
    "Component Architecture",
    "State Management",
  ],

  backend: [
    "Node.js",
    "Express.js",
    "NestJS",
    "REST APIs",
    "GraphQL",
    "WebSockets",
    "Authentication & Authorization",
  ],

  databases: [
    "MongoDB",
    "PostgreSQL",
    "Redis",
  ],

  testing: [
    "Jest",
    "React Testing Library",
    "Unit Testing",
    "Integration Testing",
  ],

  devops: [
    "Docker",
    "Git",
    "GitHub",
    "GitLab",
    "GitHub Actions",
    "CI/CD",
    "AWS",
    "Vercel",
    "Railway",
    "Cloudflare",
    "Cloudinary",
  ],

  practices: [
    "Performance Optimization",
    "Core Web Vitals",
    "API Integration",
    "Clean Architecture",
    "Agile / Scrum",
    "Code Reviews",
    "Figma",
    "Postman",
  ],
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
      "A software development and technology consultancy required a highly professional, enterprise-grade digital footprint to market full-cycle software services and streamline incoming B2B service consultations.",
    role: "Lead Full Stack Engineer",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "REST APIs",
    ],
    impact: [
      "Architected a secure, end-to-end client engagement platform featuring dynamic service catalogs, centralized contact entry points, and automated lead routing systems.",
      "Engineered an administrative dashboard with Node.js and MongoDB, giving non-technical managers full control over active service offerings and case studies.",
      "Optimized production runtime performance using Next.js route segment configs and image lazy-loading, slashing initial page weight and boosting SEO authority.",
    ],
    category: "SaaS Marketing",
  },
  {
    name: "Theragist",
    url: "https://www.theragist.com/",
    problem:
      "A digital mental health platform needed a fully accessible, frictionless patient onboarding funnel and a HIPAA-compliant therapist-matching flow.",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    impact: [
      "Shipped a multi-step clinical intake and therapist matching funnel, achieving a 92% completion rate through progressive form disclosure.",
      "Built fully reusable, semantic UI primitives adhering strictly to WCAG AA guidelines with robust keyboard navigation and aria-live announcements.",
      "Reduced API network overhead by 45% by deploying TanStack Query for structured state caching, query deduplication, and request collapsing.",
    ],
    category: "Healthtech",
  },
  {
    name: "Dominion City Abuja",
    url: "https://dominioncityabuja.com/",
    problem:
      "A large-scale religious organization required a high-capacity media distribution hub capable of low-latency live streaming, real-time event registrations, and rapid content updates.",
    role: "Full Stack Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Node.js", "Webhooks"],
    impact: [
      "Engineered a resilient video distribution architecture that maintained zero-downtime streaming during peak concurrent traffic of 12k+ live viewers.",
      "Implemented automated webhook listeners linked to a structured headless Sanity CMS schema, reducing the staff's content-to-live latency to under 2 minutes.",
      "Configured highly aggressive incremental static regeneration (ISR) strategies to capture a perfect 100 Mobile Accessibility score and 98 Performance score.",
    ],
    category: "Content / Streaming",
  },
  {
    name: "Colycia Couture",
    url: "https://colyciacouture.com/",
    problem:
      "A high-end luxury fashion brand required a premium, performant e-commerce engine with fluid animations, instant cart updates, and robust global payment flows.",
    role: "Full Stack Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Stripe"],
    impact: [
      "Integrated an end-to-end Stripe payment infrastructure supporting 3D Secure verification and custom webhooks for automated order fulfillment, driving checkout completions up 22%.",
      "Designed a synchronized client-server cart engine featuring Redux-driven state persistence, optimistic UI rendering, and database reconciliation.",
      "Engineered an image-CDN asset pipeline with next/image layout constraints, maintaining an average Largest Contentful Paint (LCP) of 1.1s across collections.",
    ],
    category: "E-commerce",
  },
  {
    name: "Cinstance",
    url: "https://cinstance.com",
    problem:
      "An infrastructure-as-a-service provider needed an ultra-low-latency, high-frequency control plane to manage, scale, and monitor cloud compute instances in real time.",
    role: "Senior Frontend Engineer",
    stack: ["React", "TypeScript", "Zustand", "Tailwind CSS", "WebSockets"],
    impact: [
      "Built a stateful, real-time console layer capable of parsing and rendering over 10k continuous stream events per second via persistent WebSocket connections.",
      "Cut application bundle weight by 41% (from 820kb down to 480kb) by implementing strategic component lazy-loading and bundle dependency splits.",
      "Architected a granular, role-based access control (RBAC) UI layer that securely toggles dashboard administrative views across 30+ enterprise accounts.",
    ],
    category: "DevOps / Cloud",
  },
  {
    name: "Vantapp",
    url: "https://vantapp.com/",
    problem:
      "A fintech digital banking and card-issuing ecosystem required a secure, institutional-grade KYC verification funnel and corporate debit card management dashboard.",
    role: "Senior Frontend Engineer",
    stack: ["React", "Next.js", "TypeScript", "Redux Toolkit", "REST APIs"],
    impact: [
      "Developed secure, heavily validated identity verification (KYC) and instant virtual card issuance modules utilized daily by 50k+ active accounts.",
      "Designed a robust, abstract API wrapper client that encapsulated 4 disparate third-party banking and verification endpoints into a single, fully typed engine.",
      "Decreased target user drop-off during account registration by 27% through custom inline validation triggers and progressive interactive steps.",
    ],
    category: "Fintech",
  },
  {
    name: "Very Deep Tech",
    url: "https://www.verydeeptech.com",
    problem:
      "A deep-tech and AI transformation consultancy required a visually striking, high-performance portfolio to establish engineering depth and secure technical client accounts.",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    impact: [
      "Authored fluid, scroll-linked complex layout timelines and hardware-accelerated fluid motion primitives using Framer Motion to elevate the brand's premium digital identity.",
      "Enforced tight asset optimizations and absolute code splitting to consistently cross the 95+ performance boundary on all production marketing routes.",
      "Constructed a typed, strictly validated CMS integration that cut internal production release times for case studies from days down to a few hours.",
    ],
    category: "Agency / Marketing",
  },
  {
    name: "HX Africa",
    url: "https://hxafrica.com/",
    problem:
      "A premium product studio needed an interactive, highly visual digital showcase optimized to load instantly across unpredictable mobile networks in emerging markets.",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    impact: [
      "Achieved sub-second Time to First Byte (TTFB) globally by shifting the core application runtime onto a fully pre-rendered Static Site Generation model.",
      "Abstracted a series of decoupled, highly composable design primitives that accelerated subsequent product design deliveries across multiple spin-off client projects.",
      "Eliminated structural Cumulative Layout Shift (CLS score: 0) by creating explicit font-face display rules and adaptive aspect-ratio image envelopes.",
    ],
    category: "Portfolio / Studio",
  },
  {
    name: "Cloudnotte",
    url: "https://cloudnotte.com/",
    problem:
      "An enterprise educational SaaS platform needed a unified, multi-tenant portal to seamlessly connect academic administrations, teachers, students, and parents under separate functional views.",
    role: "Senior Frontend Engineer",
    stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "REST APIs"],
    impact: [
      "Architected the modular frontend interface for a multi-role web platform supporting 200+ academic institutions and managing over 80k active student profiles.",
      "Engineered an optimized, reusable client-side data grid handling high-density rows with search, pagination, and multi-column filtering, slashing screen delivery time by 50%.",
      "Improved initial Time-to-Interactive (TTI) metrics by 60% across complex portal interfaces by introducing row virtualization and dynamic code splitting.",
    ],
    category: "EdTech SaaS",
  },
  {
    name: "Belhomz Properties",
    url: "https://belhomz.vercel.app/",
    problem:
      "A luxury real estate firm required a premium, high-performance platform to effectively showcase luxury property listings, engage international investors, and capture high-value real estate inquiries.",
    role: "Full Stack Engineer",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    impact: [
      "Engineered the entire end-to-end architecture, delivering the frontend interface layers, responsive multi-tiered navigation components, and robust backend services to manage premium property catalogs.",
      "Built and optimized dynamic, autoplaying vertical video cards and interactive property preview modules, minimizing media layout shift while designing a seamless API data pipeline for rapid listing updates.",
      "Implemented a highly performant, mobile-first design system coupled with optimized database querying that significantly reduced bounce rates and streamlined the conversion path for real estate buyers.",
    ],
    category: "Real Estate",
  },
  {
    name: "Truemark Global",
    url: "https://www.truemarkglobal.com/",
    problem:
      "An international ISO certification and compliance training provider needed a high-credibility, enterprise-grade digital platform to scale corporate trust, simplify complex service offerings, and capture high-value global business leads.",
    role: "Full Stack Engineer",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cloudinary",
    ],
    impact: [
      "Architected and deployed a highly responsive, end-to-end web application featuring scalable frontend components and secure corporate lead distribution architectures.",
      "Re-engineered backend API hooks to handle optimized, unsigned asset uploads directly to Cloudinary storage, integrating strong client-side error boundaries to ensure smooth document submission workflows.",
      "Boosted B2B lead generation conversion by 60% through optimized user journeys, localized trust indicators, and strategically mapped call-to-action (CTA) triggers.",
    ],
    category: "Corporate Enterprise",
  },
];


export const experience = [
  {
    company: "Jamasoft Concepts Limited",
    role: "Full-Stack Engineer",
    period: "Feb 2023 — Jun 2026",
    location: "Hybrid",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Redux Toolkit",
      "Docker",
      "Git",
      "CI/CD",
    ],
    achievements: [
      "Led end-to-end development of enterprise-grade fintech applications using React, Next.js, TypeScript, and Node.js, owning feature architecture from concept through production.",
      "Integrated REST and GraphQL APIs for secure application workflows, optimizing data-fetching overhead and improving response times by 30%.",
      "Implemented authentication, role-based access control, Docker-based development workflows, and automated CI/CD pipelines using Git and GitHub.",
      "Architected centralized state management with Redux Toolkit to coordinate cross-service user data and reduce synchronization issues.",
      "Mentored junior engineers, conducted code reviews, and collaborated with the Head of Technology to establish scalable software architecture standards.",
      "Worked closely with product managers and UX designers to translate business requirements into technical milestones and accelerate feature delivery.",
    ],
  },

  {
    company: "Channel Info Technology (BPOSEATS)",
    role: "Full-Stack Engineer",
    period: "Jan 2025 — Jan 2026",
    location: "Remote",
    stack: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Figma",
      "Jest",
      "React Testing Library",
    ],
    achievements: [
      "Designed and maintained full-stack web applications by integrating responsive Vue.js interfaces with Node.js and Express.js backend services.",
      "Translated Figma wireframes and design-system specifications into interactive web modules and reusable component libraries.",
      "Managed complex multi-step forms and dashboard interaction flows using structured state-management patterns.",
      "Conducted bundle-size analysis and frontend performance optimization while improving testing standards with Jest and React Testing Library.",
      "Optimized asset delivery and image pipelines to reduce page weight and improve Largest Contentful Paint (LCP) across heavy client dashboards.",
      "Collaborated on cross-functional debugging sessions and Agile retrospectives to identify and eliminate recurring production bottlenecks.",
    ],
  },

  {
    company: "Deep Technology Limited",
    role: "Frontend Developer",
    period: "Jun 2020 — Dec 2022",
    location: "Hybrid",
    stack: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "CSS Grid",
      "Apollo Client",
      "Jest",
      "React Testing Library",
      "ESLint",
      "Prettier",
    ],
    achievements: [
      "Developed consumer-facing web applications from the ground up using React and modern JavaScript development practices.",
      "Configured application data layers with Apollo Client to consume backend APIs and manage complex client-side caching states.",
      "Implemented automated unit testing with Jest and React Testing Library to improve reliability and reduce post-release issues.",
      "Engineered dynamic UI components using CSS Grid and Tailwind CSS for consistent experiences across mobile, tablet, and desktop devices.",
      "Established ESLint and Prettier standards to improve code quality, consistency, and maintainability across the engineering team.",
      "Collaborated in Agile sprint planning, daily stand-ups, system debugging, and client feedback sessions to continuously improve product experiences.",
    ],
  },
];
