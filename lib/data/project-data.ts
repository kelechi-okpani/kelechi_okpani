export const profile = {
  name: "Kelechi Okpani",
  role: "Design Engineer",
  location: "Abuja, Nigeria",
  email: "kelechiokpani.ko@gmail.com",
  github: "https://github.com/kelechiokpani",
  linkedin: "https://linkedin.com/in/kelechiokpani",
  cv: "/Kelechi_Okpani_Resume.pdf",

headline:
    "Full Stack MERN Developer building scalable, user-centric web applications",

  subheadline:
    "5+ years of experience designing and developing robust production-ready applications across the full MERN stack. Specialized in crafting high-performance frontends, secure RESTful/GraphQL APIs, and optimized database architectures for fintech and SaaS products. Open to relocation across Europe.",

  targets: ["Germany", "Ireland", "Finland", "United Kingdom", "European Union"],
};

// export const skills = {
//   Core: ["React", "Next.js", "TypeScript", "JavaScript"],
//   Frontend: ["Tailwind CSS", "Zustand", "Redux Toolkit", "Framer Motion", "shadcn/ui"],
//   Backend: ["Node.js", "Express", "REST APIs", "GraphQL"],
//   Tooling: ["GitHub Actions", "CI/CD", "Vercel", "Jest", "Playwright", "Figma"],
// };

export const skills = {
  core: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript (ES6+)',
    'Vue.js',
    'Angular.js',
  ],

  frontend: [
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'CSS Grid',
    'Flexbox',
    'Responsive Design',
    'Redux Toolkit',
    'React Query',
    'Zustand',
    'Context API',
  ],

  backend: [
    'Node.js',
    'Express',
    'REST APIs',
    'GraphQL',
    'Authentication',
    'PostgreSQL',
    'MongoDB',
  ],

  testing: [
    'Jest',
    'React Testing Library',
  ],

  tools: [
    'Git',
    'GitHub Actions',
    'npm',
    'Postman',
    'Figma',
    'Vercel',
    'CI/CD',
    'Performance Optimization',
    'Core Web Vitals',
    'Agile',
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
    "Software development company required a modern, scalable platform to showcase its services, strengthen brand credibility, and generate enterprise leads.",
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
    "Designed and developed a scalable full-stack web application with a responsive, high-performance user interface.",
    "Built and integrated backend APIs to support dynamic content and contact form submissions.",
    "Optimized application performance through code splitting, image optimization, and modern frontend best practices.",
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
    name: "Dominion City Abuja",
    url: "https://dominioncityabuja.com/",
    problem:
      "Large congregation required a highly scalable, content-heavy web application with low-latency live streaming integration and seamless event registration workflows.",
    role: "Full Stack Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Node.js", "Webhooks"],
    impact: [
      "Engineered a high-availability live streaming pipeline handling 12k+ peak concurrent viewers with zero downtime.",
      "Architected a headless CMS schema and webhook system, enabling non-technical editors to publish real-time content updates in under 2 minutes.",
      "Optimized server-side rendering (SSR) and data caching to achieve a 98 Lighthouse Performance and 100 Accessibility score on mobile.",
    ],
    category: "Full Stack / Content / Streaming",
  },

  {
    name: "Colycia Couture",
    url: "https://colyciacouture.com/",
    problem:
      "Luxury fashion brand needed a high-performance e-commerce platform with a refined storefront, secure transaction processing, and synchronized inventory management.",
    role: "Full Stack Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Stripe"],
    impact: [
      "Architected end-to-end secure Stripe payment infrastructure with 3D Secure (3DS) and webhook handlers, increasing checkout conversion by 22%.",
      "Designed a robust client-server cart state synchronization system with optimistic UI updates and persistent database fallback.",
      "Engineered an image-CDN driven product catalog pipeline, optimizing server response times and achieving an average LCP of 1.1s.",
    ],
    category: "Full Stack / E-commerce",
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
  
  // {
  //   name: "Dominion City Abuja",
  //   url: "https://dominioncityabuja.com/",
  //   problem:
  //     "Large congregation needed a fast, content-heavy site with live streaming and event registration.",
  //   role: "Frontend Engineer",
  //   stack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
  //   impact: [
  //     "Scored 98 Lighthouse Performance, 100 Accessibility on mobile",
  //     "Integrated headless CMS so non-technical editors publish in under 2 minutes",
  //     "Handled 12k+ peak concurrent viewers during live streams with zero downtime",
  //   ],
  //   category: "Content / Streaming",
  // },
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
  // {
  //   name: "Colycia Couture",
  //   url: "https://colyciacouture.com/",
  //   problem:
  //     "Luxury fashion brand needed a refined storefront with smooth product browsing and checkout.",
  //   role: "Frontend Engineer",
  //   stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
  //   impact: [
  //     "Built product gallery with image-CDN driven responsive loading (avg LCP 1.1s)",
  //     "Integrated Stripe checkout with 3DS, raising checkout completion 22%",
  //     "Implemented client-side cart state with optimistic updates and persistence",
  //   ],
  //   category: "E-commerce",
  // },
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
    name: "Belhomz Properties",
    url: "https://belhomz.vercel.app/",
    problem:
      "A luxury real estate firm required a high-performance web presence to effectively showcase premium listings, engage local and diaspora investors, and drive property inquiries through an immersive digital experience.",
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
    category: "Real Estate & E-Commerce",
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
    company: "Jamasoft Concepts Ltd",
    role: "Full Stack Engineer",
    period: "Jun 2023 — Jan 2026",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Express.js",
      "GraphQL",
      "Tailwind CSS",
    ],
    achievements: [
      "Developed and maintained enterprise fintech applications using React, Next.js, TypeScript, and Node.js",
      "Built responsive, reusable user interfaces and integrated REST & GraphQL APIs with secure authentication and payment workflows",
      "Collaborated with product managers, UX designers, backend engineers, and stakeholders to deliver business-critical features in Agile environments",
    ],
  },
  {
    company: "Channel Info Tech (BPOSEATS)",
    role: "UX / Frontend Engineer",
    period: "Jan 2025 — Sep 2025",
    stack: [
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Figma",
      "Jest",
    ],
    achievements: [
      "Converted complex Figma designs into responsive, production-ready web applications",
      "Built reusable frontend components and design patterns to improve UI consistency and maintainability",
      "Integrated backend APIs and enhanced enterprise dashboard experiences while collaborating closely with UX teams",
    ],
  },
  {
    company: "Deep Technology Ltd",
    role: "Frontend Developer",
    period: "Jun 2020 — Dec 2022",
    stack: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "REST APIs",
      "Apollo Client",
      "Jest",
    ],
    achievements: [
      "Developed responsive customer-facing web applications using React and JavaScript",
      "Built reusable UI components and integrated REST APIs to deliver scalable frontend solutions",
      "Improved application quality through testing, debugging, and collaboration within Agile development teams",
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
