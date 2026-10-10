export type Entry = {
    title: string; // job title, degree or project name
    org: string; // company, school or tech used
    location: string;
    dates: string;
    bullets: string; // one bullet per line
};

export type CvData = {
    name: string;
    headline: string;
    contact: string; // single line: email | phone | city | links
    authorization: string; // optional work-authorization line, written by the user
    summary: string;
    skills: string; // one group per line, e.g. "Languages: JavaScript, TypeScript"
    experience: Entry[];
    projects: Entry[];
    education: Entry[];
    languages: string; // spoken languages, one per line, e.g. "German: B2"
    certifications: string; // one per line
    additional: string;
    educationFirst: boolean; // students and recent graduates usually lead with education
};

export type EntrySection = "experience" | "projects" | "education";
export type TemplateId = "standard" | "classic" | "modern" | "compact";
export type EntryLayout = "title-first" | "org-first";

export const TEMPLATES: {
    id: TemplateId;
    name: string;
    description: string;
    docxFont: string;
    docxSize: number; // half-points
    nameSize: number; // half-points
    accent: string;
    layout: EntryLayout;
    centered: boolean;
}[] = [
    {
        id: "standard",
        name: "Standard one-page",
        description:
            "Company and location on the first line, role and dates on the second. The widely shared one-page ATS layout.",
        docxFont: "Times New Roman",
        docxSize: 21,
        nameSize: 38,
        accent: "#111111",
        layout: "org-first",
        centered: true,
    },
    {
        id: "classic",
        name: "Classic",
        description: "Serif type with a centered header. Traditional and safe for any industry.",
        docxFont: "Times New Roman",
        docxSize: 22,
        nameSize: 44,
        accent: "#111111",
        layout: "title-first",
        centered: true,
    },
    {
        id: "modern",
        name: "Modern",
        description: "Clean sans-serif with green section rules. Good for tech and startups.",
        docxFont: "Calibri",
        docxSize: 22,
        nameSize: 44,
        accent: "#0f5c4d",
        layout: "title-first",
        centered: false,
    },
    {
        id: "compact",
        name: "Compact",
        description: "Smaller type and tighter spacing. Fits long careers onto two pages.",
        docxFont: "Arial",
        docxSize: 19,
        nameSize: 36,
        accent: "#444444",
        layout: "title-first",
        centered: false,
    },
];

export const emptyEntry = (): Entry => ({
    title: "",
    org: "",
    location: "",
    dates: "",
    bullets: "",
});

export const EMPTY_CV: CvData = {
    name: "",
    headline: "",
    contact: "",
    authorization: "",
    summary: "",
    skills: "",
    experience: [],
    projects: [],
    education: [],
    languages: "",
    certifications: "",
    additional: "",
    educationFirst: false,
};

export const SAMPLE_CV: CvData = {
    name: "Your Name",
    headline: "Software Engineer",
    contact: "you@email.com | +000 000 000 0000 | City, Country | linkedin.com/in/you",
    authorization: "",
    summary:
        "Software engineer with 5+ years of experience building web applications with React, Next.js and Node.js. Replace this with two or three sentences about your strongest skills and the kind of role you want.",
    skills:
        "Languages: JavaScript, TypeScript\nFrameworks: React, Next.js, Node.js, Express\nDatabases: PostgreSQL, MongoDB\nTools: Git, Docker, CI/CD",
    experience: [
        {
            title: "Software Engineer",
            org: "Company Name",
            location: "City, Country",
            dates: "Jan 2022 - Present",
            bullets:
                "Built and shipped customer-facing features using React and TypeScript.\nImproved page load time by reducing bundle size and optimizing data fetching.\nReviewed code and mentored junior engineers.",
        },
    ],
    projects: [],
    education: [
        {
            title: "BSc Computer Science",
            org: "University Name",
            location: "City, Country",
            dates: "2016 - 2020",
            bullets: "",
        },
    ],
    languages: "",
    certifications: "",
    additional: "",
    educationFirst: false,
};

export type SectionKey =
    | "summary"
    | "skills"
    | "experience"
    | "projects"
    | "education"
    | "languages"
    | "certifications"
    | "additional";

/** Order the sections appear in. Students and new graduates lead with education. */
export function sectionOrder(d: CvData): SectionKey[] {
    return d.educationFirst
        ? ["summary", "education", "skills", "experience", "projects", "languages", "certifications", "additional"]
        : ["summary", "skills", "experience", "projects", "education", "languages", "certifications", "additional"];
}

/** Split multi-line text into clean lines, removing any leading bullet markers. */
export const splitLines = (text: string) =>
    text
        .split("\n")
        .map((l) => l.replace(/^\s*[-•*]\s*/, "").trim())
        .filter(Boolean);