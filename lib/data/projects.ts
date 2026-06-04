export const projectsData = [
  {
    id: 'jamasoft-components',
    name: 'Product Component Library',
    company: 'Jamasoft Concept',
    problem:
      'Multiple SaaS products (VideoHQ.ai, JamaKit.ai, OgoSMS) had inconsistent UI and required constant component rebuilding across teams.',
    solution:
      'Built a shared component library with TypeScript definitions, Storybook documentation, and automated testing to ensure consistency.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Jest'],
    outcomes: [
      { metric: 'Reduced development time', value: '40% faster feature delivery' },
      { metric: 'Component reusability', value: '200+ components shared' },
      { metric: 'Code consistency', value: '100% adoption across products' },
    ],
    liveUrl: 'https://www.jamaconcept.com/',
    role: 'Lead Frontend Engineer',
    impact:
      'Enabled 5 product teams to ship features 40% faster while maintaining design consistency across the entire product suite.',
  },
  {
    id: 'theragist-realtime',
    name: 'Real-time Counseling Platform',
    company: 'Theragist',
    problem:
      'Users needed instant access to mental health support with real-time messaging, but existing platforms had delayed responses (5+ minutes).',
    solution:
      'Built real-time messaging system using WebSockets with Redis pub/sub, coupled with intelligent therapist matching algorithm.',
    techStack: ['React', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL', 'Express'],
    outcomes: [
      { metric: 'Response time', value: '30 seconds average' },
      { metric: 'User retention', value: '90% 30-day retention' },
      { metric: 'Satisfaction', value: '4.5/5 star rating' },
    ],
    liveUrl: 'https://www.theragist.com/',
    role: 'Full Stack Engineer',
    impact:
      'Achieved 30-second average response times enabling real-time mental health support, resulting in 90% user retention.',
  },
  {
    id: 'cinstance-ai-support',
    name: 'AI-Powered Customer Support Module',
    company: 'Cinstance',
    problem:
      'B2B clients needed intelligent customer support routing but manual triage was error-prone and slow, affecting resolution times.',
    solution:
      'Implemented ML-powered support ticket classification with intelligent agent routing, reducing triage time from 30 minutes to 2 minutes.',
    techStack: ['React', 'Node.js', 'TensorFlow.js', 'Socket.io', 'MongoDB'],
    outcomes: [
      { metric: 'Triage speed', value: '93% faster (30m → 2m)' },
      { metric: 'Resolution rate', value: '97% customer satisfaction' },
      { metric: 'Cost reduction', value: '45% cloud infrastructure savings' },
    ],
    liveUrl: 'https://cinstance.com',
    role: 'Frontend Engineer',
    impact:
      'Deployed AI-powered support system serving 500+ enterprise clients, reducing support costs by 45% while improving satisfaction to 97%.',
  },
  {
    id: 'dominion-city-video-gallery',
    name: 'Multi-Stream Video Academy Platform',
    company: 'Dominion City Abuja',
    problem:
      'Church needed platform for live multi-stream ministry broadcasts and archived content, but had no way to manage global audience access.',
    solution:
      'Built responsive video platform with HLS streaming, adaptive bitrate, and content management system for 50+ ministry streams.',
    techStack: ['Next.js', 'React', 'HLS.js', 'Tailwind CSS', 'Node.js', 'FFmpeg'],
    outcomes: [
      { metric: 'Monthly viewers', value: '5000+ global visitors' },
      { metric: 'Uptime', value: '99.9% availability' },
      { metric: 'Video quality', value: 'Adaptive 1080p streaming' },
    ],
    liveUrl: 'https://dominioncityabuja.com/',
    role: 'Web Developer',
    impact:
      'Enabled church to broadcast ministry content to 5000+ monthly global viewers with professional streaming quality.',
  },
  {
    id: 'vant-fintech-wallet',
    name: 'Multi-Currency Financial Wallet',
    company: 'Vant Inc',
    problem:
      'African SMEs needed multi-currency payment solutions but existing options had high fees, slow payouts, and poor UX.',
    solution:
      'Built fintech platform with real-time USD/NGN wallet, invoicing system, bulk payouts, and integrated payment processing.',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'Flutterwave'],
    outcomes: [
      { metric: 'Active users', value: '4000+ businesses' },
      { metric: 'Transaction success', value: '99.9% reliability' },
      { metric: 'Payment volume', value: '$50M+ annually processed' },
    ],
    liveUrl: 'https://vantapp.com/',
    role: 'Full Stack Engineer',
    impact:
      'Processed $50M+ in annual transactions for 4000+ African businesses, enabling financial inclusion with reliable payment infrastructure.',
  },
  {
    id: 'deeptech-enterprise-solutions',
    name: 'Enterprise Cloud Integration Platform',
    company: 'Deep Technology&apos;s Limited',
    problem:
      'Fortune 200 companies needed seamless cloud migration but faced technical debt, legacy system incompatibilities, and downtime risks.',
    solution:
      'Architected microservices-based integration platform with automated testing, CI/CD pipelines, and zero-downtime migration strategies.',
    techStack: ['React', 'Node.js', 'Kubernetes', 'Docker', 'AWS', 'Jenkins', 'TypeScript'],
    outcomes: [
      { metric: 'Projects delivered', value: '200+ enterprise migrations' },
      { metric: 'Success rate', value: '99% on-time delivery' },
      { metric: 'Downtime eliminated', value: 'Zero-downtime migrations' },
    ],
    liveUrl: 'https://www.verydeeptech.com',
    role: 'Full Stack Engineer',
    impact:
      'Delivered 200+ enterprise cloud migration projects for Fortune 200 companies with 99% success rate and zero downtime.',
  },
  {
    id: 'colycia-ecommerce',
    name: 'Luxury Fashion E-commerce Platform',
    company: 'Colycia Couture',
    problem:
      'Fashion brand needed e-commerce platform with size management and bespoke customization options for global luxury market.',
    solution:
      'Built Next.js e-commerce with advanced product filtering, size management, bespoke customization UI, and global shipping integration.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Stripe', 'Node.js', 'MongoDB'],
    outcomes: [
      { metric: 'Products listed', value: '1000+ premium items' },
      { metric: 'Conversion rate', value: '95% mobile optimization' },
      { metric: 'Global reach', value: 'Shipping to 40+ countries' },
    ],
    liveUrl: 'https://colyciacouture.com/',
    role: 'Full Stack Engineer',
    impact:
      'Launched luxury fashion platform serving global customers with optimized mobile experience and professional shipping infrastructure.',
  },
  {
    id: 'hxafrica-component-library',
    name: 'React Component System',
    company: 'HxAfrica',
    problem:
      'Tech company needed scalable, well-tested component system to accelerate product development across multiple teams.',
    solution:
      'Built comprehensive React component library with TypeScript, unit tests (Jest), and comprehensive documentation.',
    techStack: ['React', 'TypeScript', 'Jest', 'React Testing Library'],
    outcomes: [
      { metric: 'Components built', value: '20+ reusable components' },
      { metric: 'Test coverage', value: '100% coverage maintained' },
      { metric: 'Development speed', value: '50% faster feature delivery' },
    ],
    liveUrl: 'https://hxafrica.com/',
    role: 'Frontend Engineer',
    impact:
      'Delivered tested React component system enabling teams to build features 50% faster with high code quality.',
  },
  {
    id: 'cloudnotte-lms',
    name: 'Comprehensive School Management LMS',
    company: 'Cloudnotte',
    problem:
      'African schools needed all-in-one platform for class management, attendance, grading, and live classes but faced integration complexity.',
    solution:
      'Built full-featured LMS with live classrooms using WebRTC, computer-based testing system, progress analytics, and payment processing.',
    techStack: ['Next.js', 'React', 'Node.js', 'WebRTC', 'PostgreSQL', 'Redis', 'Socket.io'],
    outcomes: [
      { metric: 'Students served', value: '10000+ active learners' },
      { metric: 'Schools using', value: '500+ educational institutions' },
      { metric: 'System uptime', value: '99.8% availability' },
    ],
    liveUrl: 'https://cloudnotte.com/',
    role: 'Full Stack Engineer',
    impact:
      'Powered 500+ African schools to digitally manage education for 10000+ students with live classes and automated grading.',
  },
  {
    id: 'truemark-iso-certification',
    name: 'ISO Compliance & Digital Certification Platform',
    company: 'Truemark Global Standards',
    problem:
      'Organizations needed streamlined ISO certification and compliance tracking but faced manual paperwork, lost audits, and verification issues.',
    solution:
      'Built digital certification platform with QR-code verification, automated audit management, document workflows, and secure storage.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS S3'],
    outcomes: [
      { metric: 'Organizations certified', value: '100+ companies' },
      { metric: 'Certificates issued', value: '5000+ digital certs' },
      { metric: 'Availability', value: '99.5% uptime' },
    ],
    liveUrl: 'https://truemark-iso.vercel.app/',
    role: 'Full Stack Developer',
    impact:
      'Digitized ISO certification for 100+ organizations, issuing 5000+ verifiable digital certificates with 99.5% uptime.',
  },
];
