export const RESUME_PDF_PATH = "/resume" as const;

export type PublicSectionName =
  | "Hero"
  | "Selected Work"
  | "Engineering Highlights"
  | "Technical Skills"
  | "Work Experience"
  | "Contact";

export type SourceId =
  | "resumePdf"
  | "githubProfile"
  | "linkedinProfile"
  | "email"
  | "letterboxdRepo"
  | "letterboxdLive"
  | "ausExportTrackerRepo"
  | "ausExportTrackerLive";

export type SourceReference = {
  id: SourceId;
  label: string;
  href: string;
};

export type Claim = {
  id: string;
  text: string;
  sourceIds: readonly SourceId[];
};

export type HeroContent = {
  section: "Hero";
  brand: Claim;
  role: Claim;
  location: string;
  availability: string;
  summary: Claim;
  signals: readonly Claim[];
};

export type ProjectLink = {
  label: string;
  href: string;
  sourceId: SourceId;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
};

export type ProjectEntry = {
  id: string;
  title: string;
  summary: Claim;
  whyItMatters: Claim;
  approach: readonly Claim[];
  highlights: readonly Claim[];
  links: readonly ProjectLink[];
  screenshot: ProjectScreenshot;
};

export type HighlightEntry = {
  id: string;
  title: string;
  description: Claim;
  keywords: readonly Claim[];
};

export type ExperienceEntry = {
  id: string;
  company: string;
  title: string;
  period: string;
  context: string;
  stack: readonly string[];
  summary: Claim;
  highlights: readonly Claim[];
};

export type SkillGroup = {
  id: string;
  label: string;
  caption: string;
  skills: readonly string[];
};

export type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  sourceIds: readonly SourceId[];
};

export type ContactLink = {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
  sourceId: SourceId;
};

export type ClaimSourceMatrixEntry = {
  claimId: string;
  section: PublicSectionName;
  text: string;
  sourceIds: readonly SourceId[];
};

const claim = (id: string, text: string, sourceIds: readonly SourceId[]): Claim => ({
  id,
  text,
  sourceIds,
});

export const sourceCatalog: Record<SourceId, SourceReference> = {
  resumePdf: {
    id: "resumePdf",
    label: "Resume PDF",
    href: RESUME_PDF_PATH,
  },
  githubProfile: {
    id: "githubProfile",
    label: "GitHub",
    href: "https://github.com/michaelbaker96",
  },
  linkedinProfile: {
    id: "linkedinProfile",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/michael-baker-tong-6a446a153/",
  },
  email: {
    id: "email",
    label: "Email",
    href: "mailto:bakermichael96@gmail.com",
  },
  letterboxdRepo: {
    id: "letterboxdRepo",
    label: "Letterboxd Trivia Battle repository",
    href: "https://github.com/michaelbaker96/letterboxd-trivia-battle",
  },
  letterboxdLive: {
    id: "letterboxdLive",
    label: "Letterboxd Trivia Battle live app",
    href: "https://letterboxd-trivia-battle.vercel.app/",
  },
  ausExportTrackerRepo: {
    id: "ausExportTrackerRepo",
    label: "Aus Export Tracker repository",
    href: "https://github.com/michaelbaker96/aus-export-tracker",
  },
  ausExportTrackerLive: {
    id: "ausExportTrackerLive",
    label: "Aus Export Tracker live app",
    href: "https://aus-export-tracker.vercel.app",
  },
};

export const hero: HeroContent = {
  section: "Hero",
  brand: claim("hero.brand", "Michael Baker-Tong", ["resumePdf", "linkedinProfile"]),
  role: claim("hero.role", "Senior Software Engineer", ["resumePdf", "linkedinProfile"]),
  location: "Sydney, Australia — open to remote",
  availability: "Open to senior and staff engineering roles",
  summary: claim(
    "hero.summary",
    "I'm a Senior Software Engineer, and most of my work sits around scalable cloud architecture, distributed systems, AI-powered data platforms, and end-to-end delivery.",
    ["resumePdf"]
  ),
  signals: [
    claim("hero.signals.cloud", "Scalable cloud architecture", ["resumePdf"]),
    claim("hero.signals.distributed", "Distributed systems", ["resumePdf"]),
    claim("hero.signals.ai-data", "AI-enabled data platforms", ["resumePdf"]),
    claim("hero.signals.full-stack", "Full-stack delivery", ["resumePdf"]),
  ],
};

export const selectedWork: readonly ProjectEntry[] = [
  {
    id: "letterboxd-trivia-battle",
    title: "Letterboxd Trivia Battle",
    summary: claim(
      "selected-work.letterboxd.summary",
      "I built this multiplayer film-trivia experience around Letterboxd history uploads.",
      ["letterboxdRepo", "letterboxdLive"]
    ),
    whyItMatters: claim(
      "selected-work.letterboxd.why-it-matters",
      "I wanted a Letterboxd export to feel fun straight away, so I turned it into a fast create-or-join room flow with AI-host banter and live score reveals.",
      ["letterboxdRepo", "letterboxdLive"]
    ),
    approach: [
      claim(
        "selected-work.letterboxd.approach.nextjs",
        "Next.js App Router",
        ["letterboxdRepo"]
      ),
      claim(
        "selected-work.letterboxd.approach.lobby",
        "Create / join lobby flow",
        ["letterboxdRepo"]
      ),
      claim(
        "selected-work.letterboxd.approach.ai-scoring",
        "AI-host framing with real-time scoring cues",
        ["letterboxdRepo"]
      ),
    ],
    highlights: [
      claim(
        "selected-work.letterboxd.fast-lobby",
        "I built the lobby flow to feel quick whether you're creating a room or jumping into one.",
        ["letterboxdRepo"]
      ),
      claim(
        "selected-work.letterboxd.real-time-scoring",
        "I added real-time scoring to the gameplay loop.",
        ["letterboxdRepo", "letterboxdLive"]
      ),
      claim(
        "selected-work.letterboxd.ai-host",
        "I framed the experience around a sassy AI host persona.",
        ["letterboxdRepo", "letterboxdLive"]
      ),
    ],
    links: [
      {
        label: "GitHub",
        href: sourceCatalog.letterboxdRepo.href,
        sourceId: "letterboxdRepo",
      },
      {
        label: "Live",
        href: sourceCatalog.letterboxdLive.href,
        sourceId: "letterboxdLive",
      },
    ],
    screenshot: {
      src: "/letterboxd-trivia-battle.png",
      alt: "Letterboxd Trivia Battle landing page screenshot",
    },
  },
  {
    id: "aus-export-tracker",
    title: "Aus Export Tracker",
    summary: claim(
      "selected-work.aus-export.summary",
      "I built this interactive map to make Australia's natural resource export flows easier to explore.",
      ["ausExportTrackerRepo", "ausExportTrackerLive"]
    ),
    whyItMatters: claim(
      "selected-work.aus-export.why-it-matters",
      "I paired route, destination, and year filters with a public map interface so people can scan Australian export flows without digging through spreadsheets first.",
      ["ausExportTrackerRepo", "ausExportTrackerLive"]
    ),
    approach: [
      claim(
        "selected-work.aus-export.approach.nextjs",
        "Next.js App Router",
        ["ausExportTrackerRepo"]
      ),
      claim(
        "selected-work.aus-export.approach.mapping",
        "Deck.gl + Mapbox GL JS",
        ["ausExportTrackerRepo"]
      ),
      claim(
        "selected-work.aus-export.approach.data",
        "Static data refresh scripts",
        ["ausExportTrackerRepo"]
      ),
    ],
    highlights: [
      claim(
        "selected-work.aus-export.github",
        "I published the source code in a public GitHub repository.",
        ["ausExportTrackerRepo"]
      ),
      claim(
        "selected-work.aus-export.live",
        "I shipped a live public deployment on Vercel.",
        ["ausExportTrackerLive"]
      ),
    ],
    links: [
      {
        label: "GitHub",
        href: sourceCatalog.ausExportTrackerRepo.href,
        sourceId: "ausExportTrackerRepo",
      },
      {
        label: "Live",
        href: sourceCatalog.ausExportTrackerLive.href,
        sourceId: "ausExportTrackerLive",
      },
    ],
    screenshot: {
      src: "/aus-export-tracker.png",
      alt: "Aus Export Tracker landing page screenshot",
    },
  },
] as const;

export const engineeringHighlights: readonly HighlightEntry[] = [
  {
    id: "highlights.cloud-distributed-systems",
    title: "Cloud & Distributed Systems",
  description: claim(
      "highlights.cloud-distributed-systems.description",
      "I spend a lot of my time designing scalable cloud architectures, distributed systems, and event-driven microservices for enterprise platforms.",
      ["resumePdf"]
    ),
    keywords: [
      claim("highlights.cloud-distributed-systems.keyword.cloud", "AWS serverless architecture", [
        "resumePdf",
      ]),
      claim("highlights.cloud-distributed-systems.keyword.distributed", "Distributed systems design", [
        "resumePdf",
      ]),
      claim(
        "highlights.cloud-distributed-systems.keyword.microservices",
        "Event-driven microservices",
        ["resumePdf"]
      ),
      claim("highlights.cloud-distributed-systems.keyword.pipelines", "High-volume data pipelines", ["resumePdf"]),
    ],
  },
  {
    id: "highlights.data-ai-platforms",
    title: "Data & AI Platforms",
  description: claim(
      "highlights.data-ai-platforms.description",
      "I build AI-powered data platforms, especially where ingestion, validation, and transformation workflows need to be reliable at scale.",
      ["resumePdf"]
    ),
    keywords: [
      claim("highlights.data-ai-platforms.keyword.ai-data", "AI-enabled data platforms", [
        "resumePdf",
      ]),
      claim(
        "highlights.data-ai-platforms.keyword.ingestion",
        "Ingestion & validation pipelines",
        ["resumePdf"]
      ),
      claim(
        "highlights.data-ai-platforms.keyword.validation",
        "LLM-powered product features",
        ["resumePdf"]
      ),
      claim(
        "highlights.data-ai-platforms.keyword.structured-datasets",
        "Structured datasets at scale",
        ["resumePdf"]
      ),
    ],
  },
  {
    id: "highlights.full-stack-product-delivery",
    title: "Full-Stack Product Delivery",
    description: claim(
      "highlights.full-stack-product-delivery.description",
      "I like working across the full stack, from backend and frontend through to infrastructure and public-facing web interfaces.",
      ["resumePdf"]
    ),
    keywords: [
      claim("highlights.full-stack-product-delivery.keyword.full-stack", "TypeScript across the stack", [
        "resumePdf",
      ]),
      claim(
        "highlights.full-stack-product-delivery.keyword.backend",
        "Node.js backend services",
        ["resumePdf"]
      ),
      claim(
        "highlights.full-stack-product-delivery.keyword.frontend",
        "React & Next.js",
        ["resumePdf"]
      ),
      claim(
        "highlights.full-stack-product-delivery.keyword.infrastructure",
        "Infrastructure as Code",
        ["resumePdf"]
      ),
    ],
  },
  {
    id: "highlights.reliability-observability",
    title: "Reliability & Observability",
  description: claim(
      "highlights.reliability-observability.description",
      "I usually improve reliability and performance by tightening up monitoring, tracing, logging, schema validation, and typing along the way.",
      ["resumePdf"]
    ),
    keywords: [
      claim(
        "highlights.reliability-observability.keyword.monitoring",
        "Monitoring & alerting",
        ["resumePdf"]
      ),
      claim(
        "highlights.reliability-observability.keyword.tracing",
        "Distributed tracing",
        ["resumePdf"]
      ),
      claim(
        "highlights.reliability-observability.keyword.logging",
        "Structured logging",
        ["resumePdf"]
      ),
      claim(
        "highlights.reliability-observability.keyword.schema-validation",
        "Schema & type safety",
        ["resumePdf"]
      ),
    ],
  },
  {
    id: "highlights.discovery-leadership",
    title: "Technical Discovery & Cross-Functional Leadership",
  description: claim(
      "highlights.discovery-leadership.description",
      "I work closely across functions during discovery and delivery, especially when API and transformation workflows need to stay clear through a lot of complexity.",
      ["resumePdf"]
    ),
    keywords: [
      claim(
        "highlights.discovery-leadership.keyword.discovery",
        "Cross-functional discovery",
        ["resumePdf"]
      ),
      claim(
        "highlights.discovery-leadership.keyword.delivery",
        "Cross-functional delivery",
        ["resumePdf"]
      ),
      claim(
        "highlights.discovery-leadership.keyword.api-ecosystems",
        "API ecosystem design",
        ["resumePdf"]
      ),
      claim(
        "highlights.discovery-leadership.keyword.transformation-workflows",
        "Mentoring & delivery leadership",
        ["resumePdf"]
      ),
    ],
  },
] as const;

export const workExperience: readonly ExperienceEntry[] = [
  {
    id: "experience-faethm-by-pearson",
    company: "Faethm by Pearson",
    title: "Senior Software Engineer",
    period: "2022–2026",
    context:
      "Faethm is Pearson's AI-powered workforce analytics platform, modelling how automation and emerging technology reshape jobs and skills for global enterprise and government clients.",
    stack: [
      "TypeScript",
      "Node.js",
      "AWS Lambda",
      "Amazon SQS",
      "DynamoDB",
      "Amazon S3",
      "Event-driven microservices",
      "JSON Schema",
      "OpenTelemetry",
      "CloudWatch",
    ],
    summary: claim(
      "experience.faethm.summary",
      "At Faethm, I led the design and delivery of enterprise data ingestion and processing systems for high-volume structured datasets.",
      ["resumePdf"]
    ),
    highlights: [
      claim(
        "experience.faethm.microservices",
        "I architected and maintained event-driven microservices using Node.js, TypeScript, and AWS-based infrastructure.",
        ["resumePdf"]
      ),
      claim(
        "experience.faethm.validation",
        "I built validation and transformation pipelines and tightened up the schema validation and typing strategy around them.",
        ["resumePdf"]
      ),
      claim(
        "experience.faethm.observability",
        "I improved observability and performance through monitoring, tracing, and logging practices.",
        ["resumePdf"]
      ),
    ],
  },
  {
    id: "experience-commonwealth-bank",
    company: "Commonwealth Bank",
    title: "Software Engineer",
    period: "2021",
    context:
      "Commonwealth Bank is Australia's largest bank, where engineering work runs under strict regulatory, security, and data-governance controls.",
    stack: [
      "Java",
      "Spring Boot",
      "TypeScript",
      "REST APIs",
      "PostgreSQL",
      "Secure data handling",
      "CI/CD",
    ],
    summary: claim(
      "experience.cba.summary",
      "At Commonwealth Bank, I developed secure backend services and financial data processing applications in a regulated environment.",
      ["resumePdf"]
    ),
    highlights: [
      claim(
        "experience.cba.backend-services",
        "I built secure backend services for financial data processing workflows in a regulated environment.",
        ["resumePdf"]
      ),
      claim(
        "experience.cba.apis",
        "I contributed to internal API ecosystems supporting transaction and transformation workflows.",
        ["resumePdf"]
      ),
    ],
  },
  {
    id: "experience-energy-action",
    company: "Energy Action",
    title: "Software Engineer",
    period: "2020–2021",
    context:
      "Energy Action is an ASX-listed energy procurement and management business, where I owned an invoice analytics platform end to end across backend, frontend, and infrastructure.",
    stack: [
      "Node.js",
      "TypeScript",
      "React",
      "AWS",
      "PostgreSQL",
      "CI/CD pipelines",
      "AI-assisted document classification",
    ],
    summary: claim(
      "experience.energy-action.summary",
      "At Energy Action, I architected a web-based invoice management and analytics platform across backend, frontend, and infrastructure.",
      ["resumePdf"]
    ),
    highlights: [
      claim(
        "experience.energy-action.cloud",
        "I managed cloud-hosted infrastructure and internal deployment pipelines.",
        ["resumePdf"]
      ),
      claim(
        "experience.energy-action.ai",
        "I implemented AI-assisted document processing and classification solutions.",
        ["resumePdf"]
      ),
    ],
  },
  {
    id: "experience-pooled-energy",
    company: "Pooled Energy",
    title: "Software Engineer",
    period: "2018–2020",
    context:
      "Pooled Energy delivers intelligent residential pool water and energy management, combining IoT control hardware with a cloud platform.",
    stack: [
      "Node.js",
      "RESTful APIs",
      "Distributed control systems",
      "Residential IoT",
      "Data extraction & templating",
      "Linux",
    ],
    summary: claim(
      "experience.pooled-energy.summary",
      "At Pooled Energy, I designed and developed RESTful APIs and integration systems that spanned backend services, infrastructure, and IoT-adjacent environments.",
      ["resumePdf"]
    ),
    highlights: [
      claim(
        "experience.pooled-energy.control-systems",
        "I built distributed control systems interacting with residential IoT-adjacent environments.",
        ["resumePdf"]
      ),
      claim(
        "experience.pooled-energy.financial-tools",
        "I developed financial data extraction and templating tools to improve operational efficiency.",
        ["resumePdf"]
      ),
    ],
  },
] as const;

export const education: readonly EducationEntry[] = [
  {
    id: "education-macquarie-university",
    degree: "Bachelor of Information Technology (Software Technology)",
    institution: "Macquarie University",
    period: "2014–2017",
    sourceIds: ["resumePdf"],
  },
] as const;

export const technicalSkills: readonly SkillGroup[] = [
  {
    id: "skills.languages",
    label: "Languages",
    caption: "Primary day-to-day languages across services and tooling.",
    skills: ["TypeScript", "JavaScript (ES2023)", "Node.js", "Java", "Python", "SQL", "Bash"],
  },
  {
    id: "skills.backend",
    label: "Backend & APIs",
    caption: "Service design for high-volume, event-driven data systems.",
    skills: [
      "Event-driven microservices",
      "REST API design",
      "Spring Boot",
      "Express / Fastify",
      "Message queues (SQS, SNS)",
      "JSON Schema validation",
      "Domain modelling",
    ],
  },
  {
    id: "skills.cloud",
    label: "Cloud & Infrastructure",
    caption: "Designing and operating AWS-based platforms in production.",
    skills: [
      "AWS (Lambda, S3, SQS, DynamoDB, ECS)",
      "Infrastructure as Code",
      "CI/CD pipelines",
      "Docker",
      "Serverless architecture",
      "Vercel",
      "Linux",
    ],
  },
  {
    id: "skills.data-ai",
    label: "Data & AI",
    caption: "Reliable ingestion, validation, and AI-assisted processing at scale.",
    skills: [
      "Data ingestion pipelines",
      "ETL & transformation workflows",
      "Structured dataset modelling",
      "AI-assisted document classification",
      "LLM-powered product features",
      "PostgreSQL & DynamoDB",
    ],
  },
  {
    id: "skills.frontend",
    label: "Frontend",
    caption: "Production web interfaces and data-rich visualisations.",
    skills: [
      "React",
      "Next.js (App Router)",
      "TypeScript UI",
      "Tailwind CSS",
      "Deck.gl / Mapbox GL",
      "Accessible, responsive UI",
    ],
  },
  {
    id: "skills.practices",
    label: "Reliability & Practices",
    caption: "How I keep complex systems observable and dependable.",
    skills: [
      "Observability (tracing, metrics, structured logging)",
      "OpenTelemetry / CloudWatch",
      "Automated testing (Vitest, Playwright)",
      "Schema & type safety",
      "Cross-functional technical discovery",
      "Agile delivery",
    ],
  },
] as const;

export const contact: {
  section: "Contact";
  links: readonly ContactLink[];
} = {
  section: "Contact",
  links: [
    {
      id: "github",
      label: "GitHub",
      href: sourceCatalog.githubProfile.href,
      sourceId: "githubProfile",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: sourceCatalog.linkedinProfile.href,
      sourceId: "linkedinProfile",
    },
    {
      id: "email",
      label: "Email",
      href: sourceCatalog.email.href,
      sourceId: "email",
    },
  ],
} as const;

export const portfolioContent = {
  hero,
  selectedWork,
  engineeringHighlights,
  technicalSkills,
  workExperience,
  education,
  contact,
} as const;

const publicClaimEntries = [
  { section: "Hero" as const, claim: hero.brand },
  { section: "Hero" as const, claim: hero.role },
  { section: "Hero" as const, claim: hero.summary },
  ...hero.signals.map((signal) => ({ section: "Hero" as const, claim: signal })),
  ...selectedWork.flatMap((project) => [
    { section: "Selected Work" as const, claim: project.summary },
    { section: "Selected Work" as const, claim: project.whyItMatters },
    ...project.approach.map((item) => ({ section: "Selected Work" as const, claim: item })),
    ...project.highlights.map((item) => ({ section: "Selected Work" as const, claim: item })),
  ]),
  ...engineeringHighlights.map((item) => ({
    section: "Engineering Highlights" as const,
    claim: item.description,
  })),
  ...engineeringHighlights.flatMap((item) =>
    item.keywords.map((keyword) => ({
      section: "Engineering Highlights" as const,
      claim: keyword,
    }))
  ),
  ...workExperience.flatMap((role) => [
    { section: "Work Experience" as const, claim: role.summary },
    ...role.highlights.map((item) => ({ section: "Work Experience" as const, claim: item })),
  ]),
] as const;

export const claimSourceMatrix: readonly ClaimSourceMatrixEntry[] = publicClaimEntries.map(
  ({ section, claim }) => ({
    claimId: claim.id,
    section,
    text: claim.text,
    sourceIds: claim.sourceIds,
  })
);
