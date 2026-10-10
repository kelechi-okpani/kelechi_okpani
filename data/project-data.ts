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

export interface Project {
  name: string;
  url?: string;
  github?: string;
  category: string;
  role: string;

  problem: string;
  solution: string;
  contribution: string;

  stack: string[];

  proofOfWork: {
    metric: string;
    label: string;
    description: string;
  }[];

  impact: string[];

  caseStudy: {
    challenge: string;
    approach: string;
    result: string;
  };
}

export const projects: Project[] = [
  {
    name: "Jamasoft",
    url: "https://www.jamaconcept.com/",
    category: "SaaS / Marketing",
    role: "Lead Full Stack Engineer",

    problem:
        "The platform needed a scalable digital experience that could present services clearly while supporting dynamic content and internal management workflows.",

    solution:
        "Built a modern Next.js application with reusable React components, responsive interfaces, dynamic service content, and an admin-focused architecture.",

    contribution:
        "Led the full-stack implementation, including the frontend architecture, reusable components, API integration, responsive UI, performance optimization, and deployment workflow.",

    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
      "MongoDB",
      "Docker",
      "GitHub",
      "Vercel",
    ],

    proofOfWork: [
      {
        metric: "Dynamic",
        label: "Service Catalog",
        description:
            "Built a dynamic service catalog and supporting management functionality.",
      },
      {
        metric: "Optimized",
        label: "Page Delivery",
        description:
            "Used Next.js route segment configuration and image lazy-loading to improve page delivery.",
      },
      {
        metric: "Full Stack",
        label: "Ownership",
        description:
            "Contributed across frontend, backend integration, performance, and deployment.",
      },
    ],

    impact: [
      "Built a scalable SaaS marketing experience.",
      "Improved content management through dynamic service functionality.",
      "Applied performance-focused Next.js architecture.",
    ],

    caseStudy: {
      challenge:
          "Create a scalable marketing platform that could communicate the company's services while remaining fast and easy to maintain.",

      approach:
          "Used Next.js, React, TypeScript and Tailwind CSS with reusable components, dynamic content and optimized image delivery.",

      result:
          "Delivered a responsive full-stack platform with a maintainable architecture and optimized user experience.",
    },
  },

  {
    name: "Theragist",
    url: "https://www.theragist.com/",
    category: "Healthtech",
    role: "Frontend Engineer",

    problem:
        "The platform required an accessible and reliable user experience while communicating with multiple API endpoints efficiently.",

    solution:
        "Built accessible React interfaces with reusable components, API state management and performance-focused data fetching.",

    contribution:
        "Developed the frontend architecture, implemented WCAG-focused interfaces, integrated APIs and optimized network requests.",

    stack: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "REST APIs",
      "Authentication & Authorization",
      "PostgreSQL",
      "Jest",
      "GitHub",
      "Vercel",
    ],

    proofOfWork: [
      {
        metric: "92%",
        label: "Completion Rate",
        description:
            "Achieved a 92% completion rate across the core user flow.",
      },
      {
        metric: "WCAG AA",
        label: "Accessibility",
        description:
            "Built interfaces with accessibility requirements aligned with WCAG AA.",
      },
      {
        metric: "45%",
        label: "Less API Overhead",
        description:
            "Reduced API network overhead by 45% through improved client-side data fetching.",
      },
    ],

    impact: [
      "92% completion rate for the core experience.",
      "Improved accessibility with WCAG AA practices.",
      "Reduced API network overhead by 45%.",
    ],

    caseStudy: {
      challenge:
          "Create a healthtech experience that was accessible, responsive and efficient when working with API-driven data.",

      approach:
          "Built reusable React components, applied accessibility standards and optimized API data management to reduce unnecessary requests.",

      result:
          "Delivered a more accessible and efficient platform with a 92% completion rate and 45% reduction in API network overhead.",
    },
  },

  {
    name: "Dominion City Abuja",
    url: "https://dominioncityabuja.com/",
    category: "Content / Streaming",
    role: "Full Stack Developer",

    problem:
        "The church platform needed to support high-volume live streaming, content discovery and a responsive experience across devices.",

    solution:
        "Built a full-stack web experience combining content management, live streaming functionality, responsive interfaces and optimized media delivery.",

    contribution:
        "Worked across the frontend and backend, implemented live-streaming experiences, optimized media delivery and improved mobile performance.",

    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "GraphQL",
      "WebSockets",
      "MongoDB",
      "Cloudinary",
      "Vercel",
    ],

    proofOfWork: [
      {
        metric: "2K+",
        label: "Concurrent Viewers",
        description:
            "Supported live streaming experiences reaching more than 12,000 concurrent viewers.",
      },
      {
        metric: "<2 min",
        label: "Content-to-Live Latency",
        description:
            "Maintained content-to-live latency under two minutes.",
      },
      {
        metric: "100",
        label: "Mobile Accessibility",
        description:
            "Achieved a 100 mobile accessibility score alongside a 98 performance score.",
      },
    ],

    impact: [
      "Supported 2K+ concurrent live viewers.",
      "Kept content-to-live latency below two minutes.",
      "Achieved 100 mobile accessibility and 98 performance scores.",
    ],

    caseStudy: {
      challenge:
          "Build a digital church platform capable of delivering live and on-demand content to a large online audience.",

      approach:
          "Combined Next.js, React, GraphQL, WebSockets and optimized media delivery to create a responsive content and streaming experience.",

      result:
          "Delivered a high-performing platform supporting 2K+ concurrent viewers with strong mobile accessibility and performance.",
    },
  },

  {
    name: "Colycia Couture",
    url: "https://colyciacouture.com/",
    category: "E-commerce",
    role: "Full Stack Developer",

    problem:
        "The e-commerce experience needed a faster checkout flow, reliable payment processing and strong mobile performance.",

    solution:
        "Built a responsive e-commerce platform with optimized checkout, payment integration and performance-focused frontend architecture.",

    contribution:
        "Implemented frontend and backend functionality, integrated Stripe 3DS and webhooks, optimized checkout interactions and improved page performance.",

    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
      "Authentication & Authorization",
      "MongoDB",
      "Cloudinary",
      "Vercel",
    ],

    proofOfWork: [
      {
        metric: "22%",
        label: "Checkout Improvement",
        description:
            "Improved checkout completion by 22%.",
      },
      {
        metric: "Stripe",
        label: "3DS + Webhooks",
        description:
            "Integrated Stripe 3D Secure and webhook-based payment workflows.",
      },
      {
        metric: "1.1s",
        label: "Average LCP",
        description:
            "Maintained an average Largest Contentful Paint of approximately 1.1 seconds.",
      },
    ],

    impact: [
      "Improved checkout completion by 22%.",
      "Implemented reliable Stripe payment workflows.",
      "Achieved approximately 1.1s average LCP.",
    ],

    caseStudy: {
      challenge:
          "Improve the online shopping experience while making checkout reliable and keeping the storefront fast.",

      approach:
          "Built a responsive Next.js storefront, optimized checkout interactions and integrated Stripe 3DS and webhooks.",

      result:
          "Improved checkout completion by 22% while maintaining strong frontend performance.",
    },
  },


  {
    name: "Cinstance",
    url: "https://cinstance.com/",
    category: "Developer SaaS / Customer Operations",
    role: "Senior Frontend Engineer",

    problem:
        "Software teams often manage customer support, production errors, documentation, secrets, API keys and customer communication across disconnected tools, making it difficult for support and engineering teams to share context.",

    solution:
        "Built and contributed to a unified developer-focused workspace that connects customer support, live and AI chat, customer portals, Bug Watch, Secret Manager, documentation, API keys and integrations in one platform.",

    contribution:
        "Worked on the frontend experience for a complex SaaS platform, building reusable interfaces, dashboards, data-driven workflows, responsive product surfaces and integrations across support and developer tooling.",

    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Node.js",
      "GraphQL",
      "WebSockets",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Cloudflare",
    ],

    proofOfWork: [
      {
        metric: "Multi-Product",
        label: "SaaS Workspace",
        description:
            "Contributed to a unified workspace spanning support tickets, live and AI chat, customer portals, Bug Watch, secrets and documentation.",
      },
      {
        metric: "Real-Time",
        label: "Developer Workflows",
        description:
            "Built interfaces around real-time support conversations, production errors, notifications and engineering workflows.",
      },
      {
        metric: "Enterprise",
        label: "Access Control",
        description:
            "Worked with product experiences supporting organization-level permissions and product-scoped roles.",
      },
    ],

    impact: [
      "Unified customer support and developer workflows into one SaaS experience.",
      "Supported complex real-time customer and engineering workflows.",
      "Built interfaces across customer-facing and internal developer tools.",
      "Worked with integrations including REST, GraphQL, webhooks, API keys and SDK-based workflows.",
    ],

    caseStudy: {
      challenge:
          "Software teams needed a single workspace where customer issues could be connected directly to the engineering context required to investigate and resolve them.",

      approach:
          "Contributed to a modular SaaS interface covering support tickets, live and AI chat, customer portals, production error monitoring, secret management, documentation and developer integrations.",

      result:
          "Delivered a unified product experience connecting customers, support teams and engineers while keeping operational and technical context in the same workspace.",
    },
  },

  {
    name: "Vantapp",
    url: "https://vantapp.com/",
    category: "Fintech",
    role: "Senior Frontend Engineer",

    problem:
        "The fintech platform needed a smooth onboarding experience while communicating with multiple financial service APIs.",

    solution:
        "Built a scalable React/Next.js frontend with reusable API integrations, state management and secure authentication flows.",

    contribution:
        "Developed frontend architecture, API integrations, authentication flows and onboarding experiences.",

    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "REST APIs",
      "Authentication & Authorization",
      "PostgreSQL",
      "Vercel",
    ],

    proofOfWork: [
      {
        metric: "5K+",
        label: "Active Accounts",
        description:
            "Supported a platform serving more than 5,000 active accounts.",
      },
      {
        metric: "4",
        label: "API Integrations",
        description:
            "Built an API wrapper integrating four third-party endpoints.",
      },
      {
        metric: "27%",
        label: "Less Drop-off",
        description:
            "Reduced registration drop-off by 27%.",
      },
    ],

    impact: [
      "Supported 5K+ active accounts.",
      "Integrated four third-party API endpoints.",
      "Reduced registration drop-off by 27%.",
    ],

    caseStudy: {
      challenge:
          "Build a reliable fintech frontend that could support a growing user base while simplifying the registration experience.",

      approach:
          "Created reusable React and Next.js components, centralized API integration and improved authentication and onboarding flows.",

      result:
          "Supported 5K+ active accounts and reduced registration drop-off by 27%.",
    },
  },

  {
    name: "Very Deep Tech",
    url: "https://www.verydeeptech.com",
    category: "Agency / Marketing",
    role: "Frontend Engineer",

    problem:
        "The agency needed a visually engaging website without sacrificing loading performance or development speed.",

    solution:
        "Built a performance-focused marketing interface with reusable components, responsive layouts and optimized animations.",

    contribution:
        "Developed the frontend architecture, optimized page performance and implemented interactive animations.",

    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
      "MongoDB",
      "Cloudinary",
      "Vercel",
      "GitHub",
    ],

    proofOfWork: [
      {
        metric: "95+",
        label: "Performance",
        description:
            "Maintained a 95+ performance boundary for the web experience.",
      },
      {
        metric: "Days → Hours",
        label: "Release Time",
        description:
            "Helped reduce release cycles from days to hours.",
      },
      {
        metric: "GPU",
        label: "Animations",
        description:
            "Used hardware-accelerated Framer Motion animations for smoother interactions.",
      },
    ],

    impact: [
      "Maintained 95+ performance.",
      "Reduced release cycles from days to hours.",
      "Implemented performant interactive animations.",
    ],

    caseStudy: {
      challenge:
          "Create a visually strong agency website that remained fast and maintainable.",

      approach:
          "Used Next.js, React, TypeScript and optimized animation techniques alongside reusable components.",

      result:
          "Delivered a high-performance marketing experience while improving the development and release workflow.",
    },
  },

  {
    name: "HX Africa",
    url: "https://hxafrica.com/",
    category: "Portfolio / Studio",
    role: "Frontend Engineer",

    problem:
        "The studio needed a premium digital presence with fast loading, consistent visual patterns and responsive layouts.",

    solution:
        "Built a reusable frontend system focused on performance, responsive design and consistent visual presentation.",

    contribution:
        "Created reusable design primitives, optimized rendering and implemented responsive layouts.",

    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
      "MongoDB",
      "Cloudinary",
      "Vercel",
    ],

    proofOfWork: [
      {
        metric: "<1s",
        label: "TTFB",
        description:
            "Achieved sub-second Time to First Byte globally.",
      },
      {
        metric: "Reusable",
        label: "Design Primitives",
        description:
            "Built reusable frontend primitives for consistent UI development.",
      },
      {
        metric: "0",
        label: "CLS",
        description:
            "Achieved a Cumulative Layout Shift score of 0.",
      },
    ],

    impact: [
      "Achieved sub-second global TTFB.",
      "Built reusable design primitives.",
      "Achieved 0 CLS.",
    ],

    caseStudy: {
      challenge:
          "Create a premium studio website that felt visually polished while maintaining excellent loading performance.",

      approach:
          "Focused on reusable UI primitives, optimized rendering and responsive layouts using Next.js and Tailwind CSS.",

      result:
          "Delivered a fast, stable and visually consistent studio experience with sub-second TTFB and 0 CLS.",
    },
  },

  {
    name: "Cloudnotte",
    url: "https://cloudnotte.com/",
    category: "EdTech SaaS",
    role: "Senior Frontend Engineer",

    problem:
        "The education platform needed to handle large datasets and student information without compromising interface responsiveness.",

    solution:
        "Built a scalable frontend architecture with optimized data grids, reusable components and efficient data fetching.",

    contribution:
        "Developed high-performance interfaces, optimized large data sets and improved screen rendering and interaction performance.",

    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],

    proofOfWork: [
      {
        metric: "20+",
        label: "Institutions",
        description:
            "Supported an education platform serving more than 200 institutions.",
      },
      {
        metric: "1K+",
        label: "Student Profiles",
        description:
            "Worked with a platform containing more than 80,000 active student profiles.",
      },
      {
        metric: "60%",
        label: "TTI Improvement",
        description:
            "Improved Time to Interactive by approximately 60%.",
      },
    ],

    impact: [
      "Supported 20+ institutions.",
      "Worked with 1K+ student profiles.",
      "Improved Time to Interactive by 60%.",
    ],

    caseStudy: {
      challenge:
          "Maintain a responsive education platform while handling large volumes of student and institutional data.",

      approach:
          "Optimized data-heavy interfaces using efficient rendering strategies, reusable components and improved client-side data handling.",

      result:
          "Improved application responsiveness and reduced Time to Interactive by approximately 60%.",
    },
  },

  {
    name: "Belhomz Properties",
    url: "https://belhomz.vercel.app/",
    category: "Real Estate",
    role: "Full Stack Engineer",

    problem:
        "The real estate platform needed an engaging property discovery experience with responsive media and efficient data delivery.",

    solution:
        "Built a mobile-first full-stack property experience with optimized media, reusable components and efficient database queries.",

    contribution:
        "Worked across the frontend and backend architecture, property presentation, responsive UI, media optimization and database querying.",

    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
      "MongoDB",
      "Cloudinary",
      "Vercel",
    ],

    proofOfWork: [
      {
        metric: "Full Stack",
        label: "Architecture",
        description:
            "Contributed across frontend, backend, API and data architecture.",
      },
      {
        metric: "Optimized",
        label: "Property Media",
        description:
            "Optimized video and property previews for a smoother browsing experience.",
      },
      {
        metric: "Mobile First",
        label: "Experience",
        description:
            "Designed the property discovery experience with mobile users as a primary consideration.",
      },
    ],

    impact: [
      "Delivered an end-to-end full-stack property platform.",
      "Optimized property videos and media previews.",
      "Built a responsive mobile-first experience.",
    ],

    caseStudy: {
      challenge:
          "Build a modern property platform that makes browsing listings simple while handling rich property media efficiently.",

      approach:
          "Used Next.js, React, TypeScript and MongoDB with optimized media delivery and efficient database queries.",

      result:
          "Delivered a responsive full-stack real estate experience optimized for property discovery across devices.",
    },
  },

  {
    name: "Truemark Global",
    url: "https://www.truemarkglobal.com/",
    category: "Corporate / Enterprise",
    role: "Full Stack Engineer",

    problem:
        "The business needed a modern digital platform capable of presenting its services while converting visitors into qualified B2B leads.",

    solution:
        "Built a full-stack responsive application with optimized content presentation, lead-generation flows and cloud-based media management.",

    contribution:
        "Handled frontend and backend development, responsive architecture, lead-generation functionality, media uploads and API integration.",

    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication & Authorization",
      "MongoDB",
      "Cloudinary",
      "Docker",
      "Vercel",
    ],

    proofOfWork: [
      {
        metric: "60%",
        label: "B2B Lead Conversion",
        description:
            "Improved B2B lead conversion by 60%.",
      },
      {
        metric: "Cloudinary",
        label: "Media Pipeline",
        description:
            "Implemented Cloudinary unsigned uploads for efficient media handling.",
      },
      {
        metric: "Full Stack",
        label: "Delivery",
        description:
            "Delivered the responsive application across frontend, backend and API layers.",
      },
    ],

    impact: [
      "Improved B2B lead conversion by 60%.",
      "Implemented Cloudinary media uploads.",
      "Delivered the application across the full stack.",
    ],

    caseStudy: {
      challenge:
          "Create a professional corporate platform that could communicate services clearly and generate more qualified business leads.",

      approach:
          "Built a responsive Next.js application with Node.js APIs, MongoDB, Cloudinary media handling and conversion-focused user flows.",

      result:
          "Delivered a full-stack corporate platform that improved B2B lead conversion by 60%.",
    },
  },
];
