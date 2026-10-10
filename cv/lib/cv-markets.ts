import type { CvData, TemplateId } from "./cv-types";
import { splitLines } from "./cv-types";

export type MarketId = "us" | "uk" | "de" | "eu";

export const PAPER = {
    a4: { w: 794, h: 1123, css: "A4", twipsW: 11906, twipsH: 16838 },
    letter: { w: 816, h: 1056, css: "Letter", twipsW: 12240, twipsH: 15840 },
} as const;
export type Paper = keyof typeof PAPER;

export type Market = {
    id: MarketId;
    label: string;
    docName: string; // what employers call the document
    paper: Paper;
    maxPages: number; // recommended maximum
    defaultTemplate: TemplateId;
    needsLanguages: boolean; // employers expect spoken languages with CEFR levels
    stripPersonal: boolean; // date of birth, marital status etc. should not appear
    tips: string[];
    resources: { label: string; url: string }[];
};

export const MARKETS: Market[] = [
    {
        id: "us",
        label: "USA",
        docName: "Resume",
        paper: "letter",
        maxPages: 1,
        defaultTemplate: "standard",
        needsLanguages: false,
        stripPersonal: true,
        tips: [
            "Aim for one page. Use two only with about 10 or more years of relevant experience.",
            "Leave out your photo, date of birth, age, marital status and a references line. US employers don't expect them.",
            "Use American spelling and dates like Jan 2022 - Present.",
            "Students and recent graduates usually put Education first. Everyone else leads with Experience.",
            "Every bullet should start with an action verb and, where true, include a number: a percentage, a count or time saved.",
            "If you need visa sponsorship, you can state your status in one plain line. Many applications also ask directly.",
        ],
        resources: [
            { label: "USCIS: working in the US", url: "https://www.uscis.gov/working-in-the-united-states" },
            {
                label: "US Dept. of Labor: employer visa filing data",
                url: "https://www.dol.gov/agencies/eta/foreign-labor/performance",
            },
        ],
    },
    {
        id: "uk",
        label: "UK",
        docName: "CV",
        paper: "a4",
        maxPages: 2,
        defaultTemplate: "classic",
        needsLanguages: false,
        stripPersonal: true,
        tips: [
            "Two pages is the norm. One page is fine early in your career.",
            "Start with a short personal statement of three or four lines. This is the Summary section.",
            "Leave out your photo, date of birth, marital status and gender.",
            "Use British spelling, but copy the exact spelling of keywords from the job advert.",
            "If you need sponsorship, only employers on the Home Office list of licensed sponsors can offer it. Check the employer before you apply.",
            "A line stating your right to work is optional but saves recruiters a question.",
        ],
        resources: [
            {
                label: "Register of licensed sponsors (workers)",
                url: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers",
            },
            { label: "Skilled Worker visa", url: "https://www.gov.uk/skilled-worker-visa" },
        ],
    },
    {
        id: "de",
        label: "Germany",
        docName: "CV (Lebenslauf)",
        paper: "a4",
        maxPages: 2,
        defaultTemplate: "classic",
        needsLanguages: true,
        stripPersonal: false,
        tips: [
            "Keep it reverse-chronological and no longer than two pages. German employers notice unexplained gaps, so account for every period.",
            "Use month-level dates such as 03/2022 - 08/2024.",
            "Add a Languages section with CEFR levels, for example German B2 and English C1. Your German level matters a lot.",
            "A photo is common in Germany but optional. This builder leaves it out because it can confuse ATS parsing. Add one in the Word file only if the employer expects it.",
            "Many employers also expect a separate cover letter (Anschreiben) and copies of degrees and references as attachments.",
            "If the job advert is in German, applying in German is usually expected. The builder works in English only.",
        ],
        resources: [
            { label: "Make it in Germany (official portal)", url: "https://www.make-it-in-germany.com/en/" },
        ],
    },
    {
        id: "eu",
        label: "Europe",
        docName: "CV",
        paper: "a4",
        maxPages: 2,
        defaultTemplate: "modern",
        needsLanguages: true,
        stripPersonal: false,
        tips: [
            "Two pages maximum, reverse-chronological, with month-level dates such as 03/2022 - 08/2024.",
            "List your languages with CEFR levels (A1 to C2). Employers across Europe use this scale.",
            "Norms for photos, date of birth and nationality differ by country. They are common in some countries and discouraged in others, so check the country you are applying to.",
            "An English CV is fine for international companies. Local companies often expect the local language.",
            "If you need a work permit, state your status in one plain line so recruiters know where you stand.",
            "Europass is accepted in many countries, but a clean standard CV works as well.",
        ],
        resources: [
            { label: "EURES: European job portal", url: "https://eures.europa.eu" },
            { label: "Europass", url: "https://europass.europa.eu" },
        ],
    },
];

export const getMarket = (id: MarketId) => MARKETS.find((m) => m.id === id) ?? MARKETS[0];

export type Check = { level: "warn" | "ok"; text: string };

/** Live checks shown beside the preview. They are simple heuristics, not guarantees. */
export function runChecks(data: CvData, market: Market, pages: number): Check[] {
    const out: Check[] = [];
    const rounded = Math.max(0.1, Math.round(pages * 10) / 10);

    if (pages > market.maxPages + 0.1) {
        out.push({
            level: "warn",
            text: `About ${rounded} pages. ${market.label} employers expect ${market.maxPages} or fewer. Cut older roles or shorten bullets.`,
        });
    } else {
        out.push({ level: "ok", text: `Length is within range for ${market.label} (about ${rounded} pages).` });
    }

    if (!/@/.test(data.contact)) {
        out.push({ level: "warn", text: "Add an email address to the contact line." });
    }

    if (market.stripPersonal) {
        const personal = [data.contact, data.authorization, data.summary, data.additional].join(" ");
        if (/date of birth|\bDOB\b|marital status|\bmarried\b|\bgender\b|\bage\s*:/i.test(personal)) {
            out.push({
                level: "warn",
                text: `Remove date of birth, marital status, gender or age. ${market.label} employers don't expect them.`,
            });
        }
    }

    if (market.needsLanguages) {
        const langs = data.languages.trim();
        if (!langs) {
            out.push({
                level: "warn",
                text: "Add a Languages section with CEFR levels, for example German B2, English C1.",
            });
        } else if (!/\b[ABC][12]\b|native|mother tongue/i.test(langs)) {
            out.push({ level: "warn", text: "Add a CEFR level (A1 to C2) next to each language." });
        }
    }

    const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
    if (summaryWords > 90) {
        out.push({ level: "warn", text: `Your summary is ${summaryWords} words. Aim for 60 or fewer.` });
    }

    const bullets = [...data.experience, ...data.projects].flatMap((e) => splitLines(e.bullets));
    if (bullets.length >= 4) {
        const withNumbers = bullets.filter((b) => /\d/.test(b)).length;
        if (withNumbers / bullets.length < 0.25) {
            out.push({
                level: "warn",
                text: "Few bullets include numbers. Add results such as percentages, users or time saved, but only where they are true.",
            });
        }
    }

    return out;
}